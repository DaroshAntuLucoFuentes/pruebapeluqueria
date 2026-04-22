# 🔄 Guía: Integración de HTML Estático a Next.js

Esta guía explica cómo integrar un diseño HTML estático (con Tailwind CSS desde CDN) a una aplicación Next.js existente.

---

## 🚨 Problema Principal: Tailwind CSS desde CDN vs Local

### ¿Qué causaba que no se importaran los diseños?

El problema principal era que el `index.html` original usaba **Tailwind CSS desde CDN**:

```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: { ... }
      }
    }
  }
</script>
```

**Esto NO funciona en Next.js** porque:
1. Next.js renderiza en el servidor (SSR)
2. Los scripts del CDN solo funcionan en el navegador
3. La configuración inline de Tailwind no es reconocida por Next.js
4. Los estilos no se aplican durante el renderizado del servidor

---

## ✅ Solución: Instalar Tailwind CSS Localmente

### Paso 1: Instalar Dependencias Correctas

**IMPORTANTE**: Debes instalar **Tailwind v3**, NO v4 (que es incompatible con Next.js 14):

```bash
npm install -D tailwindcss@^3.4.1 postcss@^8.4.35 autoprefixer@^10.4.17
```

Si necesitas plugins:
```bash
npm install -D @tailwindcss/forms@^0.5.7
```

### Paso 2: Crear Archivos de Configuración

#### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Copia TODOS los colores personalizados del HTML original
        "primary": "#181919",
        "secondary": "#775a19",
        // ... etc
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      },
      // Otras personalizaciones...
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

#### `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Paso 3: Actualizar `globals.css`

Agrega las directivas de Tailwind al inicio del archivo:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Tus estilos personalizados aquí */
```

### Paso 4: Agregar Fuentes en `layout.tsx`

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=Manrope:wght@300;400;500;600;800&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background text-on-background">
        {children}
      </body>
    </html>
  )
}
```

---

## 🔧 Conversión de HTML a JSX

### Cambios Necesarios:

1. **Atributos HTML → JSX**:
   - `class` → `className`
   - `data-alt` → `alt`
   - Eliminar atributos `data-*` innecesarios

2. **Componentes de Cliente**:
   - Si usas hooks (`useState`, `useEffect`), agrega `'use client'` al inicio del archivo
   - Si es solo presentacional, déjalo como Server Component

3. **Links Internos**:
   - `<a href="/ruta">` → `<Link href="/ruta">`
   - Importa: `import Link from 'next/link'`

4. **Estilos Inline**:
   - NO uses `<style jsx>` en Server Components
   - Usa `className` con Tailwind o mueve estilos a `globals.css`

---

## ⚠️ Errores Comunes y Soluciones

### Error 1: "client-only cannot be imported from Server Component"

**Causa**: Usaste `<style jsx>` o hooks en un Server Component

**Solución**: Agrega `'use client'` al inicio del archivo:
```tsx
'use client'

import Link from 'next/link'

export default function Home() {
  // ...
}
```

### Error 2: "tailwindcss directly as PostCSS plugin"

**Causa**: Instalaste Tailwind v4 en lugar de v3

**Solución**: 
```bash
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.1
```

### Error 3: Los estilos no se aplican

**Causas posibles**:
1. No agregaste `@tailwind` directives en `globals.css`
2. No creaste `tailwind.config.js`
3. No reiniciaste el servidor después de instalar Tailwind
4. No recargaste el navegador (Ctrl + Shift + R)

**Solución**: Verifica los 4 puntos anteriores

### Error 4: Colores personalizados no funcionan

**Causa**: No copiaste la configuración de colores del HTML al `tailwind.config.js`

**Solución**: Copia TODO el objeto `theme.extend.colors` del script de configuración del HTML al archivo de configuración de Tailwind

---

## 📋 Checklist de Integración

Usa este checklist para futuras integraciones:

- [ ] Instalar Tailwind v3 + PostCSS + Autoprefixer
- [ ] Crear `tailwind.config.js` con colores y fuentes personalizadas
- [ ] Crear `postcss.config.js`
- [ ] Agregar `@tailwind` directives en `globals.css`
- [ ] Agregar fuentes de Google en `layout.tsx`
- [ ] Convertir HTML a JSX (class → className, etc.)
- [ ] Agregar `'use client'` si usas interactividad
- [ ] Reemplazar `<a>` por `<Link>` para navegación interna
- [ ] Eliminar scripts del CDN de Tailwind
- [ ] Reiniciar servidor de desarrollo
- [ ] Recargar navegador con Ctrl + Shift + R

---

## 🎯 Estructura Recomendada para Landing + App

```
app/
├── page.tsx              # Landing page (página principal)
├── reservar/
│   └── page.tsx          # Sistema de reservas
├── servicios/
│   └── page.tsx          # Página de servicios
├── layout.tsx            # Layout global con fuentes
└── globals.css           # Estilos globales con Tailwind

config/
└── business.json         # Configuración del negocio

tailwind.config.js        # Configuración de Tailwind
postcss.config.js         # Configuración de PostCSS
```

---

## 💡 Consejos Pro

1. **Siempre usa Tailwind v3 con Next.js 14** (v4 es incompatible)
2. **Copia TODA la configuración de colores** del HTML original
3. **No mezcles CDN con instalación local** de Tailwind
4. **Usa `'use client'` solo cuando sea necesario** (hooks, eventos, estado)
5. **Reinicia el servidor** después de cambiar configuraciones
6. **Usa hard refresh** (Ctrl + Shift + R) para ver cambios de estilos

---

## 🔍 Debugging

Si los estilos no se aplican:

1. **Verifica la consola del navegador** (F12)
2. **Revisa la terminal** del servidor de desarrollo
3. **Inspecciona elementos** para ver si las clases de Tailwind se están aplicando
4. **Verifica que `tailwind.config.js` tenga el `content` correcto**
5. **Asegúrate de que `globals.css` tenga las directivas `@tailwind`**

---

## 📚 Recursos Útiles

- [Tailwind CSS con Next.js](https://tailwindcss.com/docs/guides/nextjs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Diferencias entre Server y Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

**Fecha de creación**: 27 de marzo de 2026  
**Última actualización**: 27 de marzo de 2026
