import { NextRequest, NextResponse } from 'next/server'
import { createCalendarEvent } from '@/lib/google'
import { 
  getServiceByName, 
  isWorkingDay, 
  isSlotStillAvailable,
  createDateTime,
  parseDateString
} from '@/lib/availability'

interface BookingRequest {
  service: string
  date: string
  time: string
  customerName: string
  customerPhone: string
  customerEmail?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json()

    if (!body.service || !body.date || !body.time || !body.customerName || !body.customerPhone) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos: service, date, time, customerName, customerPhone' },
        { status: 400 }
      )
    }

    const date = parseDateString(body.date)
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Formato de fecha inválido' },
        { status: 400 }
      )
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) {
      return NextResponse.json(
        { error: 'No se pueden hacer reservas en fechas pasadas' },
        { status: 400 }
      )
    }

    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 1)
    if (date > maxDate) {
      return NextResponse.json(
        { error: 'Solo se pueden hacer reservas con hasta 1 mes de anticipación' },
        { status: 400 }
      )
    }

    const service = getServiceByName(body.service)
    if (!service) {
      return NextResponse.json(
        { error: `Servicio "${body.service}" no encontrado` },
        { status: 404 }
      )
    }

    if (!isWorkingDay(date)) {
      return NextResponse.json(
        { error: 'No hay atención en la fecha seleccionada' },
        { status: 400 }
      )
    }

    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/
    if (!timeRegex.test(body.time)) {
      return NextResponse.json(
        { error: 'Formato de hora inválido. Use HH:MM' },
        { status: 400 }
      )
    }

    const stillAvailable = await isSlotStillAvailable({
      date,
      time: body.time,
      serviceDuration: service.duration,
    })

    if (!stillAvailable) {
      return NextResponse.json(
        { error: 'El horario seleccionado ya no está disponible. Por favor elige otro horario.' },
        { status: 409 }
      )
    }

    const startDateTime = createDateTime(date, body.time)
    const endDateTime = new Date(startDateTime.getTime() + service.duration * 60000)

    const eventData = {
      summary: `${service.name} - ${body.customerName}`,
      description: `Servicio: ${service.name}\nCliente: ${body.customerName}\nTeléfono: ${body.customerPhone}`,
      start: startDateTime,
      end: endDateTime,
      attendeeEmail: body.customerEmail,
      attendeeName: body.customerName,
    }

    const event = await createCalendarEvent(eventData)

    return NextResponse.json({
      success: true,
      message: 'Reserva creada exitosamente',
      booking: {
        eventId: event.id,
        service: service.name,
        date: body.date,
        time: body.time,
        customerName: body.customerName,
        htmlLink: event.htmlLink,
      },
    })
  } catch (error: any) {
    console.error('Error en /api/book:', error)
    
    return NextResponse.json(
      { error: error.message || 'Error al crear la reserva' },
      { status: 500 }
    )
  }
}
