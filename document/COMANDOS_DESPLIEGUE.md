# ⚡ Comandos Rápidos de Despliegue

Referencia rápida de comandos para desplegar y mantener tu aplicación en Vercel.

---

## 🚀 Primer Despliegue

### 1. Inicializar Git (si no está inicializado)

```bash
git init
git add .
git commit -m "Primer commit: Sistema de reservas con landing page"
```

### 2. Crear repositorio en GitHub

```bash
# Opción A: Desde la web de GitHub
# 1. Ve a https://github.com/new
# 2. Crea el repositorio
# 3. Copia la URL

# Opción B: Desde CLI (si tienes GitHub CLI instalado)
gh repo create peluqueria-sistema-reservas --public --source=. --remote=origin --push
```

### 3. Subir código a GitHub (si usaste Opción A)

```bash
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git branch -M main
git push -u origin main
```

### 4. Desplegar en Vercel

**Opción A: Desde la Web** (Más fácil)
1. Ve a https://vercel.com
2. Click en "Add New..." → "Project"
3. Selecciona tu repositorio
4. Agrega variables de entorno
5. Click en "Deploy"

**Opción B: Desde CLI**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Desplegar
vercel --prod

# Agregar variables de entorno
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add GOOGLE_REFRESH_TOKEN
```

---

## 🔄 Actualizaciones Posteriores

### Flujo Normal de Actualización

```bash
# 1. Hacer cambios en el código
# 2. Probar localmente
npm run dev

# 3. Verificar que el build funciona
npm run build

# 4. Commit y push
git add .
git commit -m "Descripción de los cambios"
git push origin main

# 5. Vercel despliega automáticamente (espera 2-3 minutos)
```

### Actualización Rápida (un solo comando)

```bash
git add . && git commit -m "Actualización rápida" && git push origin main
```

---

## 🐛 Debugging

### Ver logs en tiempo real

```bash
vercel logs --follow
```

### Ver logs de un deployment específico

```bash
vercel logs [deployment-url]
```

### Ver información del proyecto

```bash
vercel inspect
```

### Listar deployments

```bash
vercel ls
```

---

## 🔐 Variables de Entorno

### Agregar variable

```bash
vercel env add NOMBRE_VARIABLE
# Luego ingresa el valor cuando te lo pida
```

### Listar variables

```bash
vercel env ls
```

### Eliminar variable

```bash
vercel env rm NOMBRE_VARIABLE
```

### Actualizar variable existente

```bash
# 1. Eliminar la antigua
vercel env rm NOMBRE_VARIABLE

# 2. Agregar la nueva
vercel env add NOMBRE_VARIABLE

# 3. Redeploy
vercel --prod
```

---

## 🔙 Rollback (Volver a versión anterior)

### Desde la Web

1. Ve a https://vercel.com/tu-usuario/tu-proyecto
2. Click en "Deployments"
3. Encuentra el deployment que funcionaba
4. Click en "..." → "Promote to Production"

### Desde CLI

```bash
# Listar deployments
vercel ls

# Promover un deployment específico
vercel promote [deployment-url]
```

---

## 🌍 Dominios

### Agregar dominio personalizado

```bash
vercel domains add www.tudominio.com
```

### Listar dominios

```bash
vercel domains ls
```

### Eliminar dominio

```bash
vercel domains rm www.tudominio.com
```

---

## 🧹 Limpieza y Mantenimiento

### Limpiar builds locales

```bash
# Eliminar carpeta .next
rm -rf .next

# Eliminar node_modules (si hay problemas)
rm -rf node_modules
npm install
```

### Limpiar cache de Vercel

```bash
# Desde la web
# Settings → General → Clear Build Cache → Redeploy
```

### Actualizar dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas (cuidado con breaking changes)
npm update

# Actualizar una específica
npm install paquete@latest
```

---

## 📊 Monitoreo

### Ver analytics

```bash
# Desde la web
# https://vercel.com/tu-usuario/tu-proyecto/analytics
```

### Ver uso de recursos

```bash
# Desde la web
# Settings → Usage
```

---

## 🆘 Comandos de Emergencia

### El sitio está caído - Rollback rápido

```bash
# 1. Ver deployments
vercel ls

# 2. Promover el último que funcionaba
vercel promote [url-del-deployment-anterior]
```

### Build está fallando - Probar localmente

```bash
# Limpiar todo
rm -rf .next node_modules

# Reinstalar
npm install

# Probar build
npm run build

# Si funciona, hacer commit y push
git add .
git commit -m "Fix build"
git push origin main
```

### Variables de entorno perdidas

```bash
# Agregar todas de nuevo
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add GOOGLE_REFRESH_TOKEN

# Redeploy
vercel --prod
```

---

## 📱 Testing Post-Despliegue

### Checklist rápido

```bash
# 1. Abrir sitio
open https://tu-proyecto.vercel.app

# 2. Verificar en la consola del navegador (F12):
# - No debe haber errores en rojo
# - Todos los recursos deben cargar (200 OK)

# 3. Probar flujo completo:
# - Landing page carga
# - Click en "Reservar" → va a /reservar
# - Seleccionar servicio y fecha
# - Ver disponibilidad
# - Crear reserva
# - Verificar en Google Calendar
```

---

## 🎯 Workflow Recomendado

### Para cambios pequeños (CSS, texto, etc.)

```bash
git add .
git commit -m "Actualizar estilos del header"
git push origin main
# Esperar 2-3 minutos → Verificar en producción
```

### Para cambios grandes (nuevas features)

```bash
# 1. Crear branch
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "Agregar nueva funcionalidad"

# 3. Push del branch
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request en GitHub
# Vercel creará un preview automáticamente

# 5. Probar el preview
# URL: https://tu-proyecto-git-feature-nueva-funcionalidad-tu-usuario.vercel.app

# 6. Si funciona, hacer merge a main
# Vercel desplegará automáticamente a producción
```

---

## 🔗 Links Útiles

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Google Cloud Console**: https://console.cloud.google.com

---

## 💡 Tips Pro

1. **Usa branches para features grandes** - Vercel crea previews automáticos
2. **Revisa los logs después de cada deploy** - Detecta errores temprano
3. **Configura notificaciones** - Recibe alertas de deployments en Slack/Discord
4. **Usa el preview de Vercel** - Prueba cambios antes de producción
5. **Mantén un changelog** - Documenta cambios importantes

---

**Última actualización**: 27 de marzo de 2026
