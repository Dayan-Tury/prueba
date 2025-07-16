# House of Pizza - Proyecto Web

## Descripción
House of Pizza es un sitio web optimizado para una pizzería ficticia. Este proyecto incluye varias páginas con funcionalidades dinámicas implementadas en JavaScript, diseño responsivo y mejores prácticas de desarrollo web. El objetivo es proporcionar una experiencia interactiva, funcional y accesible para los usuarios.

## Estructura del Proyecto
El proyecto consta de las siguientes páginas:

1. **Página de Inicio (`index.html`)**
   - Contiene cuatro secciones principales:
     - Bienvenida
     - Servicios
     - Noticias (cargadas dinámicamente desde un archivo JSON)
     - Proyectos

2. **Página de Galería (`views/galeria.html`)**
   - Galería dinámica generada con JavaScript ES6+
   - Sistema de lightbox completo con navegación por teclado y ratón
   - Imágenes optimizadas con dimensiones originales especificadas
   - Detección inteligente de página con múltiples métodos de verificación

3. **Página de Presupuesto (`views/presupuesto.html`)**
   - Formulario dividido en dos partes:
     - **Datos de contacto**: Validaciones robustas para nombre, apellidos, teléfono y correo electrónico
     - **Presupuesto**: Opciones dinámicas para calcular el presupuesto final basado en productos, plazo y extras
   - Actualización en tiempo real sin recargar la página
   - Gestión de estados con clases CSS (sin estilos inline)

4. **Página de Contacto (`views/contactos.html`)**
   - Mapa interactivo con OpenStreetMap y Leaflet.js v1.9.4
   - Cálculo de rutas reales por carreteras usando OSRM API
   - Geolocalización del usuario con permisos
   - Información de distancia y tiempo de viaje precisos

5. **Página de Aviso Legal (`views/aviso_legal.html`)**
   - Contiene información legal sobre la empresa

## Optimizaciones y Mejores Prácticas Implementadas

### 🎨 **Separación de Responsabilidades**
- **Eliminación completa de estilos inline**: Todo el styling se maneja via CSS
- **Sistema de clases utilitarias**: `.hidden`, `.visible`, `.error-message`, etc.
- **CSS Grid y Flexbox**: Layout moderno y responsivo

### 🖼️ **Optimización de Imágenes**
- **Dimensiones originales especificadas**: Todas las imágenes incluyen atributos `width` y `height` reales
- **Carga eficiente**: Previene reflows durante la carga de imágenes
- **Alt text descriptivos**: Mejora la accesibilidad

### ⚡ **Rendimiento y Funcionalidad**
- **JavaScript modular**: Código organizado por funcionalidades
- **Event delegation**: Manejo eficiente de eventos dinámicos
- **Error handling**: Gestión robusta de errores y fallbacks
- **CORS optimizado**: Eliminación de APIs problemáticas

### 🔧 **Funcionalidades Avanzadas**
- **Lightbox completo**: Navegación, zoom, contador, caption
- **Detección inteligente de páginas**: Múltiples métodos de verificación
- **Routing real**: Cálculo de rutas por carreteras (no líneas rectas)
- **Responsive design**: Adaptable a todos los dispositivos

## Tecnologías Utilizadas
- **HTML5**: Semántica moderna y accesibilidad
- **CSS3**: Grid, Flexbox, variables CSS, animaciones
- **JavaScript ES6+**: Módulos, async/await, arrow functions
- **Leaflet.js v1.9.4**: Mapas interactivos
- **OSRM API**: Cálculo de rutas reales
- **PowerShell**: Automatización y optimización de assets

## Estructura de Archivos
```
📁 Prueba-html/
├── 📄 index.html
├── 📄 README.txt
├── 📁 views/
│   ├── 📄 galeria.html
│   ├── 📄 presupuesto.html
│   ├── 📄 contactos.html
│   └── 📄 aviso_legal.html
├── 📁 CSS/
│   └── 📄 estilos.css
├── 📁 js/
│   └── 📄 main.js
├── 📁 data/
│   └── 📄 noticias.json
└── 📁 assets/
    ├── 📁 galeria/ (14 imágenes optimizadas)
    └── 📁 redes_sociales/
```

## Cómo Ejecutar el Proyecto
1. Clona este repositorio en tu máquina local
2. Abre el archivo `index.html` en tu navegador web moderno
3. Navega entre las páginas usando el menú de navegación
4. Para el mapa de contactos, permite geolocalización cuando el navegador lo solicite

## Compatibilidad
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Autor
Este proyecto fue desarrollado como parte de un trabajo final de JavaScript Avanzado, implementando las mejores prácticas de desarrollo web moderno.

---
¡Gracias por visitar House of Pizza! 🍕

## Changelog de Optimizaciones

### v2.0 - Optimización Completa (Julio 2025)
- ✅ **Eliminación de estilos inline**: Migración completa a CSS classes
- ✅ **Optimización de imágenes**: Dimensiones originales en todas las imágenes  
- ✅ **Lightbox funcional**: Sistema completo de galería con navegación
- ✅ **Routing mejorado**: Solo OSRM, eliminados errores CORS
- ✅ **Código limpio**: Separación de responsabilidades y mejores prácticas
- ✅ **Responsive design**: Layout adaptativo con CSS Grid/Flexbox