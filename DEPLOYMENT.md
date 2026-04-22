# Guía de Despliegue en Vercel

## Configuración de Variables de Entorno

Para que el sistema funcione en producción, debes configurar las siguientes variables de entorno en Vercel:

### 1. Variables Requeridas

```bash
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URI=https://tu-dominio.vercel.app/api/auth/callback
GOOGLE_REFRESH_TOKEN=tu_refresh_token_aqui
GOOGLE_CALENDAR_ID=primary
```

### 2. Cómo Obtener las Credenciales

#### Google Client ID y Client Secret

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo o selecciona uno existente
3. Habilita la API de Google Calendar
4. Ve a "Credenciales" > "Crear credenciales" > "ID de cliente de OAuth 2.0"
5. Configura la pantalla de consentimiento OAuth
6. Crea credenciales de tipo "Aplicación web"
7. Agrega tu URI de redirección autorizada

#### Google Refresh Token

El refresh token se obtiene una sola vez durante la autenticación inicial. Puedes obtenerlo:

**Opción 1: Usando OAuth Playground**
1. Ve a [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click en el ícono de configuración (⚙️)
3. Marca "Use your own OAuth credentials"
4. Ingresa tu Client ID y Client Secret
5. En "Step 1", selecciona "Calendar API v3" > "https://www.googleapis.com/auth/calendar"
6. Click "Authorize APIs"
7. Completa el flujo de autenticación
8. En "Step 2", click "Exchange authorization code for tokens"
9. Copia el `refresh_token` que aparece en la respuesta

**Opción 2: Desde tu aplicación local**
1. Ejecuta tu aplicación en local con las credenciales configuradas
2. Completa el flujo de autenticación
3. El refresh token se guardará temporalmente en `data/tokens.json`
4. Copia el valor de `refresh_token` antes de hacer el deploy

### 3. Configurar en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings > Environment Variables
3. Agrega cada variable con su valor correspondiente
4. Asegúrate de seleccionar los ambientes apropiados (Production, Preview, Development)

### 4. Desplegar

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Deploy
vercel --prod
```

O simplemente haz push a tu repositorio si tienes integración automática con GitHub.

## Notas Importantes

- El `GOOGLE_REFRESH_TOKEN` es permanente y permite renovar automáticamente el access token
- No necesitas guardar ni gestionar el access token manualmente
- La biblioteca de Google se encarga de renovar el access token automáticamente cuando expira
- Asegúrate de que el `GOOGLE_CALENDAR_ID` corresponda al calendario que quieres usar (usa "primary" para el calendario principal)

## Verificación

Después del deploy, verifica que todo funcione:

1. Prueba el endpoint de disponibilidad:
   ```
   GET https://tu-dominio.vercel.app/api/availability?date=2026-04-01&service=Corte
   ```

2. Prueba crear una reserva:
   ```
   POST https://tu-dominio.vercel.app/api/book
   {
     "service": "Corte",
     "date": "2026-04-01",
     "time": "10:00",
     "customerName": "Test",
     "customerPhone": "+56912345678"
   }
   ```

## Solución de Problemas

Si recibes errores de autenticación:

1. Verifica que todas las variables de entorno estén configuradas correctamente
2. Asegúrate de que el refresh token sea válido
3. Verifica que la API de Google Calendar esté habilitada en tu proyecto de Google Cloud
4. Revisa los logs en Vercel Dashboard > Deployments > [tu deploy] > Runtime Logs
