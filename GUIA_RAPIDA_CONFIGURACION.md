# 🚀 Guía Rápida de Configuración - PeluRock

## Resumen: Conectar las reservas al Google Calendar del cliente

---

## 📝 PASO 1: Personalizar el Negocio (5 minutos)

Edita `config/business.json` con los datos de PeluRock:

```json
{
  "name": "PeluRock Nata Leal",
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
    { "name": "Rock Soft", "duration": 60 },
    { "name": "Rock Cut", "duration": 90 },
    { "name": "Rock Bath", "duration": 45 },
    { "name": "Rock Fresh", "duration": 60 },
    { "name": "Rock Turbo", "duration": 120 },
    { "name": "Rock Smile", "duration": 75 },
    { "name": "Rock Zen", "duration": 90 }
  ],
  "slotInterval": 15
}
```

**Ajusta:** horarios y duraciones según las necesidades reales.

---

## 🔧 PASO 2: Configurar Google Cloud (15 minutos)

### 2.1 Crear Proyecto
1. Ve a https://console.cloud.google.com/
2. Crea nuevo proyecto: `pelurock-nataleal`
3. Activa **Google Calendar API** (buscar en Library)

### 2.2 Configurar OAuth
1. Ve a **OAuth consent screen**
2. Tipo: **External**
3. Nombre: `Sistema Reservas PeluRock`
4. Email: Tu email de desarrollador
5. **MUY IMPORTANTE - Test Users:** Agrega el **email de Gmail del cliente** (donde quiere recibir las reservas)

### 2.3 Crear Credenciales
1. Ve a **Credentials** → **Create OAuth 2.0 Client ID**
2. Tipo: **Web application**
3. Redirect URIs:
   - `http://localhost:3000/api/auth/callback` (desarrollo)
   - `https://[tu-sitio].netlify.app/api/auth/callback` (producción)
4. **COPIA Y GUARDA:**
   - Client ID: `xxxxx.apps.googleusercontent.com`
   - Client Secret: `GOCSPX-xxxxx`

---

## 🚀 PASO 3: Desplegar en Netlify (10 minutos)

### 3.1 Subir a GitHub
```bash
git init
git add .
git commit -m "PeluRock listo para producción"
git branch -M main
git remote add origin https://github.com/tu-usuario/pelurock.git
git push -u origin main
```

### 3.2 Crear Sitio en Netlify
1. Ve a https://www.netlify.com/
2. Import from GitHub
3. Selecciona el repositorio
4. **NO HAGAS DEPLOY TODAVÍA**

### 3.3 Configurar Variables de Entorno
En Netlify → Site settings → Environment variables, agrega:

```
GOOGLE_CLIENT_ID = [tu-client-id].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = GOCSPX-[tu-client-secret]
GOOGLE_REDIRECT_URI = https://[tu-sitio].netlify.app/api/auth/callback
GOOGLE_CALENDAR_ID = primary
NEXT_PUBLIC_API_URL = https://[tu-sitio].netlify.app
```

### 3.4 Deploy
1. Guarda las variables
2. Trigger deploy
3. Espera 2-5 minutos

---

## 🔑 PASO 4: Autenticar al Cliente (CON el cliente presente)

### ⚠️ El cliente DEBE estar presente con su Gmail abierto

1. **El cliente** visita: `https://[tu-sitio].netlify.app/api/auth/google`
2. Inicia sesión con **SU Gmail** (el que agregaste como test user)
3. Aparecerá: "Google hasn't verified this app"
   - Click **"Advanced"**
   - Click **"Go to [app name] (unsafe)"** (es normal en modo prueba)
4. Autoriza los permisos de Calendar
5. Aparecerá una página con el **REFRESH TOKEN**

### 4.1 Guardar el Refresh Token
1. **COPIA** el refresh token de la pantalla
2. En Netlify → Environment variables → Add:
   ```
   GOOGLE_REFRESH_TOKEN = [pega-el-token-aqui]
   ```
3. Guarda

### 4.2 Redeploy Final
1. Deploys → Clear cache and deploy site
2. Espera a que termine

---

## ✅ PASO 5: Probar (5 minutos)

### 5.1 Hacer Reserva de Prueba
1. Ve a: `https://[tu-sitio].netlify.app/reservar`
2. Completa el formulario
3. Confirma la reserva

### 5.2 Verificar en Google Calendar
1. El cliente abre su Google Calendar
2. **Debe aparecer la reserva** con todos los datos

**¡Si aparece, todo está funcionando! ✅**

---

## 🎓 PASO 6: Entregar al Cliente

### Explicar:
- ✅ Todas las reservas aparecen automáticamente en su Google Calendar
- ✅ Puede ver las citas en su celular (app Google Calendar)
- ✅ Recibirá notificaciones antes de cada cita
- ✅ Puede editar/cancelar citas directamente desde Calendar
- ✅ Puede compartir el link: `https://[tu-sitio].netlify.app`

### Link para compartir:
- Instagram bio
- WhatsApp a clientes
- Código QR
- Redes sociales

---

## 📊 Resumen de Tiempos

| Paso | Tiempo Estimado |
|------|----------------|
| 1. Personalizar negocio | 5 min |
| 2. Google Cloud | 15 min |
| 3. Netlify | 10 min |
| 4. Autenticación | 5 min |
| 5. Prueba | 5 min |
| **TOTAL** | **40 minutos** |

---

## 🐛 Problemas Comunes

### "No hay horarios disponibles"
- ✅ Verifica `workingHours` en business.json
- ✅ Verifica que el timezone sea `America/Santiago`

### "Error de autenticación"
- ✅ Repite el PASO 4 para obtener nuevo token
- ✅ Verifica que el email del cliente esté en Test Users

### "Las reservas no aparecen"
- ✅ Verifica que el refresh token sea del cliente correcto
- ✅ Haz un redeploy limpio (Clear cache)

---

## ✅ Checklist Final

Antes de entregar:

- [ ] business.json con datos de PeluRock
- [ ] Google Cloud proyecto configurado
- [ ] Email del cliente como Test User
- [ ] Sitio en Netlify funcionando
- [ ] Todas las variables de entorno configuradas
- [ ] Cliente autenticado con su Google
- [ ] Refresh Token guardado
- [ ] Reserva de prueba exitosa
- [ ] Reserva visible en Calendar del cliente
- [ ] Cliente sabe cómo usar el sistema

---

## 💡 Dato Importante

El **refresh token es permanente**. Una vez configurado, el sistema funcionará automáticamente sin necesidad de volver a autenticar, a menos que el cliente revoque el acceso manualmente.

---

## 🔄 Para Cambios Futuros

Si el cliente quiere cambiar horarios o servicios:

1. Edita `config/business.json`
2. Commit y push a GitHub
3. Netlify redeploya automáticamente
4. Listo ✅

---

**Tiempo total de configuración: ~40 minutos**
