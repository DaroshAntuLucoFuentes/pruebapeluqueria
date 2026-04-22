/**
 * Configuración y validación de variables de entorno
 * para la integración con Google Calendar API
 */

interface GoogleEnvConfig {
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GOOGLE_REDIRECT_URI: string
  GOOGLE_REFRESH_TOKEN: string
  GOOGLE_CALENDAR_ID: string
}

function validateEnv(): GoogleEnvConfig {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'

  const missingVars: string[] = []

  if (!clientId) missingVars.push('GOOGLE_CLIENT_ID')
  if (!clientSecret) missingVars.push('GOOGLE_CLIENT_SECRET')
  if (!redirectUri) missingVars.push('GOOGLE_REDIRECT_URI')
  if (!refreshToken) missingVars.push('GOOGLE_REFRESH_TOKEN')

  if (missingVars.length > 0) {
    throw new Error(
      `Faltan las siguientes variables de entorno requeridas: ${missingVars.join(', ')}`
    )
  }

  return {
    GOOGLE_CLIENT_ID: clientId!,
    GOOGLE_CLIENT_SECRET: clientSecret!,
    GOOGLE_REDIRECT_URI: redirectUri!,
    GOOGLE_REFRESH_TOKEN: refreshToken!,
    GOOGLE_CALENDAR_ID: calendarId,
  }
}

export const env = validateEnv()
