import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { env } from '@/lib/env'

/**
 * Endpoint para iniciar el flujo de autenticación OAuth con Google
 * El cliente debe visitar esta URL para autorizar el acceso a su calendario
 */
export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      env.GOOGLE_REDIRECT_URI
    )

    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ]

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    })

    return NextResponse.redirect(authUrl)
  } catch (error: any) {
    console.error('Error generando URL de autenticación:', error)
    return NextResponse.json(
      { error: 'Error al iniciar autenticación' },
      { status: 500 }
    )
  }
}
