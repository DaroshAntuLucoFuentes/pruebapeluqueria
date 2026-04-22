# 📋 Guía de Configuración para el Cliente

## 🎯 Objetivo
Configurar el sistema de reservas para que las citas aparezcan en el **Google Calendar del cliente** (dueño de la peluquería).

---

## ⚠️ IMPORTANTE: Orden de los Pasos

Sigue estos pasos **en orden** para configurar el sistema correctamente:

---

## 📝 PASO 1: Preparar el Proyecto para el Cliente

### 1.1 Personalizar Información del Negocio

Edita el archivo `config/business.json` con los datos reales del cliente:

```json
{
  "name": "Nombre de la Peluquería",
  "calendarId": "primary",
  "timezone": "America/Santiago",
  "workingHours": {
    "monday": ["09:00", "19:00"],
    "tuesday": ["09:00", "19:00"],
    "wednesday": ["09:00", "19:00"],
    "thursday": ["09:00", "19:00"],
    "friday": ["09:00", "19:00"],
    "saturday": ["10:00", "16:00"]
  },
  "services": [
    { "name": "Corte", "duration": 45 },
    { "name": "Corte + Barba", "duration": 60 },
    { "name": "Tinte", "duration": 90 },
    { "name": "Peinado", "duration": 45 }
  ],
  "slotInterval": 15
}
```

**Importante ajustar:**
- `name`: Nombre del negocio
- `timezone`: Zona horaria del país (Chile: `America/Santiago`, México: `America/Mexico_City`, etc.)
- `workingHours`: Días y horarios de atención
- `services`: Servicios reales con duraciones en minutos
- `slotInterval`: Intervalo de slots (15 minutos recomendado)

---

## 🔧 PASO 2: Configurar Google Cloud Console

### 2.1 Crear Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con **TU cuenta de desarrollador** (no la del cliente)
3. Click en el selector de proyectos (arriba a la izquierda)
4. Click en "New Project"
5. Nombre del proyecto: `peluqueria-[nombre-cliente]`
6. Click en "Create"

### 2.2 Habilitar Google Calendar API

1. En el menú lateral: **APIs & Services** → **Library**
2. Busca: "Google Calendar API"
3. Click en "Google Calendar API"
4. Click en "Enable"

### 2.3 Configurar OAuth Consent Screen

1. En el menú lateral: **APIs & Services** → **OAuth consent screen**
2. Selecciona: **External**
3. Click "Create"
4. Completa el formulario:
   - **App name**: `Sistema de Reservas - [Nombre Cliente]`
   - **User support email**: Tu email de desarrollador
   - **Developer contact information**: Tu email
5. Click "Save and Continue"
6. En **Scopes**: No agregues nada, click "Save and Continue"
7. En **Test users**: 
   - Click "Add Users"
   - **IMPORTANTE**: Agrega el **email de Gmail del cliente** (ej: peluqueria@gmail.com)
   - Este es el email donde llegarán las reservas
8. Click "Save and Continue"

### 2.4 Crear Credenciales OAuth 2.0

1. En el menú lateral: **APIs & Services** → **Credentials**
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Application type: **Web application**
4. Name: `Cliente Web - [Nombre Cliente]`
5. En **Authorized redirect URIs**, agrega:
   - Para desarrollo local: `http://localhost:3000/api/auth/callback`
   - Para Netlify: `https://[tu-sitio].netlify.app/api/auth/callback`
   - (Puedes agregar ambas)
6. Click "Create"
7. **¡MUY IMPORTANTE!** Copia y guarda:
   - **Client ID**: (algo como `xxxxx.apps.googleusercontent.com`)
   - **Client Secret**: (algo como `GOCSPX-xxxxx`)

---

## 🚀 PASO 3: Desplegar en Netlify

### 3.1 Subir Código a GitHub (si no lo has hecho)

```bash
git init
git add .
git commit -m "Sistema de reservas listo para producción"
git branch -M main
git remote add origin https://github.com/tu-usuario/peluqueria-cliente.git
git push -u origin main
```

### 3.2 Crear Sitio en Netlify

1. Ve a [Netlify](https://www.netlify.com/)
2. Inicia sesión
3. Click "Add new site" → "Import an existing project"
4. Selecciona GitHub y autoriza
5. Selecciona el repositorio del proyecto
6. Configuración:
   - **Build command**: (déjalo vacío, Next.js lo detecta automáticamente)
   - **Publish directory**: (déjalo vacío)
7. **NO HAGAS DEPLOY TODAVÍA**, primero configura las variables

### 3.3 Configurar Variables de Entorno en Netlify

1. En tu sitio de Netlify, ve a: **Site settings** → **Environment variables**
2. Click "Add a variable"
3. Agrega estas 3 variables (usa el Client ID y Secret del Paso 2.4):

```
Variable: GOOGLE_CLIENT_ID
Value: [tu-client-id].apps.googleusercontent.com

Variable: GOOGLE_CLIENT_SECRET
Value: GOCSPX-[tu-client-secret]

Variable: GOOGLE_REDIRECT_URI
Value: https://[tu-sitio].netlify.app/api/auth/callback
```

**Nota**: Reemplaza `[tu-sitio]` con el nombre que Netlify le asignó a tu sitio (lo ves en la URL)

4. Click "Add a variable" para agregar estas adicionales:

```
Variable: GOOGLE_CALENDAR_ID
Value: primary

Variable: NEXT_PUBLIC_API_URL
Value: https://[tu-sitio].netlify.app
```

### 3.4 Deploy Inicial

1. Guarda todas las variables
2. Ve a **Deploys**
3. Click "Trigger deploy" → "Deploy site"
4. Espera a que termine (2-5 minutos)

---

## 🔑 PASO 4: Autenticación del Cliente (MUY IMPORTANTE)

### ⚠️ Este paso DEBE hacerse CON el cliente presente

Una vez que el sitio esté deployado:

1. **Pide al cliente** que tenga abierta su cuenta de Gmail en el navegador
2. **El cliente debe visitar**: `https://[tu-sitio].netlify.app/api/auth/google`
3. Google mostrará una pantalla de login:
   - **El cliente debe iniciar sesión con SU cuenta de Gmail** (la que agregaste como test user)
4. Aparecerá: "Google hasn't verified this app"
   - Click en **"Advanced"**
   - Click en **"Go to [app name] (unsafe)"**
   - Esto es normal porque la app está en modo de prueba
5. Autoriza los permisos de Google Calendar
6. Será redirigido a una página de éxito que mostrará un **Refresh Token**

### 4.1 Guardar el Refresh Token

1. **Copia el Refresh Token** que aparece en la pantalla (es una cadena larga)
2. En Netlify, ve a: **Site settings** → **Environment variables**
3. Click "Add a variable":

```
Variable: GOOGLE_REFRESH_TOKEN
Value: [pega-el-refresh-token-aqui]
```

4. Click "Save"

### 4.2 Redeploy Final

1. Ve a **Deploys**
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. Espera a que termine

---

## ✅ PASO 5: Verificar que Funciona

### 5.1 Hacer una Reserva de Prueba

1. Ve a: `https://[tu-sitio].netlify.app/reservar`
2. Completa el formulario:
   - Selecciona un servicio
   - Elige una fecha
   - Selecciona un horario disponible
   - Completa los datos del cliente
3. Click "Confirmar Reserva"

### 5.2 Verificar en Google Calendar del Cliente

1. Pide al cliente que abra su Google Calendar:
   - En el navegador: [calendar.google.com](https://calendar.google.com)
   - O en la app de Google Calendar en su celular
2. **Debe aparecer la reserva** con los datos del cliente

---

## 🎓 PASO 6: Capacitar al Cliente

### Para Ver las Reservas

Explícale al cliente que:
- Todas las reservas aparecerán automáticamente en su Google Calendar
- Puede ver las citas en su celular (app de Google Calendar)
- Puede ver las citas en su computadora
- Recibirá notificaciones de Google antes de cada cita

### Para Compartir el Sistema

El cliente puede compartir el link de reservas:
- Link directo: `https://[tu-sitio].netlify.app`
- Puede ponerlo en Instagram bio
- Puede compartirlo por WhatsApp
- Puede crear un código QR con el link

### Para Modificar Citas

Si el cliente necesita cambiar una cita:
- Puede editar el evento directamente en Google Calendar
- Puede eliminar el evento para cancelar
- Puede agregar notas en la descripción del evento

---

## 🔄 Cambios Futuros

### Si el cliente quiere cambiar horarios o servicios:

1. Edita `config/business.json`
2. Sube los cambios a GitHub:
   ```bash
   git add config/business.json
   git commit -m "Actualizar configuración"
   git push
   ```
3. Netlify hará el redeploy automáticamente

---

## 🐛 Solución de Problemas

### "No hay horarios disponibles"
- Verifica que el día seleccionado esté en `workingHours`
- Verifica que el timezone sea correcto

### "Error de autenticación"
- El refresh token puede haber expirado
- Repite el PASO 4 para obtener un nuevo token

### "Las reservas no aparecen en el calendario"
- Verifica que el refresh token sea del cliente correcto
- Verifica que las variables de entorno estén bien configuradas
- Haz un redeploy limpio

---

## 📋 Checklist Final

Antes de entregar el proyecto al cliente:

- [ ] `business.json` configurado con datos reales
- [ ] Proyecto en Google Cloud creado y configurado
- [ ] Email del cliente agregado como "Test User"
- [ ] Sitio deployado en Netlify
- [ ] Variables de entorno configuradas
- [ ] Cliente se autenticó con su Google
- [ ] Refresh Token guardado en Netlify
- [ ] Reserva de prueba exitosa
- [ ] Reserva aparece en Google Calendar del cliente
- [ ] Cliente capacitado en uso básico

---

## 💡 Notas Importantes

1. **El refresh token es permanente**: Una vez configurado, no necesitas volver a hacer la autenticación a menos que el cliente revoque el acceso.

2. **Modo de prueba es suficiente**: No necesitas publicar la app en Google, el modo de prueba funciona perfectamente para un solo cliente.

3. **Máximo 100 test users**: Google permite hasta 100 usuarios de prueba, suficiente para varios clientes.

4. **El cliente tiene el control**: Como las reservas están en SU calendario, el cliente puede gestionar todo desde ahí.

---

¿Dudas? Revisa este documento paso a paso o contacta al desarrollador.
