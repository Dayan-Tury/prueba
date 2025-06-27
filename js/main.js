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

// scripts-presupuesto.js

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('myForm')) {
        console.log('El script para presupuesto.html está funcionando correctamente.');

        const myForm = document.getElementById('myForm');
        if (myForm) {
            myForm.addEventListener('submit', function (event) {
                let isValid = true;

                const nombre = document.getElementById('first-name');
                const errorNombre = document.getElementById('errorNombre');
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,15}$/.test(nombre.value.trim())) {
                    errorNombre.textContent = 'El nombre debe contener solo letras y un máximo de 15 caracteres.';
                    errorNombre.style.display = 'block';
                    isValid = false;
                } else {
                    errorNombre.style.display = 'none';
                }

                const apellido = document.getElementById('surname');
                const errorApellido = document.getElementById('errorApellido');
                if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/.test(apellido.value.trim())) {
                    errorApellido.textContent = 'Los apellidos deben contener solo letras y un máximo de 40 caracteres.';
                    errorApellido.style.display = 'block';
                    isValid = false;
                } else {
                    errorApellido.style.display = 'none';
                }

                const email = document.getElementById('email');
                const errorEmail = document.getElementById('errorEmail');
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) {
                    errorEmail.textContent = 'El correo electrónico no es válido.';
                    errorEmail.style.display = 'block';
                    isValid = false;
                } else {
                    errorEmail.style.display = 'none';
                }

                if (!isValid) {
                    event.preventDefault();
                }
            });
        } else {
            console.warn('El formulario de contacto (#myForm) no existe en el DOM.');
        }
    }

    if (document.getElementById('presupuestoForm')) {
        console.log('El script para calcular el presupuesto está funcionando correctamente.');

        const presupuestoForm = document.getElementById('presupuestoForm');
        const subtotalElement = document.getElementById('subtotal');
        const descuentoInfoElement = document.getElementById('descuentoInfo');
        const presupuestoFinalElement = document.getElementById('presupuestoFinal');

        function calcularPresupuesto() {
            let subtotal = 0;

            // Sumar el valor del producto seleccionado
            const productoSeleccionado = presupuestoForm.querySelector('input[name="producto"]:checked');
            if (productoSeleccionado) {
                subtotal += parseFloat(productoSeleccionado.value);
            }

            // Sumar los valores de los extras seleccionados
            const extrasSeleccionados = presupuestoForm.querySelectorAll('input[name="extra"]:checked');
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
            subtotalElement.style.display = 'block';

            descuentoInfoElement.textContent = `Descuento aplicado: ${(descuento * 100).toFixed(0)}%`;
            descuentoInfoElement.style.display = descuento > 0 ? 'block' : 'none';

            presupuestoFinalElement.textContent = `Total: $${totalConDescuento.toFixed(2)}`;
        }

        // Escuchar cambios en los campos del formulario
        presupuestoForm.addEventListener('input', calcularPresupuesto);

        // Calcular presupuesto inicial
        calcularPresupuesto();
    }
});

// galeria.js

document.addEventListener('DOMContentLoaded', function () {
    if (document.body.id === 'galeria-page') { // Verificar si estamos en galeria.html
        console.log('Página de galería detectada. Iniciando script de galería.');
        setTimeout(() => {
            const galeriaContainer = document.getElementById('galeria-container');

            if (galeriaContainer) {
                console.log('Contenedor #galeria-container encontrado en el DOM.');

                const galeriaConfig = {
                    imagenes: [
                        {
                            src: '../assets/galeria/img1.jpg',
                            alt: 'Pizza Margherita clásica',
                            titulo: 'Pizza Margherita',
                            descripcion: 'Nuestra pizza clásica con tomate, mozzarella y albahaca fresca'
                        },
                        {
                            src: '../assets/galeria/img2.jpg',
                            alt: 'Pizza de Champiñones y cherry',
                            titulo: 'Pizza Champiñones',
                            descripcion: 'Deliciosa pizza con champiñones frescos y tomates cherry'
                        },
                        {
                            src: '../assets/galeria/img3.jpg',
                            alt: 'Pizza Diabola',
                            titulo: 'Pizza Diabola',
                            descripcion: 'Pizza picante con salami y chile para los amantes del sabor fuerte'
                        },
                        {
                            src: '../assets/galeria/img4.jpeg',
                            alt: 'Pizza Napolitana',
                            titulo: 'Pizza Napolitana',
                            descripcion: 'Auténtica pizza napolitana con ingredientes tradicionales'
                        },
                        {
                            src: '../assets/galeria/img5.jpg',
                            alt: 'Pizza Quattro Stagioni',
                            titulo: 'Pizza Quattro Stagioni',
                            descripcion: 'Pizza de cuatro estaciones con variedad de ingredientes'
                        },
                        {
                            src: '../assets/galeria/img6.jpg',
                            alt: 'Pizza Focaccia Blanca',
                            titulo: 'Focaccia Blanca',
                            descripcion: 'Focaccia blanca con aceite de oliva y hierbas aromáticas'
                        },
                        {
                            src: '../assets/galeria/img7.jpg',
                            alt: 'Pizza Prosciutto',
                            titulo: 'Pizza Prosciutto',
                            descripcion: 'Pizza con prosciutto di Parma y rúcula fresca'
                        },
                        {
                            src: '../assets/galeria/img8.jpeg',
                            alt: 'Pizza Marinara',
                            titulo: 'Pizza Marinara',
                            descripcion: 'Sencilla y deliciosa pizza con tomate, ajo y orégano'
                        },
                        {
                            src: '../assets/galeria/img9.jpeg',
                            alt: 'Pizza Capricciosa',
                            titulo: 'Pizza Capricciosa',
                            descripcion: 'Pizza con jamón, champiñones, alcachofas y aceitunas'
                        },
                        {
                            src: '../assets/galeria/img10.jpeg',
                            alt: 'Pan con Porceta',
                            titulo: 'Pan con Porceta',
                            descripcion: 'Delicioso pan artesanal con porceta italiana'
                        },
                        {
                            src: '../assets/galeria/img11.jpg',
                            alt: 'Pan con Porcetta',
                            titulo: 'Pan con Porcetta',
                            descripcion: 'Pan gourmet con porcetta y hierbas mediterráneas'
                        },
                        {
                            src: '../assets/galeria/img12.jpg',
                            alt: 'Porcetta especial',
                            titulo: 'Porcetta Especial',
                            descripcion: 'Nuestra especialidad de porcetta con condimentos secretos'
                        },
                        {
                            src: '../assets/galeria/img13.jpg',
                            alt: 'Pizza Vegetariana',
                            titulo: 'Pizza Vegetariana',
                            descripcion: 'Pizza llena de vegetales frescos y queso mozzarella'
                        },
                        {
                            src: '../assets/galeria/img14.jpg',
                            alt: 'Pizza clásica especial',
                            titulo: 'Pizza Especial de la Casa',
                            descripcion: 'Nuestra pizza especial con ingredientes seleccionados'
                        }
                    ]
                };

                galeriaContainer.innerHTML = '';

                galeriaConfig.imagenes.forEach((imagen, index) => {
                    const galeriaItem = document.createElement('div');
                    galeriaItem.className = 'galeria-item';
                    galeriaItem.innerHTML = `
                        <div class="imagen-container">
                            <img src="${imagen.src}" alt="${imagen.alt}" class="galeria-img" data-index="${index}">
                            <div class="overlay">
                                <h3>${imagen.titulo}</h3>
                                <p>${imagen.descripcion}</p>
                            </div>
                        </div>
                    `;
                    galeriaContainer.appendChild(galeriaItem);
                });

                console.log(`Galería creada con ${galeriaConfig.imagenes.length} imágenes.`);
            } else {
                console.warn('El contenedor #galeria-container no fue encontrado en el DOM.');
            }
        }, 0);
    } else {
        console.log('El script de la galería no se ejecuta en esta página.');
    }
});

// contacto.js

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('map')) {
        if (!window.map) { // Verificar si el mapa ya está inicializado
            window.map = L.map('map').setView([28.0500, -16.7167], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(window.map);

            var marker = L.marker([28.0500, -16.7167]).addTo(window.map);
            marker.bindPopup("House of Pizza: C. Josefina Reveron, 38632 Guaza, Santa Cruz de Tenerife").openPopup();

            function calculateRoute() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var userLat = position.coords.latitude;
                        var userLng = position.coords.longitude;

                        var userMarker = L.marker([userLat, userLng]).addTo(window.map);
                        userMarker.bindPopup("Tu ubicación").openPopup();

                        var route = L.polyline([
                            [userLat, userLng],
                            [28.0500, -16.7167]
                        ], { color: 'blue' }).addTo(window.map);

                        window.map.fitBounds(route.getBounds());
                    });
                } else {
                    alert("La geolocalización no está soportada por tu navegador.");
                }
            }

            calculateRoute();
        }
    }
});
