import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots, getServiceByName, isWorkingDay, parseDateString } from '@/lib/availability'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const dateParam = searchParams.get('date')
    const serviceParam = searchParams.get('service')

    if (!dateParam) {
      return NextResponse.json(
        { error: 'El parámetro "date" es requerido (formato: YYYY-MM-DD)' },
        { status: 400 }
      )
    }

    if (!serviceParam) {
      return NextResponse.json(
        { error: 'El parámetro "service" es requerido' },
        { status: 400 }
      )
    }

    const date = parseDateString(dateParam)
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Formato de fecha inválido. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) {
      return NextResponse.json(
        { error: 'No se pueden consultar fechas pasadas' },
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

    const service = getServiceByName(serviceParam)
    if (!service) {
      return NextResponse.json(
        { error: `Servicio "${serviceParam}" no encontrado` },
        { status: 404 }
      )
    }

    if (!isWorkingDay(date)) {
      return NextResponse.json(
        { availableSlots: [] },
        { status: 200 }
      )
    }

    const availableSlots = await getAvailableSlots({
      date,
      serviceDuration: service.duration,
    })

    return NextResponse.json({
      availableSlots,
    })
  } catch (error) {
    console.error('Error en /api/availability:', error)
    
    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 }
    )
  }
}
