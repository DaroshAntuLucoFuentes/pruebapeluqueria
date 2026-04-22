# 🏗️ Arquitectura del Sistema

Documentación técnica de la arquitectura del sistema de reservas para peluquería.

---

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                  │
│                     (Navegador Web)                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                    VERCEL (Hosting)                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Next.js App                             │   │
│  │                                                           │   │
│  │  ┌─────────────┐         ┌─────────────┐                │   │
│  │  │   / (root)  │         │  /reservar  │                │   │
│  │  │  Landing    │────────▶│  Booking    │                │   │
│  │  │   Page      │ Link    │   System    │                │   │
│  │  └─────────────┘         └──────┬──────┘                │   │
│  │                                  │                        │   │
│  │                                  │ API Calls             │   │
│  │                                  │                        │   │
│  │  ┌───────────────────────────────▼──────────────────┐   │   │
│  │  │           API Routes (Serverless)                │   │   │
│  │  │  ┌──────────────────┐  ┌────────────────────┐   │   │   │
│  │  │  │ /api/availability│  │   /api/book        │   │   │   │
│  │  │  │ (GET)            │  │   (POST)           │   │   │   │
│  │  │  └────────┬─────────┘  └─────────┬──────────┘   │   │   │
│  │  └───────────┼──────────────────────┼──────────────┘   │   │
│  └──────────────┼──────────────────────┼──────────────────┘   │
└─────────────────┼──────────────────────┼──────────────────────┘
                  │                      │
                  │ Google Calendar API  │
                  │                      │
┌─────────────────▼──────────────────────▼──────────────────────┐
│                  Google Cloud Platform                         │
│  ┌──────────────────────────────────────────────────────┐     │
│  │              Google Calendar API                      │     │
│  │  - OAuth 2.0 Authentication                          │     │
│  │  - Calendar Events Management                        │     │
│  │  - Availability Checking                             │     │
│  └──────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos

### 1. Carga de Landing Page

```
Usuario → Vercel → Next.js SSR → Renderiza app/page.tsx → HTML + CSS → Usuario
```

### 2. Navegación a Reservas

```
Usuario click "Reservar" → Next.js Router → Carga /reservar → Renderiza formulario
```

### 3. Consulta de Disponibilidad

```
Usuario selecciona fecha/servicio
    ↓
Click "Consultar Disponibilidad"
    ↓
Frontend → GET /api/availability?date=2026-03-30&service=Corte
    ↓
API Route lee config/business.json
    ↓
API Route → Google Calendar API (listar eventos del día)
    ↓
API Route calcula slots disponibles
    ↓
API Route → Frontend (JSON con slots)
    ↓
Frontend muestra botones de horarios
```

### 4. Creación de Reserva

```
Usuario completa formulario y confirma
    ↓
Frontend → POST /api/book
    ↓
API Route valida datos
    ↓
API Route → Google Calendar API (crear evento)
    ↓
Google Calendar crea evento
    ↓
API Route → Frontend (confirmación)
    ↓
Frontend muestra mensaje de éxito
    ↓
Usuario recibe notificación por email (automático de Google)
```

---

## 🗂️ Estructura de Componentes

### Frontend (React Components)

```
app/
├── page.tsx (Client Component)
│   └── Landing Page
│       ├── Header (con botón Reservar)
│       ├── Hero Section
│       ├── Services Section
│       ├── Testimonials Section
│       ├── FAQ Section
│       ├── Contact Section
│       └── Footer
│
└── reservar/page.tsx (Client Component)
    └── Booking System
        ├── Service Selector
        ├── Date Picker
        ├── Availability Checker
        ├── Time Slot Selector
        ├── Customer Form
        └── Booking Confirmation
```

### Backend (API Routes)

```
app/api/
├── availability/
│   └── route.ts
│       ├── GET handler
│       ├── Valida parámetros
│       ├── Lee configuración
│       ├── Consulta Google Calendar
│       └── Calcula slots disponibles
│
└── book/
    └── route.ts
        ├── POST handler
        ├── Valida datos del cliente
        ├── Verifica disponibilidad
        ├── Crea evento en Google Calendar
        └── Retorna confirmación
```

---

## 🔐 Autenticación y Seguridad

### OAuth 2.0 Flow

```
1. Desarrollador obtiene credenciales de Google Cloud Console
   ↓
2. Desarrollador genera Refresh Token (una sola vez)
   ↓
3. Refresh Token se guarda en variables de entorno
   ↓
4. API Routes usan Refresh Token para obtener Access Token
   ↓
5. Access Token se usa para llamadas a Google Calendar API
   ↓
6. Si Access Token expira, se renueva automáticamente
```

### Variables de Entorno

```
Local (.env.local)          Vercel (Environment Variables)
├── GOOGLE_CLIENT_ID    →   GOOGLE_CLIENT_ID
├── GOOGLE_CLIENT_SECRET →  GOOGLE_CLIENT_SECRET
└── GOOGLE_REFRESH_TOKEN →  GOOGLE_REFRESH_TOKEN
```

---

## 🎨 Sistema de Diseño

### Colores Principales

```css
Primary (Negro):     #181919  /* Headers, texto principal */
Secondary (Dorado):  #775a19  /* Botones, acentos */
Background:          #f9f9f9  /* Fondo general */
Surface:             #ffffff  /* Tarjetas, contenedores */
```

### Tipografía

```css
Headlines:  Noto Serif (serif)    /* Títulos grandes */
Body:       Manrope (sans-serif)  /* Texto general */
Labels:     Manrope (sans-serif)  /* Botones, etiquetas */
```

### Breakpoints (Tailwind)

```css
sm:  640px   /* Móvil grande */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop pequeño */
xl:  1280px  /* Desktop grande */
```

---

## 🔌 Integraciones Externas

### Google Calendar API

**Endpoints utilizados**:

1. **`calendar.events.list`**
   - Usado en: `/api/availability`
   - Propósito: Obtener eventos existentes para calcular disponibilidad

2. **`calendar.events.insert`**
   - Usado en: `/api/book`
   - Propósito: Crear nueva reserva en el calendario

**Permisos requeridos**:
- `https://www.googleapis.com/auth/calendar`
- `https://www.googleapis.com/auth/calendar.events`

### Google Fonts

**Fuentes cargadas**:
- Noto Serif (400, 700)
- Manrope (300, 400, 500, 600, 800)
- Material Symbols Outlined

---

## 📦 Dependencias Principales

### Production Dependencies

```json
{
  "googleapis": "^171.4.0",    // Google Calendar API
  "next": "^14.2.3",           // Framework
  "react": "^18.3.1",          // UI Library
  "react-dom": "^18.3.1"       // React DOM
}
```

### Development Dependencies

```json
{
  "tailwindcss": "^3.4.1",           // Estilos
  "postcss": "^8.4.35",              // CSS Processing
  "autoprefixer": "^10.4.17",        // Prefijos CSS
  "@tailwindcss/forms": "^0.5.7",    // Estilos de formularios
  "typescript": "^5.4.5"             // Type checking
}
```

---

## 🔄 Ciclo de Vida de una Reserva

```
1. USUARIO ENTRA AL SITIO
   └─> Landing Page (/) se carga desde Vercel
   
2. USUARIO HACE CLICK EN "RESERVAR"
   └─> Next.js Router navega a /reservar
   
3. USUARIO SELECCIONA SERVICIO Y FECHA
   └─> Estado local en React (useState)
   
4. USUARIO CONSULTA DISPONIBILIDAD
   └─> Frontend → GET /api/availability
       └─> API lee config/business.json
       └─> API consulta Google Calendar
       └─> API calcula slots libres
       └─> API retorna array de horarios
   └─> Frontend muestra botones de horarios
   
5. USUARIO SELECCIONA HORARIO Y COMPLETA DATOS
   └─> Estado local en React (useState)
   
6. USUARIO CONFIRMA RESERVA
   └─> Frontend → POST /api/book
       └─> API valida datos
       └─> API verifica disponibilidad (doble check)
       └─> API crea evento en Google Calendar
       └─> Google Calendar envía email de confirmación
       └─> API retorna éxito
   └─> Frontend muestra mensaje de confirmación
   
7. RESERVA COMPLETADA
   └─> Cliente recibe email de Google Calendar
   └─> Evento aparece en el calendario del negocio
   └─> Peluquero ve la cita en su Google Calendar
```

---

## 🧪 Testing

### Testing Local

```bash
# 1. Iniciar servidor de desarrollo
npm run dev

# 2. Probar landing page
# Abrir http://localhost:3000
# - Verificar que se vea correctamente
# - Verificar que botones "Reservar" funcionen

# 3. Probar sistema de reservas
# Abrir http://localhost:3000/reservar
# - Seleccionar servicio
# - Seleccionar fecha
# - Consultar disponibilidad
# - Seleccionar horario
# - Completar datos
# - Confirmar reserva
# - Verificar que aparezca en Google Calendar

# 4. Verificar Google Calendar
# Abrir https://calendar.google.com
# - Debe aparecer la cita creada
```

### Testing en Producción

```bash
# Mismo flujo que local, pero en:
# https://tu-proyecto.vercel.app
```

---

## 🔧 Mantenimiento

### Tareas Regulares

**Semanalmente**:
- [ ] Revisar logs de Vercel para errores
- [ ] Verificar que las reservas se estén creando correctamente
- [ ] Revisar analytics de visitantes

**Mensualmente**:
- [ ] Actualizar dependencias: `npm update`
- [ ] Revisar y renovar tokens de Google si es necesario
- [ ] Backup de configuración

**Trimestralmente**:
- [ ] Revisar y actualizar servicios en `config/business.json`
- [ ] Revisar horarios de atención
- [ ] Actualizar contenido de la landing page si es necesario

---

## 📈 Escalabilidad

### Límites Actuales

**Vercel (Plan Gratuito)**:
- 100 GB de ancho de banda/mes
- 100 GB-Hrs de funciones serverless
- ~10,000 visitantes/mes
- Suficiente para pequeñas y medianas peluquerías

**Google Calendar API**:
- 1,000,000 de requests/día (cuota gratuita)
- Más que suficiente para cualquier peluquería

### Cuándo Escalar

Considera actualizar cuando:
- Más de 10,000 visitantes/mes
- Más de 100 GB de ancho de banda
- Múltiples sucursales (necesitarás múltiples calendarios)
- Necesitas funcionalidades avanzadas (pagos, recordatorios SMS, etc.)

---

## 🔮 Futuras Mejoras Posibles

### Funcionalidades Adicionales

1. **Sistema de Pagos**
   - Integración con Stripe o Mercado Pago
   - Pagos anticipados o señas

2. **Notificaciones**
   - SMS de recordatorio (Twilio)
   - WhatsApp Business API
   - Emails personalizados

3. **Panel de Administración**
   - Dashboard para ver reservas
   - Gestión de servicios
   - Reportes y estadísticas

4. **Multi-sucursal**
   - Múltiples calendarios
   - Selección de sucursal
   - Diferentes horarios por sucursal

5. **Sistema de Fidelización**
   - Puntos por visitas
   - Descuentos para clientes frecuentes
   - Programa de referidos

6. **Galería de Trabajos**
   - Portfolio de cortes realizados
   - Instagram feed integrado
   - Antes y después

---

## 🛡️ Seguridad

### Medidas Implementadas

1. **Variables de Entorno**
   - Credenciales nunca en el código
   - `.env.local` en `.gitignore`

2. **HTTPS**
   - SSL automático por Vercel
   - Todas las comunicaciones encriptadas

3. **Validación de Datos**
   - Validación en frontend
   - Validación en backend
   - Sanitización de inputs

4. **Rate Limiting** (Recomendado agregar)
   - Limitar requests por IP
   - Prevenir abuse del sistema

### Mejoras de Seguridad Recomendadas

```typescript
// Agregar rate limiting en API routes
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  // Verificar rate limit
  const limiter = rateLimit({
    interval: 60 * 1000, // 1 minuto
    uniqueTokenPerInterval: 500,
  })
  
  try {
    await limiter.check(10, 'CACHE_TOKEN') // 10 requests por minuto
  } catch {
    return new Response('Rate limit exceeded', { status: 429 })
  }
  
  // Tu código...
}
```

---

## 📊 Monitoreo y Logs

### Logs Disponibles

**Vercel**:
- Build logs (durante deployment)
- Function logs (API routes en runtime)
- Edge logs (si usas Edge Runtime)

**Google Cloud Console**:
- API usage (cuántas llamadas a Calendar API)
- Errores de autenticación
- Quotas y límites

### Métricas Importantes

**Rendimiento**:
- Tiempo de carga de landing page (objetivo: < 2s)
- Tiempo de respuesta de API availability (objetivo: < 1s)
- Tiempo de creación de reserva (objetivo: < 2s)

**Negocio**:
- Número de visitantes/día
- Tasa de conversión (visitas → reservas)
- Horarios más populares
- Servicios más solicitados

---

## 🎯 Puntos Críticos del Sistema

### Dependencias Críticas

1. **Google Calendar API**
   - Si falla: No se pueden crear ni consultar reservas
   - Mitigación: Manejo de errores + mensajes claros al usuario

2. **Vercel Hosting**
   - Si falla: Sitio no accesible
   - Mitigación: Vercel tiene 99.99% uptime

3. **Refresh Token**
   - Si expira: API deja de funcionar
   - Mitigación: Renovación automática implementada

### Puntos de Fallo y Recuperación

| Punto de Fallo | Impacto | Solución |
|----------------|---------|----------|
| Token expirado | API falla | Renovación automática implementada |
| Google Calendar API down | No se pueden crear reservas | Mostrar mensaje de error, reintentar |
| Vercel down | Sitio no accesible | Esperar (99.99% uptime) |
| Build falla | No se puede desplegar | Rollback a versión anterior |
| Error en código | Funcionalidad rota | Rollback + fix + redeploy |

---

## 💻 Stack Tecnológico Completo

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                              │
├─────────────────────────────────────────────────────────┤
│ React 18.3.1          │ UI Library                       │
│ Next.js 14.2.35       │ Framework (SSR + API Routes)     │
│ TypeScript 5.4.5      │ Type Safety                      │
│ Tailwind CSS 3.4.1    │ Styling                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    BACKEND                               │
├─────────────────────────────────────────────────────────┤
│ Next.js API Routes    │ Serverless Functions             │
│ Google APIs 171.4.0   │ Google Calendar Integration      │
│ Node.js 18+           │ Runtime                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  INFRASTRUCTURE                          │
├─────────────────────────────────────────────────────────┤
│ Vercel                │ Hosting + Serverless             │
│ Google Cloud Platform │ Calendar API + OAuth             │
│ GitHub                │ Version Control + CI/CD          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   DEVELOPMENT                            │
├─────────────────────────────────────────────────────────┤
│ ESLint                │ Code Linting                     │
│ PostCSS               │ CSS Processing                   │
│ Autoprefixer          │ CSS Vendor Prefixes              │
└─────────────────────────────────────────────────────────┘
```

---

## 🌐 Arquitectura de Despliegue en Vercel

```
┌────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                      │
│                     (CDN Global)                            │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       │ Enruta a la región más cercana
                       │
┌──────────────────────▼─────────────────────────────────────┐
│                 Vercel Serverless Region                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Static Assets (Cached)                       │  │
│  │  - CSS, JS, Fonts, Images                           │  │
│  │  - Servidos desde CDN                               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Server-Side Rendered Pages                   │  │
│  │  - / (Landing Page)                                 │  │
│  │  - /reservar (Booking Page)                         │  │
│  │  - Generadas on-demand                              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Serverless Functions                         │  │
│  │  - /api/availability (Lambda)                       │  │
│  │  - /api/book (Lambda)                               │  │
│  │  - Ejecutadas on-demand                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Debugging Guide

### Problema: Landing page sin estilos

**Diagnóstico**:
```bash
# 1. Verificar que Tailwind esté instalado
npm list tailwindcss
# Debe ser v3.4.1

# 2. Verificar archivos de configuración
ls tailwind.config.js postcss.config.js
# Ambos deben existir

# 3. Verificar globals.css
head -n 5 app/globals.css
# Debe tener @tailwind directives
```

**Solución**: Ver `INTEGRACION_HTML_A_NEXTJS.md`

### Problema: API de reservas falla

**Diagnóstico**:
```bash
# 1. Verificar variables de entorno
cat .env.local
# Deben existir las 3 variables de Google

# 2. Ver logs del servidor
# En la terminal donde corre npm run dev

# 3. Probar endpoint directamente
curl http://localhost:3000/api/availability?date=2026-03-30&service=Corte
```

**Solución**: Ver `GUIA_IMPLEMENTACION.md`

### Problema: Reservas no aparecen en Calendar

**Diagnóstico**:
1. Verificar que el `calendarId` en `config/business.json` sea correcto
2. Verificar permisos de la cuenta de Google
3. Revisar logs de la API en Vercel

**Solución**:
- Cambiar `calendarId` a `"primary"`
- Verificar que el token tenga permisos de escritura

---

## 📝 Convenciones de Código

### Nombres de Archivos

- **Componentes**: PascalCase (`BookingForm.tsx`)
- **API Routes**: lowercase (`route.ts`)
- **Utilidades**: camelCase (`dateUtils.ts`)
- **Configuración**: lowercase (`business.json`)

### Estructura de Componentes

```tsx
'use client' // Si usa hooks o interactividad

import { useState } from 'react'
import Link from 'next/link'

export default function ComponentName() {
  // 1. Hooks
  const [state, setState] = useState()
  
  // 2. Funciones
  const handleAction = () => {
    // ...
  }
  
  // 3. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Estructura de API Routes

```typescript
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // 1. Validar parámetros
    // 2. Procesar lógica
    // 3. Retornar respuesta
    return NextResponse.json({ data })
  } catch (error) {
    // Manejo de errores
    return NextResponse.json(
      { error: 'Mensaje de error' },
      { status: 500 }
    )
  }
}
```

---

## 🎓 Recursos de Aprendizaje

### Para entender el código

1. **Next.js App Router**: https://nextjs.org/docs/app
2. **React Hooks**: https://react.dev/reference/react
3. **Tailwind CSS**: https://tailwindcss.com/docs
4. **Google Calendar API**: https://developers.google.com/calendar/api/guides/overview

### Para modificar el sistema

1. **Agregar nuevos servicios**: Editar `config/business.json`
2. **Cambiar horarios**: Editar `config/business.json`
3. **Modificar diseño**: Editar `app/page.tsx` (Tailwind classes)
4. **Agregar páginas**: Crear carpeta en `app/` con `page.tsx`

---

**Fecha de creación**: 27 de marzo de 2026  
**Última actualización**: 27 de marzo de 2026  
**Versión**: 1.0
