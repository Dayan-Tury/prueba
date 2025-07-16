// scripts-index.js

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('contenedor-noticias')) {
        console.log('El script para index.html está funcionando correctamente.');

        const noticiasContainer = document.getElementById('contenedor-noticias');
        if (noticiasContainer) {
            console.log('El contenedor #contenedor-noticias fue encontrado.');

            const data = [
                {
                    "titulo": "¡Nueva pizza de temporada!",
                    "fecha": "2025-06-24",
                    "contenido": "Descubre nuestra pizza especial con ingredientes frescos de verano."
                },
                {
                    "titulo": "Promoción: 2x1 los martes",
                    "fecha": "2025-06-20",
                    "contenido": "Solo por tiempo limitado, pide una y te regalamos otra. Solo en local."
                }
            ];

            try {
                console.log('Datos de noticias cargados:', data);

                if (!Array.isArray(data)) {
                    throw new Error('Los datos no contienen un array válido.');
                }

                data.forEach(noticia => {
                    const titulo = noticia.titulo || 'Título no disponible';
                    const fecha = noticia.fecha || 'Fecha no disponible';
                    const contenido = noticia.contenido || 'Contenido no disponible';

                    const noticiaElement = document.createElement('article');
                    noticiaElement.classList.add('noticia');
                    noticiaElement.innerHTML = `
                        <h3>${titulo}</h3>
                        <p><strong>Fecha:</strong> ${fecha}</p>
                        <p>${contenido}</p>
                    `;
                    noticiasContainer.appendChild(noticiaElement);
                });
            } catch (error) {
                console.error('Error al cargar las noticias:', error);
                noticiasContainer.innerHTML = '<p>No se pudieron cargar las noticias. Inténtalo más tarde.</p>';
            }
        } else {
            console.warn('El contenedor #contenedor-noticias no existe en el DOM.');
        }
    }
});

// scripts-presupuesto.js - FORMULARIO UNIFICADO

document.addEventListener('DOMContentLoaded', function () {
    // Verificar si existe el formulario unificado
    if (document.getElementById('formularioCompleto')) {
        console.log('El script para presupuesto.html está funcionando correctamente con formulario unificado.');

        const formularioCompleto = document.getElementById('formularioCompleto');
        const subtotalElement = document.getElementById('subtotal');
        const descuentoInfoElement = document.getElementById('descuentoInfo');
        const presupuestoFinalElement = document.getElementById('presupuestoFinal');

        // FUNCIÓN PARA CALCULAR PRESUPUESTO EN TIEMPO REAL
        function calcularPresupuesto() {
            let subtotal = 0;

            // Sumar el valor del producto seleccionado
            const productoSeleccionado = formularioCompleto.querySelector('input[name="producto"]:checked');
            if (productoSeleccionado) {
                subtotal += parseFloat(productoSeleccionado.value);
            }

            // Sumar los valores de los extras seleccionados
            const extrasSeleccionados = formularioCompleto.querySelectorAll('input[name="extra"]:checked');
            extrasSeleccionados.forEach(extra => {
                subtotal += parseFloat(extra.value);
            });

            // Calcular descuento por plazo
            const plazo = parseInt(document.getElementById('plazo').value) || 0;
            let descuento = 0;
            if (plazo > 1) {
                descuento = (plazo - 1) * 0.05; // 5% por cada mes adicional
                if (descuento > 0.5) descuento = 0.5; // Máximo 50% de descuento
            }

            const totalConDescuento = subtotal * (1 - descuento);

            // Actualizar el DOM con los valores calculados
            subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
            subtotalElement.classList.remove('hidden');
            subtotalElement.classList.add('visible');

            descuentoInfoElement.textContent = `Descuento aplicado: ${(descuento * 100).toFixed(0)}%`;
            descuentoInfoElement.classList.toggle('hidden', descuento === 0);
            descuentoInfoElement.classList.toggle('visible', descuento > 0);

            presupuestoFinalElement.textContent = `Total: $${totalConDescuento.toFixed(2)}`;
        }

        // VALIDACIÓN JAVASCRIPT PURA AL ENVIAR EL FORMULARIO
        formularioCompleto.addEventListener('submit', function (event) {
            let isValid = true;

            // Validar NOMBRE - Solo letras, máx 15 caracteres
            const nombre = document.getElementById('first-name');
            const errorNombre = document.getElementById('errorNombre');
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,15}$/.test(nombre.value.trim())) {
                errorNombre.textContent = 'El nombre debe contener solo letras y un máximo de 15 caracteres.';
                errorNombre.classList.remove('hidden');
                errorNombre.classList.add('visible');
                isValid = false;
            } else {
                errorNombre.classList.remove('visible');
                errorNombre.classList.add('hidden');
            }

            // Validar APELLIDOS - Solo letras, máx 40 caracteres
            const apellido = document.getElementById('surname');
            const errorApellido = document.getElementById('errorApellido');
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/.test(apellido.value.trim())) {
                errorApellido.textContent = 'Los apellidos deben contener solo letras y un máximo de 40 caracteres.';
                errorApellido.classList.remove('hidden');
                errorApellido.classList.add('visible');
                isValid = false;
            } else {
                errorApellido.classList.remove('visible');
                errorApellido.classList.add('hidden');
            }

            // Validar EMAIL - Formato de email válido
            const email = document.getElementById('email');
            const errorEmail = document.getElementById('errorEmail');
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) {
                errorEmail.textContent = 'El correo electrónico no es válido.';
                errorEmail.classList.remove('hidden');
                errorEmail.classList.add('visible');
                isValid = false;
            } else {
                errorEmail.classList.remove('visible');
                errorEmail.classList.add('hidden');
            }

            // Validar TELÉFONO - Solo números, exactamente 9 dígitos
            const telefono = document.getElementById('telephone');
            const errorTelefono = document.getElementById('errorTelefono');
            if (!/^\d{9}$/.test(telefono.value.trim())) {
                errorTelefono.textContent = 'El teléfono debe contener exactamente 9 dígitos.';
                errorTelefono.classList.remove('hidden');
                errorTelefono.classList.add('visible');
                isValid = false;
            } else {
                errorTelefono.classList.remove('visible');
                errorTelefono.classList.add('hidden');
            }

            // Validar que se haya seleccionado un producto
            const productoSeleccionado = formularioCompleto.querySelector('input[name="producto"]:checked');
            if (!productoSeleccionado) {
                alert('Por favor, selecciona un producto.');
                isValid = false;
            }

            // Validar que se haya seleccionado un plazo
            const plazo = document.getElementById('plazo');
            if (!plazo.value || plazo.value < 1 || plazo.value > 12) {
                alert('Por favor, indica un plazo válido entre 1 y 12 meses.');
                isValid = false;
            }

            // Validar que se hayan aceptado las condiciones
            const condiciones = document.getElementById('condiciones');
            if (!condiciones.checked) {
                alert('Debes aceptar las condiciones de privacidad para continuar.');
                isValid = false;
            }

            // Prevenir envío si hay errores
            if (!isValid) {
                event.preventDefault();
            } else {
                alert('¡Formulario enviado correctamente!');
            }
        });

        // Escuchar cambios en los campos del presupuesto para actualización en tiempo real
        formularioCompleto.addEventListener('input', function(event) {
            // Solo calcular si el cambio es en campos del presupuesto
            if (event.target.name === 'producto' || 
                event.target.name === 'extra' || 
                event.target.id === 'plazo') {
                calcularPresupuesto();
            }
        });

        // Calcular presupuesto inicial
        calcularPresupuesto();
    }

    // MANTENER COMPATIBILIDAD CON CÓDIGO ANTERIOR (por si se usa en otras páginas)
    if (document.getElementById('myForm')) {
        console.log('Formulario de contacto independiente detectado.');
        // Código anterior para myForm si se necesita en otras páginas...
    }

    if (document.getElementById('presupuestoForm')) {
        console.log('Formulario de presupuesto independiente detectado.');
        // Código anterior para presupuestoForm si se necesita en otras páginas...
    }
});

// galeria.js

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 DOM cargado, body.id:', `"${document.body.id}"`, 'URL:', window.location.pathname);
    
    // Verificar si estamos en galeria.html por ID o por URL
    const isGaleriaPage = document.body.id === 'galeria-page' || 
                          window.location.pathname.includes('galeria.html') ||
                          document.getElementById('galeria-container');
    
    if (isGaleriaPage) {
        console.log('✅ Página de galería detectada. Iniciando script de galería.');
        
        const galeriaContainer = document.getElementById('galeria-container');
        console.log('🔍 Buscando #galeria-container:', galeriaContainer);

        if (galeriaContainer) {
            console.log('✅ Contenedor #galeria-container encontrado en el DOM.');

            const galeriaConfig = {
                    imagenes: [
                        {
                            src: '../assets/galeria/img1.jpg',
                            alt: 'Pizza Margherita clásica',
                            titulo: 'Pizza Margherita',
                            descripcion: 'Nuestra pizza clásica con tomate, mozzarella y albahaca fresca',
                            width: 612,
                            height: 408
                        },
                        {
                            src: '../assets/galeria/img2.jpg',
                            alt: 'Pizza de Champiñones y cherry',
                            titulo: 'Pizza Champiñones',
                            descripcion: 'Deliciosa pizza con champiñones frescos y tomates cherry',
                            width: 900,
                            height: 500
                        },
                        {
                            src: '../assets/galeria/img3.jpg',
                            alt: 'Pizza Diabola',
                            titulo: 'Pizza Diabola',
                            descripcion: 'Pizza picante con salami y chile para los amantes del sabor fuerte',
                            width: 600,
                            height: 480
                        },
                        {
                            src: '../assets/galeria/img4.jpeg',
                            alt: 'Pizza Napolitana',
                            titulo: 'Pizza Napolitana',
                            descripcion: 'Auténtica pizza napolitana con ingredientes tradicionales',
                            width: 259,
                            height: 194
                        },
                        {
                            src: '../assets/galeria/img5.jpg',
                            alt: 'Pizza Quattro Stagioni',
                            titulo: 'Pizza Quattro Stagioni',
                            descripcion: 'Pizza de cuatro estaciones con variedad de ingredientes',
                            width: 1000,
                            height: 702
                        },
                        {
                            src: '../assets/galeria/img6.jpg',
                            alt: 'Pizza Focaccia Blanca',
                            titulo: 'Focaccia Blanca',
                            descripcion: 'Focaccia blanca con aceite de oliva y hierbas aromáticas',
                            width: 1280,
                            height: 720
                        },
                        {
                            src: '../assets/galeria/img7.jpg',
                            alt: 'Pizza Prosciutto',
                            titulo: 'Pizza Prosciutto',
                            descripcion: 'Pizza con prosciutto di Parma y rúcula fresca',
                            width: 1163,
                            height: 833
                        },
                        {
                            src: '../assets/galeria/img8.jpeg',
                            alt: 'Pizza Marinara',
                            titulo: 'Pizza Marinara',
                            descripcion: 'Sencilla y deliciosa pizza con tomate, ajo y orégano',
                            width: 225,
                            height: 225
                        },
                        {
                            src: '../assets/galeria/img9.jpeg',
                            alt: 'Pizza Capricciosa',
                            titulo: 'Pizza Capricciosa',
                            descripcion: 'Pizza con jamón, champiñones, alcachofas y aceitunas',
                            width: 275,
                            height: 183
                        },
                        {
                            src: '../assets/galeria/img10.jpeg',
                            alt: 'Pan con Porceta',
                            titulo: 'Pan con Porceta',
                            descripcion: 'Delicioso pan artesanal con porceta italiana',
                            width: 294,
                            height: 171
                        },
                        {
                            src: '../assets/galeria/img11.jpg',
                            alt: 'Pan con Porcetta',
                            titulo: 'Pan con Porcetta',
                            descripcion: 'Pan gourmet con porcetta y hierbas mediterráneas',
                            width: 1200,
                            height: 1200
                        },
                        {
                            src: '../assets/galeria/img12.jpg',
                            alt: 'Porcetta especial',
                            titulo: 'Porcetta Especial',
                            descripcion: 'Nuestra especialidad de porcetta con condimentos secretos',
                            width: 1200,
                            height: 1800
                        },
                        {
                            src: '../assets/galeria/img13.jpg',
                            alt: 'Pizza Vegetariana',
                            titulo: 'Pizza Vegetariana',
                            descripcion: 'Pizza llena de vegetales frescos y queso mozzarella',
                            width: 900,
                            height: 559
                        },
                        {
                            src: '../assets/galeria/img14.jpg',
                            alt: 'Pizza clásica especial',
                            titulo: 'Pizza Especial de la Casa',
                            descripcion: 'Nuestra pizza especial con ingredientes seleccionados',
                            width: 1024,
                            height: 600
                        }
                    ]
                };

                galeriaContainer.innerHTML = '';

                galeriaConfig.imagenes.forEach((imagen, index) => {
                    const galeriaItem = document.createElement('div');
                    galeriaItem.className = 'galeria-item';
                    galeriaItem.innerHTML = `
                        <div class="imagen-container">
                            <img src="${imagen.src}" alt="${imagen.alt}" class="galeria-img" data-index="${index}" width="${imagen.width}" height="${imagen.height}">
                            <div class="overlay">
                                <h3>${imagen.titulo}</h3>
                                <p>${imagen.descripcion}</p>
                            </div>
                        </div>
                    `;
                    galeriaContainer.appendChild(galeriaItem);
                });

                console.log(`📸 ${galeriaConfig.imagenes.length} imágenes agregadas al DOM`);

                // INICIALIZAR LIGHTBOX DESPUÉS DE CREAR LAS IMÁGENES con pequeño delay
                setTimeout(() => {
                    initializeLightbox(galeriaConfig.imagenes);
                }, 100);

                console.log(`Galería creada con ${galeriaConfig.imagenes.length} imágenes.`);
            } else {
                console.warn('❌ El contenedor #galeria-container no fue encontrado en el DOM.');
            }
    } else {
        console.log('ℹ️ El script de la galería no se ejecuta en esta página (body.id no es galeria-page).');
    }
});

// FUNCIONALIDAD DEL LIGHTBOX PARA LA GALERÍA
function initializeLightbox(imagenes) {
    console.log('🚀 Inicializando lightbox...');
    
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Verificar que todos los elementos existan
    if (!lightboxModal || !lightboxImage || !lightboxCaption || !lightboxCounter || !lightboxClose || !lightboxPrev || !lightboxNext) {
        console.error('❌ Error: No se encontraron todos los elementos del lightbox');
        return;
    }
    
    console.log('✅ Todos los elementos del lightbox encontrados');
    
    let currentImageIndex = 0;

    // Función para abrir el lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        const imagen = imagenes[index];
        
        lightboxImage.src = imagen.src;
        lightboxImage.alt = imagen.alt;
        lightboxImage.setAttribute('width', imagen.width);
        lightboxImage.setAttribute('height', imagen.height);
        
        lightboxCaption.innerHTML = `
            <h3>${imagen.titulo}</h3>
            <p>${imagen.descripcion}</p>
        `;
        
        lightboxCounter.textContent = `${index + 1} / ${imagenes.length}`;
        
        lightboxModal.style.display = 'flex';
        lightboxModal.classList.add('fade-in');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        console.log(`🖼️ Abriendo imagen ${index + 1}: ${imagen.titulo}`);
    }

    // Función para cerrar el lightbox
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        lightboxModal.classList.remove('fade-in');
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
        console.log('❌ Lightbox cerrado');
    }

    // Función para navegar a la imagen anterior
    function previousImage() {
        currentImageIndex = currentImageIndex === 0 ? imagenes.length - 1 : currentImageIndex - 1;
        openLightbox(currentImageIndex);
    }

    // Función para navegar a la imagen siguiente
    function nextImage() {
        currentImageIndex = currentImageIndex === imagenes.length - 1 ? 0 : currentImageIndex + 1;
        openLightbox(currentImageIndex);
    }

    // EVENT LISTENERS para las imágenes de la galería
    const galeriaImages = document.querySelectorAll('.galeria-img');
    console.log(`🔍 Encontradas ${galeriaImages.length} imágenes para agregar event listeners`);
    
    galeriaImages.forEach((img, index) => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const dataIndex = parseInt(this.getAttribute('data-index'));
            console.log(`🖱️ Click en imagen ${index + 1}, data-index: ${dataIndex}`);
            openLightbox(dataIndex);
        });
        
        // Agregar indicador visual de que es clickeable
        img.style.cursor = 'pointer';
        img.title = 'Haz clic para ver en grande';
    });

    // También agregar event listeners a los contenedores de las imágenes como respaldo
    const galeriaItems = document.querySelectorAll('.galeria-item');
    console.log(`🔍 Encontrados ${galeriaItems.length} contenedores de imagen`);
    
    galeriaItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const img = this.querySelector('.galeria-img');
            if (img) {
                const dataIndex = parseInt(img.getAttribute('data-index'));
                console.log(`🖱️ Click en contenedor ${index + 1}, data-index: ${dataIndex}`);
                openLightbox(dataIndex);
            }
        });
        
        item.style.cursor = 'pointer';
    });

    // EVENT LISTENERS para los controles del lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', previousImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }

    // Cerrar lightbox con clic en el fondo
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    previousImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });

    console.log('🖼️ Lightbox inicializado correctamente');
}

// contacto.js - MAPA CON RUTAS REALES POR CARRETERAS (VERSIÓN MEJORADA)

document.addEventListener('DOMContentLoaded', function () {
    // Solo ejecutar en la página de contactos que tiene el elemento #map
    if (document.getElementById('map')) {
        console.log('🗺️ Inicializando mapa con rutas reales en contactos.html...');
        
        // Evitar crear mapas duplicados
        if (window.contactMap) {
            console.log('⚠️ Mapa ya inicializado, saliendo...');
            return;
        }

        // Inicializar el mapa con las coordenadas EXACTAS de C. Josefina Reverón, Guaza
        // Coordenadas obtenidas de OpenStreetMap: 28.0507789, -16.6780177
        window.contactMap = L.map('map').setView([28.0507789, -16.6780177], 17);

        // Agregar capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(window.contactMap);

        // Coordenadas EXACTAS de C. Josefina Reverón, 38632 Guaza, Tenerife
        const businessCoords = [28.0507789, -16.6780177];
        
        // Agregar marcador para la ubicación del negocio con popup mejorado
        const businessMarker = L.marker(businessCoords).addTo(window.contactMap);
        businessMarker.bindPopup(`
            <div class="popup-container">
                <div class="popup-title">🍕 House of Pizza</div>
                <div class="popup-address">C. Josefina Reverón, 38632 Guaza</div>
                <div class="popup-address">Arona, Santa Cruz de Tenerife</div>
                <hr class="popup-divider">
                <div class="popup-contact">📞 +123 456 789</div>
                <div class="popup-contact">📧 contacto@houseofpizza.com</div>
                <div class="popup-verified">📍 Ubicación verificada ✓</div>
            </div>
        `).openPopup();

        // Variables para almacenar elementos del mapa
        let currentRoute = null;
        let userMarker = null;

        // Función para calcular ruta usando OSRM (alternativa gratuita sin API key)
        function calculateRouteWithOSRM(userLat, userLng) {
            console.log('🛣️ Probando OSRM para ruta real...');
            
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${userLng},${userLat};${businessCoords[1]},${businessCoords[0]}?overview=full&geometries=geojson`;
            
            return fetch(osrmUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`OSRM Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('✅ Ruta OSRM calculada:', data);
                    
                    if (data.routes && data.routes.length > 0) {
                        const route = data.routes[0];
                        const routeCoords = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
                        const distance = (route.distance / 1000).toFixed(2);
                        const duration = Math.round(route.duration / 60);
                        
                        return { routeCoords, distance, duration, success: true };
                    } else {
                        throw new Error('No routes found');
                    }
                });
        }

        // Función para calcular ruta usando OpenRouteService
        function calculateRouteWithORS(userLat, userLng) {
            console.log('🛣️ Probando OpenRouteService...');
            
            const apiKey = '5b3ce3597851110001cf6248a97d86c4c2f448c4ae99d67c8c85cda2';
            const orsUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${userLng},${userLat}&end=${businessCoords[1]},${businessCoords[0]}`;
            
            return fetch(orsUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`ORS Error: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('✅ Ruta ORS calculada:', data);
                    
                    if (data.features && data.features.length > 0) {
                        const feature = data.features[0];
                        const routeCoords = feature.geometry.coordinates.map(coord => [coord[1], coord[0]]);
                        const routeInfo = feature.properties.segments[0];
                        const distance = (routeInfo.distance / 1000).toFixed(2);
                        const duration = Math.round(routeInfo.duration / 60);
                        
                        return { routeCoords, distance, duration, success: true };
                    } else {
                        throw new Error('No features found');
                    }
                });
        }

        // Función principal para calcular la ruta REAL
        function calculateRealRoute() {
            console.log('🧭 Solicitando geolocalización para ruta real...');
            
            if (navigator.geolocation) {
                // Mostrar mensaje de carga
                businessMarker.bindPopup("🍕 House of Pizza - 🔄 Calculando ruta real...").openPopup();
                
                navigator.geolocation.getCurrentPosition(function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;
                    
                    console.log(`📍 Ubicación obtenida: ${userLat}, ${userLng}`);

                    // Remover marcador anterior del usuario si existe
                    if (userMarker) {
                        window.contactMap.removeLayer(userMarker);
                    }

                    // Agregar marcador para la ubicación del cliente
                    userMarker = L.marker([userLat, userLng]).addTo(window.contactMap);
                    userMarker.bindPopup("📍 Tu ubicación").openPopup();

                    // Usar solo OSRM (OpenRouteService tiene problemas de CORS en file://)
                    calculateRouteWithOSRM(userLat, userLng)
                        .then(result => {
                            console.log('🔍 Resultado de OSRM:', result);
                            
                            if (result.success) {
                                console.log('✅ Usando resultado exitoso de OSRM:', result);
                            
                            // Remover ruta anterior si existe
                            if (currentRoute) {
                                window.contactMap.removeLayer(currentRoute);
                            }

                            // Dibujar la ruta REAL por carreteras en el mapa
                            currentRoute = L.polyline(result.routeCoords, {
                                color: '#2563eb',
                                weight: 5,
                                opacity: 0.8
                            }).addTo(window.contactMap);

                            // Actualizar popup del negocio con información de la ruta REAL
                            businessMarker.bindPopup(`
                                <div class="popup-container">
                                    <div class="popup-title">🍕 House of Pizza</div>
                                    <div class="popup-address">C. Josefina Reveron, 38632 Guaza</div>
                                    <hr class="popup-divider">
                                    <div class="popup-route-title">🚗 Ruta por carreteras:</div>
                                    <div class="popup-distance">📏 Distancia: <strong>${result.distance} km</strong></div>
                                    <div class="popup-time">⏱️ Tiempo: <strong>${result.duration} minutos</strong></div>
                                </div>
                            `).openPopup();

                            // Ajustar la vista para mostrar toda la ruta
                            window.contactMap.fitBounds(currentRoute.getBounds(), {padding: [20, 20]});
                            
                            console.log(`🎯 Ruta REAL mostrada: ${result.distance} km, ${result.duration} minutos`);
                        } else {
                            console.warn('⚠️ Todos los servicios de routing fallaron, usando línea recta');
                            
                            // Fallback: dibujar línea recta punteada
                            if (currentRoute) {
                                window.contactMap.removeLayer(currentRoute);
                            }
                            
                            currentRoute = L.polyline([
                                [userLat, userLng],
                                businessCoords
                            ], {
                                color: '#dc2626',
                                weight: 3,
                                opacity: 0.7,
                                dashArray: '10, 10'
                            }).addTo(window.contactMap);

                            // Calcular distancia aproximada en línea recta
                            const distance = window.contactMap.distance([userLat, userLng], businessCoords) / 1000;

                            businessMarker.bindPopup(`
                                <div class="popup-container">
                                    <div class="popup-title" style="color: #dc2626;">🍕 House of Pizza</div>
                                    <div class="popup-address">C. Josefina Reveron, 38632 Guaza</div>
                                    <hr class="popup-divider">
                                    <div style="color: #dc2626; font-weight: bold;">⚠️ Ruta aproximada</div>
                                    <div>📏 Distancia aprox: ${distance.toFixed(2)} km</div>
                                    <div style="color: #6b7280; font-size: 11px;">(No se pudo calcular ruta exacta)</div>
                                </div>
                            `).openPopup();

                            window.contactMap.fitBounds(currentRoute.getBounds(), {padding: [20, 20]});
                        }
                    }).catch(error => {
                        console.error('❌ Error general en cálculo de rutas:', error);
                        
                        // Último fallback
                        businessMarker.bindPopup(`
                            <div style="text-align: center; font-family: Arial, sans-serif;">
                                <strong style="color: #dc2626;">🍕 House of Pizza</strong><br>
                                <small>C. Josefina Reveron, 38632 Guaza</small><br>
                                <hr style="margin: 8px 0;">
                                <strong style="color: #dc2626;">❌ Error al calcular ruta</strong><br>
                                <small>Por favor, intenta de nuevo</small>
                            </div>
                        `).openPopup();
                    });

                }, function(error) {
                    console.error('❌ Error de geolocalización:', error);
                    
                    let errorMessage = 'No se pudo obtener tu ubicación.';
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Acceso a ubicación denegado. Por favor, permite el acceso a la ubicación.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Información de ubicación no disponible.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Tiempo de espera agotado para obtener la ubicación.';
                            break;
                    }
                    
                    alert(errorMessage);
                    businessMarker.bindPopup("🍕 House of Pizza: C. Josefina Reveron, 38632 Guaza, Santa Cruz de Tenerife").openPopup();
                }, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 300000
                });
            } else {
                alert("La geolocalización no está soportada por tu navegador.");
                businessMarker.bindPopup("🍕 House of Pizza: C. Josefina Reveron, 38632 Guaza, Santa Cruz de Tenerife").openPopup();
            }
        }

        // Llamar a la función para calcular la ruta real automáticamente
        calculateRealRoute();
    }
});
