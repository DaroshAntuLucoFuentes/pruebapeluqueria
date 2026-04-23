# Imágenes PeluRock

Coloca aquí las fotos de la peluquería con los siguientes nombres sugeridos:

- `pelurock-hero.jpg` - Imagen principal para el hero (perro principal o logo)
- `pelurock-1.jpg` - Foto de un perro después del servicio
- `pelurock-2.jpg` - Otra foto de transformación
- `pelurock-3.jpg` - Foto del espacio o más perritos
- `logo.png` - Logo de PeluRock si existe

Las imágenes se pueden usar en el código con:
```jsx
<img src="/images/pelurock-hero.jpg" alt="..." />
```

O con Next.js Image:
```jsx
import Image from 'next/image'
<Image src="/images/pelurock-hero.jpg" alt="..." width={800} height={600} />
```
