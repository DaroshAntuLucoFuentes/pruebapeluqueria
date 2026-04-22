import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { env } from '@/lib/env'

/**
 * Endpoint que recibe el código de autorización de Google
 * y lo intercambia por tokens de acceso
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        { error: 'Código de autorización no recibido' },
        { status: 400 }
      )
    }

    const oauth2Client = new google.auth.OAuth2(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      env.GOOGLE_REDIRECT_URI
    )

    const { tokens } = await oauth2Client.getToken(code)

    if (!tokens.refresh_token) {
      return NextResponse.json(
        { 
          error: 'No se recibió el refresh token. Intenta revocar el acceso en tu cuenta de Google y vuelve a autenticarte.',
          instructions: 'Ve a https://myaccount.google.com/permissions y revoca el acceso a esta aplicación.'
        },
        { status: 400 }
      )
    }

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Autenticación Exitosa</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: white;
            border-radius: 16px;
            padding: 40px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .success-icon {
            width: 64px;
            height: 64px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 32px;
          }
          h1 {
            color: #1f2937;
            text-align: center;
            margin-bottom: 16px;
            font-size: 24px;
          }
          p {
            color: #6b7280;
            text-align: center;
            margin-bottom: 24px;
            line-height: 1.6;
          }
          .token-box {
            background: #f9fafb;
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
          }
          .token-label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .token-value {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: #1f2937;
            word-break: break-all;
            background: white;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
          }
          .instructions {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            border-radius: 4px;
            margin-top: 24px;
          }
          .instructions h3 {
            color: #92400e;
            margin-bottom: 8px;
            font-size: 16px;
          }
          .instructions ol {
            color: #78350f;
            padding-left: 20px;
            line-height: 1.8;
          }
          .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            margin-top: 24px;
            text-align: center;
            width: 100%;
            font-weight: 600;
            transition: background 0.3s;
          }
          .btn:hover {
            background: #5568d3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">✓</div>
          <h1>¡Autenticación Exitosa!</h1>
          <p>Tu cuenta de Google ha sido conectada correctamente al sistema de reservas.</p>
          
          <div class="token-box">
            <div class="token-label">🔑 Refresh Token</div>
            <div class="token-value">${tokens.refresh_token}</div>
          </div>

          <div class="instructions">
            <h3>📋 Próximos pasos:</h3>
            <ol>
              <li>Copia el <strong>Refresh Token</strong> de arriba</li>
              <li>En Netlify, ve a: <strong>Site settings → Environment variables</strong></li>
              <li>Busca la variable <strong>GOOGLE_REFRESH_TOKEN</strong></li>
              <li>Pega el token y guarda los cambios</li>
              <li>Redeploy tu sitio para aplicar los cambios</li>
            </ol>
          </div>

          <a href="/" class="btn">Ir a la página principal</a>
        </div>
      </body>
      </html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  } catch (error: any) {
    console.error('Error en callback de autenticación:', error)
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la autenticación',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
