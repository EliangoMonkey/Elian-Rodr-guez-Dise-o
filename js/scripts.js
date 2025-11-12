document.addEventListener("DOMContentLoaded", function () {
    // --- Menú desplegable y animaciones de contenido ---
    const nav = document.querySelector('.navbar');
    const navbarNav = document.querySelector('.navbar-nav');
    const toggleBtn = document.querySelector('.menu-toggle');
    const redesFooter = document.querySelector('.footer-custom .list-inline');

    // Crear contenedor para redes sociales debajo del nav
    const redesDesplegable = document.createElement('div');
    redesDesplegable.classList.add('redes-desplegable');
    redesDesplegable.style.display = 'none';
    nav.insertAdjacentElement('afterend', redesDesplegable);

    // Buscar el enlace de "Redes Sociales"
    const redesNavLink = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
        .find(link => link.textContent.trim().toLowerCase().includes('redes'));

    // Al hacer clic en "Redes Sociales"
    if (redesNavLink) {
        redesNavLink.addEventListener('click', function (event) {
            event.preventDefault();

            const visible = redesDesplegable.style.display === 'block';
            // 🔧 Protección si redesFooter no existe aún
            redesDesplegable.innerHTML = visible ? '' : (redesFooter ? redesFooter.outerHTML : '');
            redesDesplegable.style.display = visible ? 'none' : 'block';
        });
    }

    // Mostrar / ocultar menú hamburguesa
    toggleBtn.addEventListener('click', function () {
        toggleBtn.classList.toggle('active');
        navbarNav.classList.toggle('menu-visible');
    });

    // Ajuste de posición del botón
    function ajustarPosicionMenu() {
        if (window.innerWidth <= 768) {
            nav.style.display = 'flex';
            nav.style.justifyContent = 'space-between';
            toggleBtn.style.order = '2';
            toggleBtn.style.marginLeft = 'auto';
        } else {
            toggleBtn.style.order = '';
            toggleBtn.style.marginLeft = '';
            navbarNav.style.display = '';
            navbarNav.classList.remove('menu-visible');
        }
    }

        // --- Efecto fade-in con scroll (para todos los elementos .fade-in) ---
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const appearOnScroll = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );
        
        // Observar todos los elementos con clase .fade-in
        fadeElements.forEach(el => appearOnScroll.observe(el));

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

    // --- Aviso de cookies (siempre visible en cada visita) ---
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) cookieBanner.style.display = 'block';

    const acceptBtn = document.getElementById('accept-cookies');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
            cookieBanner.style.display = 'none';
        });
    }
});

