document.addEventListener("DOMContentLoaded", function () {
    console.log('[init] DOMContentLoaded');

    // --- Menú desplegable y animaciones de contenido ---
    const nav = document.querySelector('.navbar');
    const navbarNav = document.querySelector('.navbar-nav');
    const toggleBtn = document.querySelector('.menu-toggle');
    const redesFooter = document.querySelector('.footer-custom .list-inline');

    if (!nav) console.warn('[init] .navbar no encontrado');
    if (!navbarNav) console.warn('[init] .navbar-nav no encontrado');
    if (!toggleBtn) console.warn('[init] .menu-toggle no encontrado');

    // Crear contenedor para redes sociales debajo del nav
    const redesDesplegable = document.createElement('div');
    redesDesplegable.classList.add('redes-desplegable');
    redesDesplegable.style.display = 'none';
    if (nav) nav.insertAdjacentElement('afterend', redesDesplegable);

    // Buscar el enlace de "Redes Sociales"
    const redesNavLink = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
        .find(link => link.textContent.trim().toLowerCase().includes('redes') || (link.href && link.getAttribute('href').toLowerCase().includes('redes')));
    console.log('[init] redesNavLink ->', !!redesNavLink);

    // Al hacer clic en "Redes Sociales"
    if (redesNavLink) {
        redesNavLink.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const visible = redesDesplegable.style.display === 'block';
            redesDesplegable.innerHTML = visible ? '' : (redesFooter ? redesFooter.outerHTML : '');
            redesDesplegable.style.display = visible ? 'none' : 'block';
            console.log('[redes] toggle ->', !visible);
        });
    }

    // --- NUEVO: Desplegar imágenes en la sección "Nosotros" (robusto y visible) ---
    // Buscamos posible enlace/menu que lleve a "Nosotros" — por texto o por href
    const nosotrosNavLink = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
        .find(link => {
            const text = (link.textContent || '').trim().toLowerCase();
            const href = (link.getAttribute('href') || '').toLowerCase();
            return text.includes('nosotros') || href.includes('nosotros');
        });

    // Creamos un contenedor desplegable para nosotros (si no existe ya)
    const nosotrosDesplegable = document.createElement('div');
    nosotrosDesplegable.classList.add('nosotros-desplegable');
    // estilos inline mínimos para hacerlo visible por defecto (puedes moverlos a CSS)
    nosotrosDesplegable.style.display = 'none';
    nosotrosDesplegable.style.position = 'relative';
    nosotrosDesplegable.style.background = 'rgba(255,255,255,0.98)';
    nosotrosDesplegable.style.padding = '12px';
    nosotrosDesplegable.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
    nosotrosDesplegable.style.borderRadius = '8px';
    nosotrosDesplegable.style.zIndex = 9999;
    nosotrosDesplegable.style.maxHeight = '50vh';
    nosotrosDesplegable.style.overflow = 'auto';
    nosotrosDesplegable.style.margin = '12px auto';
    nosotrosDesplegable.style.width = 'calc(100% - 32px)'; // dejar margen a los lados
    if (nav) nav.insertAdjacentElement('afterend', nosotrosDesplegable);

    console.log('[init] nosotrosNavLink ->', !!nosotrosNavLink);

    if (nosotrosNavLink) {
        nosotrosNavLink.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            // Intentamos encontrar la sección "Nosotros" de varias formas
            let nosotrosSection = document.querySelector('#nosotros') ||
                                  document.querySelector('.section-nosotros') ||
                                  Array.from(document.querySelectorAll('section,div'))
                                       .find(el => {
                                           const heading = el.querySelector('h1, h2, h3, .section-title');
                                           return heading && heading.textContent && heading.textContent.trim().toLowerCase().includes('nosotros');
                                       });

            if (!nosotrosSection) {
                console.warn('[nosotros] sección "Nosotros" no encontrada. Asegúrate que exista #nosotros, .section-nosotros o un heading con texto "Nosotros".');
                const visibleEmpty = nosotrosDesplegable.style.display === 'block';
                nosotrosDesplegable.innerHTML = visibleEmpty ? '' : '<p style="margin:0.5rem 0;">No se encontraron imágenes de "Nosotros".</p>';
                nosotrosDesplegable.style.display = visibleEmpty ? 'none' : 'block';
                return;
            }

            // Buscamos imágenes dentro de la sección (tu HTML usa .galeria-instagram > .img-full > img)
            const imgs = Array.from(nosotrosSection.querySelectorAll('img'));
            console.log('[nosotros] imágenes encontradas ->', imgs.length);

            const visible = nosotrosDesplegable.style.display === 'block';
            if (visible) {
                nosotrosDesplegable.innerHTML = '';
                nosotrosDesplegable.style.display = 'none';
                console.log('[nosotros] ocultado');
            } else {
                if (imgs.length === 0) {
                    nosotrosDesplegable.innerHTML = '<p style="margin:0.5rem 0;">No hay imágenes en la sección "Nosotros".</p>';
                } else {
                    // crear un contenedor tipo grid
                    const grid = document.createElement('div');
                    grid.classList.add('nosotros-grid');
                    grid.style.display = 'grid';
                    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
                    grid.style.gap = '10px';

                    imgs.forEach((img, idx) => {
                        const wrapper = document.createElement('div');
                        wrapper.classList.add('nosotros-thumb');
                        wrapper.style.cursor = 'pointer';
                        wrapper.style.overflow = 'hidden';
                        wrapper.style.display = 'flex';
                        wrapper.style.alignItems = 'center';
                        wrapper.style.justifyContent = 'center';
                        wrapper.style.height = '120px';
                        wrapper.style.borderRadius = '6px';
                        wrapper.style.background = '#fafafa';

                        const imgClone = img.cloneNode(true);
                        imgClone.style.maxWidth = '100%';
                        imgClone.style.maxHeight = '100%';
                        imgClone.alt = img.alt || `Imagen Nosotros ${idx+1}`;

                        // abrir imagen en nueva pestaña al click (útil para verificar rutas)
                        wrapper.addEventListener('click', () => {
                            if (imgClone.src) window.open(imgClone.src, '_blank');
                        });

                        wrapper.appendChild(imgClone);
                        grid.appendChild(wrapper);
                    });

                    nosotrosDesplegable.innerHTML = '';
                    nosotrosDesplegable.appendChild(grid);
                }

                nosotrosDesplegable.style.display = 'block';
                // centrar en pantalla (si quieres que aparezca en top, cambia options)
                setTimeout(() => {
                    nosotrosDesplegable.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                console.log('[nosotros] mostrado');
            }
        });
    } else {
        console.log('[nosotros] ningún enlace de "Nosotros" encontrado en .navbar-nav');
    }

    // Mostrar / ocultar menú hamburguesa
    if (toggleBtn && navbarNav) {
        toggleBtn.addEventListener('click', function () {
            toggleBtn.classList.toggle('active');
            navbarNav.classList.toggle('menu-visible');
            console.log('[menu] toggle ->', navbarNav.classList.contains('menu-visible'));
        });
    }

    // Ajuste de posición del botón
    function ajustarPosicionMenu() {
        if (!nav || !toggleBtn) return;
        if (window.innerWidth <= 768) {
            nav.style.display = 'flex';
            nav.style.justifyContent = 'space-between';
            toggleBtn.style.order = '2';
            toggleBtn.style.marginLeft = 'auto';
        } else {
            toggleBtn.style.order = '';
            toggleBtn.style.marginLeft = '';
            if (navbarNav) {
                navbarNav.style.display = '';
                navbarNav.classList.remove('menu-visible');
            }
        }
    }

    // --- Efecto fade-in SECUENCIAL (como en sección Nosotros) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    console.log('[fade] elementos encontrados ->', fadeElements.length);

    if (fadeElements.length > 0) fadeElements[0].classList.add('visible');

    const appearOnScroll = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);

                    const next = entry.target.nextElementSibling;
                    if (next && next.classList && next.classList.contains('fade-in')) {
                        setTimeout(() => {
                            console.log('[fade] observando siguiente elemento');
                            observer.observe(next);
                        }, 150);
                    }
                }
            });
        },
        { threshold: 0.3 }
    );

    if (fadeElements.length > 0) appearOnScroll.observe(fadeElements[0]);

    // --- Secciones desplegables ("Leer más") ---
    function toggleExtraInfo(infoId) {
        const info = document.getElementById(infoId);
        const extraInfos = document.getElementsByClassName('extra-info');

        for (let i = 0; i < extraInfos.length; i++) {
            const current = extraInfos[i];
            if (current.id === infoId) {
                const isHidden = current.style.display === "none" || current.style.display === "";

                if (isHidden) {
                    // Oculta los demás
                    for (let j = 0; j < extraInfos.length; j++) {
                        extraInfos[j].style.display = "none";
                        extraInfos[j].style.height = 0;
                    }

                    // Muestra este
                    current.style.display = "block";
                    current.style.height = current.scrollHeight + "px";

                    // Hace scroll suave hacia el contenido
                    setTimeout(() => {
                        current.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 250);
                } else {
                    current.style.display = "none";
                    current.style.height = 0;
                }
            } else {
                current.style.display = "none";
                current.style.height = 0;
            }
        }
    }

    // Inicializar ocultando todas las secciones extra
    const extraInfos = document.getElementsByClassName('extra-info');
    for (let i = 0; i < extraInfos.length; i++) {
        extraInfos[i].style.display = "none";
    }

    // Ejecutar ajustes iniciales y en resize
    ajustarPosicionMenu();
    window.addEventListener('resize', ajustarPosicionMenu);

    // Hacer la función accesible globalmente
    window.toggleExtraInfo = toggleExtraInfo;

    // --- Aviso de cookies (siempre visible) ---
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) cookieBanner.style.display = 'block';

    const acceptBtn = document.getElementById('accept-cookies');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
            cookieBanner.style.display = 'none';
        });
    }

    console.log('[init] script cargado completo');
});
