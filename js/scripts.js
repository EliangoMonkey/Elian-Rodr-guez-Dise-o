document.addEventListener("DOMContentLoaded", function () {
    // --- Menú desplegable y animaciones de contenido ---
    const nav = document.querySelector('.navbar');
    const navbarNav = document.querySelector('.navbar-nav');
    const toggleBtn = document.querySelector('.menu-toggle');
    const redesFooter = document.querySelector('.footer-custom .list-inline');

    // Crear contenedor para redes sociales
    const redesDesplegable = document.createElement('div');
    redesDesplegable.classList.add('redes-desplegable');
    redesDesplegable.style.display = 'none';

    // Función para colocar correctamente el contenedor según el tamaño
    function ubicarRedesContainer() {
    // SIEMPRE colocar las redes justo después del NAV
    nav.insertAdjacentElement('afterend', redesDesplegable);
    }


    // Ejecutar ubicación inicial
    ubicarRedesContainer();
    window.addEventListener('resize', ubicarRedesContainer);

    // Buscar el enlace de "Redes Sociales"
    const redesNavLink = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
        .find(link => link.textContent.trim().toLowerCase().includes('redes'));

    // Al hacer clic en "Redes Sociales"
    if (redesNavLink) {
        redesNavLink.addEventListener('click', function (event) {
            event.preventDefault();

            const visible = redesDesplegable.style.display === 'block';

            if (visible) {
                redesDesplegable.innerHTML = '';
                redesDesplegable.style.display = 'none';
            } else {
                const clon = redesFooter.cloneNode(true);
                clon.style.display = 'flex';
                clon.style.flexDirection = 'row';
                clon.style.justifyContent = 'center';
                clon.style.gap = '15px';

                redesDesplegable.innerHTML = '';
                redesDesplegable.appendChild(clon);
                redesDesplegable.style.display = 'block';
            }
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

    // --- "Leer más" ---
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

    // Ocultar extras al inicio
    const extraInfos = document.getElementsByClassName('extra-info');
    for (let i = 0; i < extraInfos.length; i++) {
        extraInfos[i].style.display = "none";
    }

    ajustarPosicionMenu();
    window.addEventListener('resize', ajustarPosicionMenu);

    window.toggleExtraInfo = toggleExtraInfo;
});
