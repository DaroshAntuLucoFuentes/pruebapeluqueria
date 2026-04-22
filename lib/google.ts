import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import businessConfig from '@/config/business.json'
import { env } from './env'

/**
 * Crea y retorna un cliente OAuth2 autenticado con el refresh token
 * desde las variables de entorno. El cliente renovará automáticamente
 * el access token cuando sea necesario.
 */
export function getOAuth2Client(): OAuth2Client {
  const oauth2Client = new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_REDIRECT_URI
  )

  oauth2Client.setCredentials({
    refresh_token: env.GOOGLE_REFRESH_TOKEN,
  })

  return oauth2Client
}

/**
 * Retorna un cliente de Google Calendar v3 autenticado
 */
export function getCalendarClient() {
  const auth = getOAuth2Client()
  return google.calendar({ version: 'v3', auth })
}

interface BusySlot {
  start: string
  end: string
}

/**
 * Obtiene los bloques de tiempo ocupados en el calendario
 * entre las fechas especificadas
 */
export async function getBusySlots(
  timeMin: Date,
  timeMax: Date
): Promise<BusySlot[]> {
  const calendar = getCalendarClient()

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: businessConfig.timezone,
        items: [{ id: env.GOOGLE_CALENDAR_ID }],
      },
    })

    const calendarId = env.GOOGLE_CALENDAR_ID
    const busySlots = response.data.calendars?.[calendarId]?.busy || []
    
    return busySlots.map((slot) => ({
      start: slot.start || '',
      end: slot.end || '',
    }))
  } catch (error: any) {
    console.error('Error obteniendo slots ocupados:', error)
    console.error('Detalles del error:', {
      message: error.message,
      code: error.code,
      errors: error.errors,
    })
    throw new Error(`Error de Google Calendar: ${error.message || 'No se pudieron obtener los horarios ocupados'}`)
  }
}

interface CalendarEventData {
  summary: string
  description?: string
  start: Date
  end: Date
  attendeeEmail?: string
  attendeeName?: string
}

/**
 * Crea un evento en Google Calendar
 */
export async function createCalendarEvent(data: CalendarEventData) {
  const calendar = getCalendarClient()

  const event = {
    summary: data.summary,
    description: data.description || '',
    start: {
      dateTime: data.start.toISOString(),
      timeZone: businessConfig.timezone,
    },
    end: {
      dateTime: data.end.toISOString(),
      timeZone: businessConfig.timezone,
    },
    attendees: data.attendeeEmail
      ? [
          {
            email: data.attendeeEmail,
            displayName: data.attendeeName,
          },
        ]
      : [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  }

  try {
    const response = await calendar.events.insert({
      calendarId: env.GOOGLE_CALENDAR_ID,
      requestBody: event,
      sendUpdates: 'all',
    })

    return response.data
  } catch (error: any) {
    console.error('Error creando evento:', error)
    console.error('Detalles del error:', {
      message: error.message,
      code: error.code,
      errors: error.errors,
    })
    throw new Error(`Error de Google Calendar: ${error.message || 'No se pudo crear el evento en el calendario'}`)
  }
}

/**
 * Elimina un evento de Google Calendar
 */
export async function deleteCalendarEvent(eventId: string) {
  const calendar = getCalendarClient()

  try {
    await calendar.events.delete({
      calendarId: env.GOOGLE_CALENDAR_ID,
      eventId: eventId,
      sendUpdates: 'all',
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error eliminando evento:', error)
    console.error('Detalles del error:', {
      message: error.message,
      code: error.code,
      errors: error.errors,
    })
    throw new Error(`Error de Google Calendar: ${error.message || 'No se pudo eliminar el evento del calendario'}`)
  }
}
