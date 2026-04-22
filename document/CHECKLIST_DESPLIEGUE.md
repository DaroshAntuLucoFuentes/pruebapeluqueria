# ✅ Checklist de Despliegue a Vercel

Usa este checklist para asegurar un despliegue exitoso sin problemas.

---

## 📋 ANTES DE DESPLEGAR

### Preparación Local

- [ ] El proyecto funciona correctamente en local (`npm run dev`)
- [ ] No hay errores en la consola del navegador (F12)
- [ ] No hay errores en la terminal del servidor
- [ ] El build funciona sin errores (`npm run build`)
- [ ] Todas las dependencias están instaladas
- [ ] Archivo `.env.local` existe con las 3 variables de Google
- [ ] Archivo `config/business.json` configurado con tus servicios

### Testing Local Completo

- [ ] Landing page se ve correctamente en `http://localhost:3000`
- [ ] Botones "Reservar" redirigen a `/reservar`
- [ ] Sistema de reservas carga los servicios correctamente
- [ ] Puedes seleccionar fecha y ver disponibilidad
- [ ] Puedes crear una reserva de prueba
- [ ] La reserva aparece en Google Calendar
- [ ] El sitio es responsive (prueba en móvil con DevTools)

### Archivos de Configuración

- [ ] `tailwind.config.js` existe en la raíz
- [ ] `postcss.config.js` existe en la raíz
- [ ] `next.config.js` existe en la raíz
- [ ] `.gitignore` incluye `.env.local` y `.env`
- [ ] `package.json` tiene todas las dependencias correctas

---

## 🔐 CONFIGURACIÓN DE GOOGLE CLOUD

### Google Cloud Console

- [ ] Proyecto creado en Google Cloud Console
- [ ] Google Calendar API habilitada
- [ ] OAuth 2.0 Client ID creado
- [ ] Client ID y Client Secret guardados
- [ ] Refresh Token generado y guardado
- [ ] URLs de redirect configuradas para localhost (desarrollo)

---

## 📦 PREPARAR REPOSITORIO GIT

### Inicialización

- [ ] Git inicializado (`git init`)
- [ ] `.gitignore` configurado correctamente
- [ ] Primer commit realizado
- [ ] Archivos sensibles NO están en Git (verificar con `git status`)

### GitHub

- [ ] Cuenta de GitHub creada
- [ ] Repositorio creado en GitHub
- [ ] Repositorio es privado (si contiene información sensible)
- [ ] Código subido a GitHub (`git push origin main`)
- [ ] Verificado en GitHub que los archivos estén ahí

---

## 🌐 DESPLIEGUE EN VERCEL

### Cuenta y Proyecto

- [ ] Cuenta de Vercel creada (con GitHub)
- [ ] Proyecto importado desde GitHub
- [ ] Framework detectado como "Next.js"
- [ ] Root directory es `./` (por defecto)

### Variables de Entorno en Vercel

- [ ] `GOOGLE_CLIENT_ID` agregada
- [ ] `GOOGLE_CLIENT_SECRET` agregada
- [ ] `GOOGLE_REFRESH_TOKEN` agregada
- [ ] Las 3 variables marcadas para "Production"
- [ ] Las 3 variables marcadas para "Preview" (opcional)
- [ ] Las 3 variables marcadas para "Development" (opcional)

### Deployment

- [ ] Click en "Deploy"
- [ ] Build completado sin errores (estado verde)
- [ ] Deployment exitoso
- [ ] URL de producción generada (ej: `https://tu-proyecto.vercel.app`)

---

## 🔧 CONFIGURACIÓN POST-DESPLIEGUE

### Google Cloud Console - Actualizar URLs

- [ ] Ir a Google Cloud Console → APIs & Services → Credentials
- [ ] Editar OAuth 2.0 Client ID
- [ ] Agregar a "Authorized JavaScript origins":
  - `https://tu-proyecto.vercel.app`
- [ ] Agregar a "Authorized redirect URIs":
  - `https://tu-proyecto.vercel.app/api/auth/callback`
- [ ] Guardar cambios

### Verificar Calendario

- [ ] `calendarId` en `config/business.json` es correcto
- [ ] Tienes acceso de escritura al calendario
- [ ] El calendario existe en la cuenta autenticada

---

## 🧪 TESTING EN PRODUCCIÓN

### Acceso Básico

- [ ] Abrir `https://tu-proyecto.vercel.app` en el navegador
- [ ] La landing page carga correctamente
- [ ] Todos los estilos se ven bien
- [ ] Las fuentes (Noto Serif, Manrope) cargan correctamente
- [ ] Los iconos de Material Symbols se ven
- [ ] No hay errores en la consola del navegador (F12)

### Navegación

- [ ] Click en botón "Reservar" del header → va a `/reservar`
- [ ] Click en botón "Reservar" del hero → va a `/reservar`
- [ ] Click en botón "Reservar" del CTA final → va a `/reservar`
- [ ] En `/reservar`, el link "Volver al inicio" funciona

### Sistema de Reservas

- [ ] Página `/reservar` carga correctamente
- [ ] Los servicios se muestran en el selector
- [ ] Puedes seleccionar una fecha
- [ ] Click en "Consultar Disponibilidad" funciona
- [ ] Se muestran horarios disponibles
- [ ] Puedes seleccionar un horario
- [ ] Puedes completar nombre y teléfono
- [ ] Click en "Confirmar Reserva" funciona
- [ ] Mensaje de confirmación aparece
- [ ] La reserva aparece en Google Calendar

### Responsive

- [ ] Sitio se ve bien en móvil (DevTools → Toggle device toolbar)
- [ ] Sitio se ve bien en tablet
- [ ] Sitio se ve bien en desktop
- [ ] Todos los botones son clickeables en móvil
- [ ] El menú de navegación funciona en móvil

---

## 📊 MONITOREO POST-DESPLIEGUE

### Primeras 24 Horas

- [ ] Revisar logs en Vercel (Deployments → Functions)
- [ ] Verificar que no haya errores 500
- [ ] Probar crear al menos 3 reservas de prueba
- [ ] Verificar que las 3 aparezcan en Google Calendar
- [ ] Revisar analytics de Vercel (visitantes)

### Primera Semana

- [ ] Revisar logs diariamente
- [ ] Verificar que las reservas reales se estén creando
- [ ] Pedir feedback a usuarios de prueba
- [ ] Verificar rendimiento (tiempo de carga)
- [ ] Revisar uso de recursos en Vercel

---

## 🚨 TROUBLESHOOTING CHECKLIST

### Si el sitio no carga

- [ ] Verificar que el deployment esté en "Ready" (verde)
- [ ] Verificar que no haya errores en los logs de build
- [ ] Intentar acceder desde navegador de incógnito
- [ ] Limpiar cache del navegador
- [ ] Verificar que la URL sea correcta

### Si los estilos no se ven

- [ ] Hacer hard refresh (Ctrl + Shift + R)
- [ ] Verificar en DevTools que los archivos CSS carguen
- [ ] Revisar logs de build en Vercel
- [ ] Verificar que `tailwind.config.js` esté en el repositorio
- [ ] Verificar que `globals.css` tenga las directivas `@tailwind`

### Si las API routes fallan

- [ ] Verificar variables de entorno en Vercel Settings
- [ ] Verificar logs de Functions en Vercel
- [ ] Verificar que las URLs de Google Cloud estén actualizadas
- [ ] Probar los endpoints directamente (con Postman o curl)
- [ ] Verificar que el token no haya expirado

### Si las reservas no se crean

- [ ] Verificar que `GOOGLE_REFRESH_TOKEN` esté configurado
- [ ] Verificar que el `calendarId` sea correcto
- [ ] Verificar permisos en Google Calendar
- [ ] Revisar logs de la API en Vercel
- [ ] Probar crear evento manualmente en Google Calendar

---

## 🎯 OPTIMIZACIONES OPCIONALES

### Rendimiento

- [ ] Configurar ISR (Incremental Static Regeneration)
- [ ] Optimizar imágenes con Next.js Image component
- [ ] Habilitar compresión de assets
- [ ] Configurar cache headers

### SEO

- [ ] Agregar meta tags en `layout.tsx`
- [ ] Agregar `robots.txt`
- [ ] Agregar `sitemap.xml`
- [ ] Configurar Open Graph tags
- [ ] Agregar Google Analytics (opcional)

### Seguridad

- [ ] Configurar headers de seguridad en `vercel.json`
- [ ] Implementar rate limiting en API routes
- [ ] Configurar CORS si es necesario
- [ ] Habilitar 2FA en Vercel y GitHub

---

## 🎉 DESPLIEGUE EXITOSO

### Confirmación Final

- [ ] Sitio accesible en `https://tu-proyecto.vercel.app`
- [ ] Landing page funciona perfectamente
- [ ] Sistema de reservas funciona perfectamente
- [ ] Reservas se crean en Google Calendar
- [ ] No hay errores en logs
- [ ] Sitio responsive en todos los dispositivos
- [ ] SSL/HTTPS funcionando (candado verde en navegador)

### Compartir con Cliente

- [ ] URL del sitio: `https://tu-proyecto.vercel.app`
- [ ] Credenciales de acceso (si aplica)
- [ ] Instrucciones de uso
- [ ] Documentación entregada

---

## 📅 MANTENIMIENTO CONTINUO

### Semanal

- [ ] Revisar logs de Vercel
- [ ] Verificar que las reservas se estén creando
- [ ] Revisar analytics de visitantes

### Mensual

- [ ] Actualizar dependencias: `npm update`
- [ ] Verificar tokens de Google
- [ ] Revisar y actualizar servicios si es necesario
- [ ] Backup de configuración

### Trimestral

- [ ] Revisar y actualizar contenido de landing page
- [ ] Revisar precios de servicios
- [ ] Actualizar horarios de atención si cambiaron
- [ ] Revisar feedback de usuarios

---

## 🔄 ACTUALIZACIONES FUTURAS

### Antes de cada actualización

- [ ] Probar cambios en local
- [ ] Hacer build local sin errores
- [ ] Commit con mensaje descriptivo
- [ ] Push a GitHub
- [ ] Esperar deployment automático de Vercel
- [ ] Verificar que el deployment sea exitoso
- [ ] Probar en producción
- [ ] Si algo falla, hacer rollback inmediato

---

## 📞 CONTACTOS Y RECURSOS

### URLs Importantes

- [ ] Sitio en producción: `https://tu-proyecto.vercel.app`
- [ ] Dashboard de Vercel: `https://vercel.com/dashboard`
- [ ] Repositorio GitHub: `https://github.com/tu-usuario/tu-repo`
- [ ] Google Cloud Console: `https://console.cloud.google.com`
- [ ] Google Calendar: `https://calendar.google.com`

### Documentación del Proyecto

- [ ] `README.md` - Resumen general
- [ ] `GUIA_IMPLEMENTACION.md` - Configuración de Google Calendar
- [ ] `INTEGRACION_HTML_A_NEXTJS.md` - Problemas de estilos
- [ ] `DESPLIEGUE_VERCEL.md` - Guía completa de despliegue
- [ ] `COMANDOS_DESPLIEGUE.md` - Comandos rápidos
- [ ] `ARQUITECTURA.md` - Arquitectura técnica

---

## 🎊 ¡FELICIDADES!

Si completaste todos los checkboxes, tu sistema está:
- ✅ Desplegado en producción
- ✅ Funcionando correctamente
- ✅ Listo para recibir clientes
- ✅ Monitoreado y mantenible

**Comparte el link con tus clientes**: `https://tu-proyecto.vercel.app`

---

**Fecha de creación**: 27 de marzo de 2026  
**Última actualización**: 27 de marzo de 2026
