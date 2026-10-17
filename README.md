# Portafolio profesional

Sitio estático de una sola página para presentar el perfil profesional de Jaime Fabian Cortes Vega.

## Uso local

No requiere instalación ni dependencias. Abre `index.html` directamente en un navegador o inicia un servidor local desde esta carpeta:

```bash
python3 -m http.server 8000
```

Después visita <http://localhost:8000>.

## Estructura

- `index.html`: contenido semántico, navegación y secciones del portafolio.
- `styles.css`: identidad visual pixel art, layout responsive y estados accesibles.
- `script.js`: menú móvil e indicador de sección activa.
- `script.js`: menú móvil, indicador de sección activa y sonido opcional de selección.
- `assets/`: reservado para la foto de perfil y futuros recursos.

## Contenido pendiente

Los proyectos y certificaciones siguen siendo placeholders deliberados. La foto de perfil se carga desde `img/Perfil.jpeg` y la sección de contacto ya contiene el correo y perfiles sociales proporcionados.

## Interacciones

La página incluye un fondo pixelado animado, efectos de hover/focus en el perfil y títulos, y un control `Sonido` en el pie. El sonido aparece activado por defecto y se reproduce en las interacciones después de que el navegador permita audio tras la primera interacción del visitante; puede silenciarse desde el mismo control. Las animaciones se reducen automáticamente cuando el sistema usa `prefers-reduced-motion`.
