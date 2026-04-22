# 📋 Guía de Implementación para Clientes

Sistema de reservas online integrado con Google Calendar para peluquerías y barberías.

## 🎨 Estructura del Sitio

- **`/`** (Página principal): Landing page elegante de "The Editorial Atelier" con información del salón
- **`/reservar`**: Sistema de agendamiento donde los clientes pueden reservar citas
- Los botones "Reservar" en la landing page redirigen automáticamente a `/reservar`

---

## 🔑 Importante: ¿Qué Cuenta de Google Usar?

### **Opción 1: Cuenta del Cliente (RECOMENDADO)**

✅ **Usa la cuenta de Gmail del dueño de la peluquería**

**Ventajas:**
- El cliente ve las reservas directamente en SU calendario personal
- Puede gestionar las citas desde su celular/computadora
- Recibe notificaciones en su cuenta
- Mayor autonomía para el cliente
- Si dejas de dar soporte, el sistema sigue funcionando

**Proceso:**
1. El cliente debe tener una cuenta de Gmail
2. Tú creas el proyecto en Google Cloud Console con TU cuenta de desarrollador
3. Agregas el email del cliente como "Usuario de Prueba"
4. El cliente se autentica con su cuenta en `/api/auth/google`
5. Las reservas se crean en el calendario del cliente

### **Opción 2: Tu Cuenta de Desarrollador**

⚠️ **Usas tu propia cuenta de Gmail**

**Desventajas:**
- Tú ves todas las reservas de todos tus clientes
- El cliente depende de ti para ver su calendario
- Necesitas compartir el calendario con el cliente
- Más trabajo de mantenimiento para ti

**Solo recomendado si:**
- El cliente no tiene Gmail
- Quieres control total centralizado
- Ofreces servicio de gestión completo

---

## 📝 Pasos de Implementación

### **PASO 1: Personalizar Configuración**

Edita `config/business.json` con los datos del cliente:

```json
{
  "name": "Peluquería [Nombre del Cliente]",
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
    { "name": "Corte Dama", "duration": 60 },
    { "name": "Corte Caballero", "duration": 30 },
    { "name": "Tinte", "duration": 120 },
    { "name": "Peinado", "duration": 45 }
  ],
  "slotInterval": 15
}
```

**Ajustes importantes:**
- `timezone`: Según el país del cliente
- `workingHours`: Horarios reales de atención
- `services`: Servicios que ofrece con duraciones reales
- `slotInterval`: Cada cuántos minutos se generan slots (15 min recomendado)

---

### **PASO 2: Crear Proyecto en Google Cloud Console**

#### 2.1 Crear Proyecto

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Inicia sesión con **TU cuenta de desarrollador**
3. Clic en "Select a project" → "New Project"
4. Nombre: `peluqueria-[nombre-cliente]`
5. Clic en "Create"

#### 2.2 Habilitar Google Calendar API

1. En el menú lateral: "APIs & Services" → "Library"
2. Busca "Google Calendar API"
3. Clic en "Enable"

#### 2.3 Configurar OAuth Consent Screen

1. Ve a "APIs & Services" → "OAuth consent screen"
2. Selecciona "External"
3. Completa:
   - App name: `Sistema de Reservas [Cliente]`
   - User support email: tu email
   - Developer contact: tu email
4. Clic en "Save and Continue"
5. **Scopes**: No agregues nada, clic en "Save and Continue"
6. **Test users**: 
   - Clic en "ADD USERS"
   - Agrega el **email de Gmail del cliente** (ej: peluqueria@gmail.com)
   - Clic en "Save and Continue"

#### 2.4 Crear Credenciales OAuth 2.0

1. Ve a "APIs & Services" → "Credentials"
2. Clic en "Create Credentials" → "OAuth 2.0 Client ID"
3. Application type: "Web application"
4. Name: `Cliente Web - [Nombre Cliente]`
5. **Authorized redirect URIs**:
   - Para desarrollo: `http://localhost:3000/api/auth/callback`
   - Para producción: `https://[dominio-cliente].com/api/auth/callback`
6. Clic en "Create"
7. **Guarda el Client ID y Client Secret**

---

### **PASO 3: Desplegar en Vercel**

#### 3.1 Preparar el Proyecto

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Desde la carpeta del proyecto
vercel login
```

#### 3.2 Desplegar

```bash
vercel
```

Sigue las instrucciones:
- Set up and deploy? **Y**
- Which scope? Selecciona tu cuenta
- Link to existing project? **N**
- Project name: `peluqueria-[nombre-cliente]`
- In which directory is your code? **./`
- Override settings? **N**

#### 3.3 Configurar Variables de Entorno

En el dashboard de Vercel:

1. Ve a tu proyecto → "Settings" → "Environment Variables"
2. Agrega:

```
GOOGLE_CLIENT_ID = [tu-client-id].apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = GOCSPX-[tu-secret]
GOOGLE_REDIRECT_URI = https://[tu-proyecto].vercel.app/api/auth/callback
```

3. Redeploy: `vercel --prod`

#### 3.4 Configurar Dominio Personalizado (Opcional)

En Vercel dashboard:
1. Ve a "Settings" → "Domains"
2. Agrega dominio del cliente: `reservas.peluqueriacliente.com`
3. Configura DNS según instrucciones
4. **Actualiza** `GOOGLE_REDIRECT_URI` con el nuevo dominio
5. **Actualiza** la URI en Google Cloud Console

---

### **PASO 4: Autenticación Inicial (Con el Cliente)**

⚠️ **Este paso se hace CON el cliente presente**

1. Visita: `https://[dominio-cliente].com/api/auth/google`
2. **El cliente** inicia sesión con su cuenta de Gmail
3. Aparecerá: "Google hasn't verified this app"
   - Clic en "Advanced"
   - Clic en "Go to [app name] (unsafe)"
   - Esto es normal para apps en modo de prueba
4. Autoriza los permisos de calendario
5. Será redirigido a la página principal
6. **¡Listo!** El sistema ya está conectado

**Nota:** Esta autenticación solo se hace UNA VEZ. Los tokens se guardan y se refrescan automáticamente.

---

### **PASO 5: Capacitación al Cliente**

#### Para el Dueño de la Peluquería:

**Ver Reservas:**
- Todas las citas aparecen en su Google Calendar
- Puede verlas en su celular (app de Google Calendar)
- Puede verlas en su computadora

**Gestionar Citas:**
- Modificar horario: Edita el evento en Google Calendar
- Cancelar: Elimina el evento en Google Calendar
- Agregar notas: Edita la descripción del evento

**Compartir con Clientes:**
- Comparte el link: `https://[dominio].com`
- Puede ponerlo en Instagram, Facebook, WhatsApp
- Puede crear un código QR con el link

#### Para los Clientes Finales:

1. Entran al link
2. Seleccionan servicio y fecha
3. Ven horarios disponibles en tiempo real
4. Completan sus datos
5. Confirman reserva
6. Ven mensaje de confirmación

---

## 🔧 Mantenimiento

### Cambios Comunes

**Cambiar horarios:**
```bash
# Edita config/business.json
# Redeploy: vercel --prod
```

**Agregar/quitar servicios:**
```bash
# Edita config/business.json en la sección "services"
# Redeploy: vercel --prod
```

**Cambiar intervalo de slots:**
```bash
# Edita "slotInterval" en config/business.json
# Redeploy: vercel --prod
```

### Troubleshooting

**"No hay tokens de Google Calendar"**
- Solución: Volver a hacer la autenticación en `/api/auth/google`

**"Error al obtener disponibilidad"**
- Verificar que la Google Calendar API esté habilitada
- Verificar que los tokens no hayan sido revocados
- Re-autenticar si es necesario

**Las fechas se crean un día antes/después**
- Ya está corregido con `parseDateString()`
- Verificar que el `timezone` en `business.json` sea correcto

---

## 💰 Estructura de Precios Sugerida

### Opción 1: Pago Único
- **Setup inicial**: $150-300 USD
- Incluye:
  - Configuración completa
  - Despliegue en producción
  - Autenticación inicial
  - Capacitación (1-2 horas)
  - Personalización básica (colores, logo)
- Cliente paga hosting: $0 (Vercel gratis)

### Opción 2: Mensualidad
- **Setup inicial**: $100 USD
- **Mensualidad**: $20-50 USD/mes
- Incluye:
  - Todo lo anterior
  - Hosting incluido
  - Soporte técnico
  - Cambios de configuración ilimitados
  - Actualizaciones

### Opción 3: Pago Único + Soporte Opcional
- **Setup**: $200 USD
- **Soporte**: $30 USD/mes (opcional)
- Cliente decide si necesita soporte continuo

---

## 📦 Checklist de Entrega

Antes de considerar el proyecto completo:

- [ ] `business.json` configurado con datos reales
- [ ] Proyecto desplegado en producción
- [ ] Dominio configurado (si aplica)
- [ ] Google Cloud project creado
- [ ] OAuth configurado correctamente
- [ ] Cliente agregado como usuario de prueba
- [ ] Autenticación inicial completada con el cliente
- [ ] Prueba de reserva exitosa
- [ ] Cliente capacitado en uso básico
- [ ] Documentación entregada
- [ ] Contacto de soporte definido

---

## 🚀 Escalabilidad Futura

Si el cliente crece, puedes agregar:

- Base de datos para historial de clientes
- Sistema de notificaciones por WhatsApp/SMS
- Panel de administración
- Reportes y estadísticas
- Múltiples empleados/calendarios
- Sistema de pagos online
- Programa de fidelización

---

## 📞 Soporte Post-Implementación

**Problemas comunes que el cliente puede tener:**

1. "No veo las reservas" → Verificar que se autenticó con la cuenta correcta
2. "Los horarios no coinciden" → Revisar timezone en `business.json`
3. "Quiero cambiar los horarios" → Editar `business.json` y redesplegar
4. "Necesito agregar un servicio" → Editar `business.json` y redesplegar

**Tu rol como desarrollador:**
- Cambios en configuración: 15-30 min
- Nuevas funcionalidades: Según complejidad
- Soporte técnico: Según acuerdo

---

## 🎯 Resumen Ejecutivo

**Para el Cliente:**
- Sistema profesional de reservas online
- Integrado con su calendario de Google
- Sin costos de software (solo hosting si aplica)
- Disponible 24/7 para sus clientes
- Reduce llamadas telefónicas
- Evita dobles reservas
- Recordatorios automáticos

**Para Ti como Desarrollador:**
- Setup rápido: 2-4 horas por cliente
- Mantenimiento mínimo
- Código reutilizable
- Escalable a múltiples clientes
- Stack moderno y profesional

---

## 📧 Contacto

Desarrollador: [Tu Nombre]
Email: [Tu Email]
Soporte: [Método de contacto preferido]

---

**Versión:** 1.0.0  
**Última actualización:** Marzo 2026  
**Stack:** Next.js 14, TypeScript, Google Calendar API
