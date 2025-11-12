document.addEventListener("DOMContentLoaded", function () {
    // --- Menú desplegable y animaciones de contenido ---
    const nav = document.querySelector('.navbar');
    const navbarNav = document.querySelector('.navbar-nav');
    const toggleBtn = document.querySelector('.menu-toggle');
    const redesFooter = document.querySelector('.footer-custom .list-inline');

    // Crear contenedor para redes sociales dentro del menú
    const redesDesplegable = document.createElement('div');
    redesDesplegable.classList.add('redes-desplegable');
    redesDesplegable.style.display = 'none';
    navbarNav.insertAdjacentElement('beforeend', redesDesplegable);

    // Buscar el enlace de "Redes Sociales"
    const redesNavLink = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
        .find(link => link.textContent.trim().toLowerCase().includes('redes'));

    // Al hacer clic en "Redes Sociales"
    if (redesNavLink) {
        redesNavLink.addEventListener('click', function (event) {
            event.preventDefault();
            const visible = redesDesplegable.style.display === 'block';
            redesDesplegable.innerHTML = visible ? '' : redesFooter.outerHTML;
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
            redesDesplegable.style.display = 'none';
        }
    }

    // --- Efecto fade-in con scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) fadeElements[0].classList.add('visible');

    const appearOnScroll = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                    const next = entry.target.nextElementSibling;
                    if (next && next.classList.contains('fade-in')) {
                        setTimeout(() => observer.observe(next), 150);
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
                    for (let j = 0; j < extraInfos.length; j++) {
                        extraInfos[j].style.display = "none";
                        extraInfos[j].style.height = 0;
                    }
                    current.style.display = "block";
                    current.style.height = current.scrollHeight + "px";
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

    ajustarPosicionMenu();
    window.addEventListener('resize', ajustarPosicionMenu);
    window.toggleExtraInfo = toggleExtraInfo;

    // --- Aviso de cookies (siempre visible en cada visita) ---
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) cookieBanner.style.display = 'block';

    const acceptBtn = document.getElementById('accept-cookies');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
            // Animación suave antes de ocultar
            cookieBanner.classList.add('oculto');
            setTimeout(() => cookieBanner.style.display = 'none', 400);
        });
    }
});
