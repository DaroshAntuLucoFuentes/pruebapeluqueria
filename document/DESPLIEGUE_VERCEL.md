# 🚀 Guía de Despliegue a Vercel

Esta guía te explica paso a paso cómo desplegar tu aplicación de peluquería con sistema de reservas a Vercel.

---

## 📋 Requisitos Previos

Antes de desplegar, asegúrate de tener:

- [ ] Cuenta en [Vercel](https://vercel.com) (gratis)
- [ ] Cuenta en [GitHub](https://github.com) (gratis)
- [ ] Proyecto funcionando localmente sin errores
- [ ] Credenciales de Google Cloud configuradas (para Google Calendar API)

---

## 🔐 PASO 1: Preparar Variables de Entorno

### 1.1 Crear archivo `.env.local` (si no existe)

Crea el archivo `.env.local` en la raíz del proyecto con tus credenciales:

```env
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret
GOOGLE_REFRESH_TOKEN=tu-refresh-token
```

### 1.2 Asegurar que `.env.local` esté en `.gitignore`

Verifica que tu archivo `.gitignore` incluya:

```
# Variables de entorno
.env
.env.local
.env.*.local
.env.production
.env.development

# Next.js
.next/
out/
build/

# Node modules
node_modules/

# Archivos de sistema
.DS_Store
*.log
```

**⚠️ NUNCA subas archivos `.env` a GitHub** - contienen información sensible.

---

## 📦 PASO 2: Preparar el Repositorio Git

### 2.1 Inicializar Git (si no está inicializado)

```bash
git init
```

### 2.2 Crear `.gitignore` (si no existe)

Usa el contenido del paso 1.2

### 2.3 Hacer commit de tu código

```bash
git add .
git commit -m "Preparar aplicación para despliegue en Vercel"
```

### 2.4 Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com/new)
2. Crea un nuevo repositorio (ej: `peluqueria-sistema-reservas`)
3. **NO inicialices con README** (ya tienes código local)
4. Copia la URL del repositorio

### 2.5 Subir código a GitHub

```bash
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git branch -M main
git push -u origin main
```

---

## 🌐 PASO 3: Desplegar en Vercel

### Opción A: Despliegue desde la Web (Recomendado)

1. **Ir a [Vercel](https://vercel.com)**
   - Inicia sesión con tu cuenta de GitHub

2. **Importar Proyecto**
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio de GitHub
   - Click en "Import"

3. **Configurar Proyecto**
   - **Framework Preset**: Next.js (se detecta automáticamente)
   - **Root Directory**: `./` (dejar por defecto)
   - **Build Command**: `npm run build` (por defecto)
   - **Output Directory**: `.next` (por defecto)
   - **Install Command**: `npm install` (por defecto)

4. **Agregar Variables de Entorno**
   
   En la sección "Environment Variables", agrega:
   
   | Name | Value |
   |------|-------|
   | `GOOGLE_CLIENT_ID` | tu-client-id.apps.googleusercontent.com |
   | `GOOGLE_CLIENT_SECRET` | tu-client-secret |
   | `GOOGLE_REFRESH_TOKEN` | tu-refresh-token |

   **Importante**: Marca las 3 variables para todos los entornos (Production, Preview, Development)

5. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos mientras Vercel construye tu aplicación
   - ¡Listo! Tu sitio estará en `https://tu-proyecto.vercel.app`

### Opción B: Despliegue desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel

# Seguir las instrucciones en pantalla
```

---

## 🔒 PASO 4: Configurar Google Cloud para Producción

### 4.1 Agregar Dominio de Vercel a Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto
3. Ve a "APIs & Services" → "Credentials"
4. Edita tu "OAuth 2.0 Client ID"
5. En "Authorized redirect URIs", agrega:
   ```
   https://tu-proyecto.vercel.app/api/auth/callback
   ```
6. En "Authorized JavaScript origins", agrega:
   ```
   https://tu-proyecto.vercel.app
   ```

### 4.2 Actualizar Configuración del Calendario

Si usas un `calendarId` específico en `config/business.json`, asegúrate de que:
- El calendario existe en la cuenta de Google autenticada
- Tienes permisos de escritura en ese calendario
- El `calendarId` es correcto (o usa `"primary"` para el calendario principal)

---

## 🔄 PASO 5: Actualizaciones Automáticas

### Configuración de Auto-Deploy

Vercel automáticamente:
- ✅ Despliega cada push a `main` en producción
- ✅ Crea previews para cada pull request
- ✅ Ejecuta builds y tests automáticamente

### Para actualizar tu sitio:

```bash
# 1. Hacer cambios en tu código
# 2. Commit
git add .
git commit -m "Descripción de cambios"

# 3. Push a GitHub
git push origin main

# 4. Vercel desplegará automáticamente en ~2 minutos
```

---

## 🛠️ PASO 6: Configuración Avanzada (Opcional)

### 6.1 Dominio Personalizado

1. En Vercel, ve a tu proyecto → "Settings" → "Domains"
2. Agrega tu dominio personalizado (ej: `www.mipeluqueria.com`)
3. Sigue las instrucciones para configurar DNS
4. Vercel provee SSL automático (HTTPS)

### 6.2 Variables de Entorno por Ambiente

Puedes tener diferentes configuraciones para:
- **Production**: Variables para el sitio en vivo
- **Preview**: Variables para branches de prueba
- **Development**: Variables para desarrollo local

### 6.3 Configurar Regiones

Por defecto, Vercel despliega en múltiples regiones. Para optimizar:

Crea `vercel.json`:

```json
{
  "regions": ["iad1"],
  "framework": "nextjs"
}
```

Regiones recomendadas para Latinoamérica:
- `iad1` - Washington, D.C., USA (más cercano a Chile)
- `gru1` - São Paulo, Brasil

---

## 📊 PASO 7: Monitoreo y Analytics

### 7.1 Analytics de Vercel (Gratis)

1. Ve a tu proyecto en Vercel
2. Click en "Analytics"
3. Verás métricas de:
   - Visitantes
   - Páginas más vistas
   - Rendimiento
   - Errores

### 7.2 Logs y Debugging

Para ver logs de errores:
1. Ve a tu proyecto → "Deployments"
2. Click en el deployment actual
3. Ve a "Functions" para ver logs de las API routes
4. Útil para debuggear errores de Google Calendar API

---

## ⚡ PASO 8: Optimizaciones de Rendimiento

### 8.1 Optimizar Imágenes

Reemplaza las etiquetas `<img>` por el componente `Image` de Next.js:

```tsx
import Image from 'next/image'

// Antes:
<img src="url" alt="descripción" />

// Después:
<Image 
  src="url" 
  alt="descripción"
  width={1920}
  height={1080}
  priority // Solo para imágenes above-the-fold
/>
```

### 8.2 Configurar Cache

Vercel automáticamente cachea:
- Páginas estáticas
- Assets (CSS, JS, imágenes)
- API responses (configurable)

Para configurar cache de API routes, agrega en tus archivos de API:

```typescript
export const revalidate = 60 // Revalidar cada 60 segundos
```

---

## 🐛 Solución de Problemas Comunes

### Error: "Module not found"

**Causa**: Dependencias no instaladas en producción

**Solución**: Verifica que todas las dependencias estén en `dependencies` (no en `devDependencies`) si se usan en runtime:

```bash
# Mover dependencia a production
npm install nombre-paquete
npm uninstall -D nombre-paquete
```

### Error: "Environment variable not found"

**Causa**: Variables de entorno no configuradas en Vercel

**Solución**: 
1. Ve a Settings → Environment Variables
2. Agrega las variables faltantes
3. Redeploy el proyecto

### Error: "Google Calendar API failed"

**Causa**: URLs de redirect no autorizadas

**Solución**: Revisa el PASO 4.1 - Agregar dominio de Vercel a Google Cloud Console

### Página en blanco o sin estilos

**Causa**: Error en el build de Tailwind

**Solución**:
1. Verifica que `tailwind.config.js` esté en la raíz
2. Verifica que `globals.css` tenga las directivas `@tailwind`
3. Revisa los logs del deployment en Vercel

---

## 📱 PASO 9: Testing Post-Despliegue

Después de desplegar, verifica:

- [ ] La landing page se ve correctamente
- [ ] Los botones "Reservar" redirigen a `/reservar`
- [ ] El sistema de reservas carga los servicios
- [ ] El calendario de disponibilidad funciona
- [ ] Se pueden crear reservas exitosamente
- [ ] Las reservas aparecen en Google Calendar
- [ ] El sitio es responsive (prueba en móvil)
- [ ] Todas las fuentes e iconos cargan correctamente

---

## 💰 Costos

### Plan Gratuito de Vercel incluye:

- ✅ Despliegues ilimitados
- ✅ 100 GB de ancho de banda
- ✅ Previews automáticos
- ✅ SSL automático
- ✅ Analytics básico
- ✅ Funciones serverless (100 GB-Hrs)

**Suficiente para:**
- Pequeñas y medianas peluquerías
- Hasta ~10,000 visitantes/mes
- Cientos de reservas por mes

### Cuándo considerar el plan Pro ($20/mes):

- Más de 100 GB de ancho de banda
- Necesitas más funciones serverless
- Quieres analytics avanzado
- Múltiples sitios/clientes

---

## 🔄 PASO 10: Mantenimiento

### Actualizar el Sitio

```bash
# 1. Hacer cambios localmente
# 2. Probar localmente
npm run dev

# 3. Commit y push
git add .
git commit -m "Actualización de [descripción]"
git push origin main

# 4. Vercel despliega automáticamente
```

### Rollback (Volver a versión anterior)

1. Ve a Vercel → tu proyecto → "Deployments"
2. Encuentra el deployment anterior que funcionaba
3. Click en "..." → "Promote to Production"

### Actualizar Variables de Entorno

1. Ve a Settings → Environment Variables
2. Edita las variables necesarias
3. **Importante**: Debes hacer un nuevo deployment para que tomen efecto
4. Ve a Deployments → Click en "..." del último → "Redeploy"

---

## 🎓 Checklist Final de Despliegue

Antes de considerar el despliegue completo, verifica:

- [ ] Código subido a GitHub
- [ ] Variables de entorno configuradas en Vercel
- [ ] URLs de redirect configuradas en Google Cloud Console
- [ ] Build exitoso en Vercel (sin errores)
- [ ] Landing page funciona correctamente
- [ ] Sistema de reservas funciona correctamente
- [ ] Reservas se crean en Google Calendar
- [ ] Sitio responsive en móvil y desktop
- [ ] Todas las fuentes e iconos cargan
- [ ] No hay errores en la consola del navegador
- [ ] Dominio personalizado configurado (opcional)

---

## 📞 Soporte y Recursos

### Documentación Oficial

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli)

### Comandos Útiles de Vercel CLI

```bash
# Ver logs en tiempo real
vercel logs

# Listar deployments
vercel ls

# Ver información del proyecto
vercel inspect

# Agregar variable de entorno
vercel env add NOMBRE_VARIABLE

# Listar variables de entorno
vercel env ls
```

### Debugging en Producción

Si algo falla en producción:

1. **Ver logs**: Vercel → Proyecto → Deployments → Click en deployment → Functions
2. **Revisar build logs**: Click en "Building" en el deployment
3. **Comparar con local**: ¿Funciona en `npm run build` localmente?
4. **Verificar variables de entorno**: Settings → Environment Variables

---

## 🎯 Flujo Completo de Despliegue

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Desarrollo Local                                         │
│    - Hacer cambios en el código                             │
│    - Probar con npm run dev                                 │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Git                                                       │
│    - git add .                                               │
│    - git commit -m "mensaje"                                 │
│    - git push origin main                                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Vercel (Automático)                                      │
│    - Detecta el push                                         │
│    - Ejecuta npm install                                     │
│    - Ejecuta npm run build                                   │
│    - Despliega a producción                                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Sitio en Vivo                                            │
│    - https://tu-proyecto.vercel.app                          │
│    - SSL automático (HTTPS)                                  │
│    - CDN global                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Configuraciones Adicionales

### Configurar `vercel.json` (Opcional)

Crea `vercel.json` en la raíz para configuraciones avanzadas:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Configurar Redirects

Si necesitas redirects, agrégalos en `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/agendar',
        destination: '/reservar',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

---

## 📈 PASO 11: Optimización Post-Despliegue

### 11.1 Habilitar Edge Functions (Opcional)

Para mejor rendimiento global, puedes usar Edge Runtime en tus API routes:

```typescript
// app/api/availability/route.ts
export const runtime = 'edge' // Solo si no usas Node.js APIs

export async function GET(request: Request) {
  // Tu código...
}
```

**Nota**: Google Calendar API requiere Node.js runtime, así que NO uses edge para esas rutas.

### 11.2 Configurar ISR (Incremental Static Regeneration)

Para páginas que cambian poco:

```typescript
// app/page.tsx
export const revalidate = 3600 // Regenerar cada hora
```

### 11.3 Optimizar Imágenes

Usa el componente `Image` de Next.js para todas las imágenes:

```tsx
import Image from 'next/image'

<Image
  src="/imagen.jpg"
  alt="Descripción"
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
/>
```

---

## 🚨 Troubleshooting en Producción

### Build Falla en Vercel

**Síntomas**: El deployment falla con error de build

**Soluciones**:

1. **Probar build localmente**:
   ```bash
   npm run build
   ```
   Si falla local, arregla los errores primero.

2. **Verificar versiones de Node**:
   - Vercel usa Node 18 por defecto
   - Especifica versión en `package.json`:
   ```json
   {
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

3. **Limpiar cache de Vercel**:
   - Ve a Settings → General → "Clear Build Cache"
   - Redeploy

### API Routes no funcionan

**Síntomas**: Errores 500 en `/api/*`

**Soluciones**:

1. **Verificar variables de entorno**:
   - Settings → Environment Variables
   - Asegúrate de que todas estén configuradas

2. **Ver logs**:
   - Deployments → Click en deployment → Functions
   - Revisa los logs de error

3. **Verificar Google Cloud Console**:
   - URLs de redirect correctas
   - API de Google Calendar habilitada
   - Credenciales válidas

### Estilos no se aplican

**Síntomas**: Página sin estilos o con estilos rotos

**Soluciones**:

1. **Verificar que Tailwind esté en devDependencies**:
   ```bash
   npm install -D tailwindcss@^3.4.1
   ```

2. **Verificar `tailwind.config.js`**:
   - Debe estar en la raíz del proyecto
   - El `content` debe incluir todos los archivos

3. **Limpiar cache y rebuild**:
   ```bash
   # Local
   rm -rf .next
   npm run build
   
   # Vercel
   Settings → Clear Build Cache → Redeploy
   ```

---

## 🔐 Seguridad

### Mejores Prácticas

1. **NUNCA subas `.env` a GitHub**
2. **Usa variables de entorno** para todas las credenciales
3. **Habilita 2FA** en Vercel y GitHub
4. **Revisa logs regularmente** para detectar accesos sospechosos
5. **Actualiza dependencias** periódicamente:
   ```bash
   npm outdated
   npm update
   ```

### Rotar Credenciales

Si tus credenciales se comprometen:

1. **Google Cloud Console**:
   - Regenera Client Secret
   - Regenera Refresh Token

2. **Vercel**:
   - Actualiza las variables de entorno
   - Redeploy

---

## 📋 Resumen de URLs Importantes

Después del despliegue, tendrás:

| Recurso | URL |
|---------|-----|
| Sitio en producción | `https://tu-proyecto.vercel.app` |
| Landing page | `https://tu-proyecto.vercel.app/` |
| Sistema de reservas | `https://tu-proyecto.vercel.app/reservar` |
| Dashboard de Vercel | `https://vercel.com/tu-usuario/tu-proyecto` |
| Repositorio GitHub | `https://github.com/tu-usuario/tu-repositorio` |
| Google Cloud Console | `https://console.cloud.google.com` |

---

## ✅ Checklist de Despliegue Exitoso

- [ ] Código funciona localmente sin errores
- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Build exitoso (verde en Vercel)
- [ ] Landing page accesible y con estilos
- [ ] Sistema de reservas funciona
- [ ] Reservas se crean en Google Calendar
- [ ] URLs de redirect configuradas en Google Cloud
- [ ] Sitio responsive en móvil
- [ ] No hay errores en la consola del navegador
- [ ] Analytics configurado (opcional)
- [ ] Dominio personalizado configurado (opcional)

---

## 🎉 ¡Listo!

Tu aplicación de peluquería con sistema de reservas está ahora en producción, accesible desde cualquier parte del mundo, con SSL automático y despliegues automáticos.

**Comparte el link con tus clientes**: `https://tu-proyecto.vercel.app`

---

**Fecha de creación**: 27 de marzo de 2026  
**Última actualización**: 27 de marzo de 2026  
**Versión**: 1.0
