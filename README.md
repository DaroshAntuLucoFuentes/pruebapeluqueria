# 💈 Sistema de Reservas para Peluquería - The Editorial Atelier

Sistema completo de reservas online integrado con Google Calendar, con landing page elegante y sistema de agendamiento.

---

## 🌟 Características

- ✅ Landing page premium con diseño editorial
- ✅ Sistema de reservas integrado con Google Calendar
- ✅ Consulta de disponibilidad en tiempo real
- ✅ Confirmación automática de citas
- ✅ Diseño responsive (móvil y desktop)
- ✅ Integración completa con Google Calendar API

---

## 🚀 Inicio Rápido

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
# Copia .env.example a .env.local y completa tus credenciales

# 3. Configurar tu negocio
# Edita config/business.json con tus servicios y horarios

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

---

## 📁 Estructura del Proyecto

```
├── app/
│   ├── page.tsx              # Landing page (página principal)
│   ├── reservar/
│   │   └── page.tsx          # Sistema de reservas
│   ├── api/
│   │   ├── availability/     # API: Consultar disponibilidad
│   │   └── book/             # API: Crear reserva
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Estilos globales
│
├── config/
│   └── business.json         # Configuración del negocio
│
├── tailwind.config.js        # Configuración de Tailwind CSS
├── postcss.config.js         # Configuración de PostCSS
├── next.config.js            # Configuración de Next.js
└── package.json              # Dependencias

```

---

## 🎨 Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page con información del salón |
| `/reservar` | Sistema de agendamiento de citas |
| `/api/availability` | API para consultar horarios disponibles |
| `/api/book` | API para crear reservas en Google Calendar |

---

## ⚙️ Configuración

### 1. Variables de Entorno (`.env.local`)

```env
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret
GOOGLE_REFRESH_TOKEN=tu-refresh-token
```

### 2. Configuración del Negocio (`config/business.json`)

```json
{
  "name": "Tu Peluquería",
  "calendarId": "primary",
  "timezone": "America/Santiago",
  "workingHours": {
    "monday": ["09:00", "18:00"],
    "tuesday": ["09:00", "18:00"],
    "wednesday": ["09:00", "18:00"],
    "thursday": ["09:00", "18:00"],
    "friday": ["09:00", "18:00"],
    "saturday": ["10:00", "14:00"]
  },
  "services": [
    {
      "name": "Corte",
      "duration": 45
    },
    {
      "name": "Corte + Barba",
      "duration": 60
    }
  ],
  "slotInterval": 15
}
```

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 14.2.35
- **UI Library**: React 18.3.1
- **Estilos**: Tailwind CSS 3.4.1
- **Fuentes**: Google Fonts (Noto Serif + Manrope)
- **Iconos**: Material Symbols
- **API**: Google Calendar API
- **Lenguaje**: TypeScript

---

## 📚 Documentación Adicional

Este proyecto incluye documentación completa:

| Documento | Descripción |
|-----------|-------------|
| `GUIA_IMPLEMENTACION.md` | Guía completa de implementación y configuración de Google Calendar |
| `INTEGRACION_HTML_A_NEXTJS.md` | Cómo integrar diseños HTML estáticos a Next.js |
| `DESPLIEGUE_VERCEL.md` | Guía paso a paso para desplegar en Vercel |
| `COMANDOS_DESPLIEGUE.md` | Referencia rápida de comandos de despliegue |

---

## 🚀 Despliegue a Producción

### Resumen Rápido

1. **Subir a GitHub**:
   ```bash
   git add .
   git commit -m "Preparar para producción"
   git push origin main
   ```

2. **Desplegar en Vercel**:
   - Importar repositorio desde GitHub
   - Configurar variables de entorno
   - Deploy

3. **Configurar Google Cloud**:
   - Agregar URL de Vercel a "Authorized redirect URIs"

**Ver guía completa**: `DESPLIEGUE_VERCEL.md`

---

## 🎯 Flujo de Usuario

1. **Landing Page** (`/`)
   - Usuario ve información del salón
   - Servicios, testimonios, FAQ
   - Click en "Reservar" → Redirige a `/reservar`

2. **Sistema de Reservas** (`/reservar`)
   - Selecciona servicio
   - Elige fecha
   - Ve horarios disponibles en tiempo real
   - Completa datos personales
   - Confirma reserva
   - Cita se crea automáticamente en Google Calendar

---

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Limpiar y reinstalar
rm -rf .next node_modules
npm install
npm run dev
```

### Los estilos no se ven

```bash
# Verificar que Tailwind esté instalado
npm list tailwindcss

# Debe mostrar: tailwindcss@3.4.1 (NO v4)

# Si es v4, reinstalar v3:
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.1

# Reiniciar servidor
npm run dev
```

### Error de Google Calendar API

1. Verifica que las variables de entorno estén configuradas
2. Verifica que el token no haya expirado
3. Revisa los logs en la terminal
4. Consulta `GUIA_IMPLEMENTACION.md` para reautenticación

---

## 📞 Soporte

Para más información, consulta la documentación en los archivos MD incluidos en el proyecto.

---

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para el cliente.

---

**Versión**: 1.0  
**Última actualización**: 27 de marzo de 2026  
**Desarrollado para**: The Editorial Atelier
