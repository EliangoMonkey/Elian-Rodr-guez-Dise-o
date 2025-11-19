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

                // Espera a que se expanda y luego hace scroll
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

document.addEventListener("DOMContentLoaded", function () {

    // ===============================================
    //  MENÚ DESPLEGABLE + REDES
    // ===============================================

    const nav = document.querySelector('.navbar');
    const navbarNav = document.querySelector('.navbar-nav');
    const toggleBtn = document.querySelector('.menu-toggle');
    const redesFooter = document.querySelector('.footer-custom .list-inline');

    // Crear contenedor para redes sociales
    const redesDesplegable = document.createElement('div');
    redesDesplegable.classList.add('redes-desplegable');
    redesDesplegable.style.display = 'none';

    // Ubicar redes debajo del nav SIEMPRE
    function ubicarRedesContainer() {
        nav.insertAdjacentElement('afterend', redesDesplegable);
    }

    ubicarRedesContainer();
    window.addEventListener('resize', ubicarRedesContainer);

    // Buscar enlace de "Redes Sociales"
    const redesNavLink = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
        .find(link => link.textContent.trim().toLowerCase().includes('redes'));

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

    // Ajustar posición del botón según el tamaño
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

    ajustarPosicionMenu();
    window.addEventListener('resize', ajustarPosicionMenu);


    // ===============================================
    //  EFECTO FADE-IN
    // ===============================================

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


    // ===============================================
    //  OCULTAR SECCIONES EXTRA AL INICIO
    // ===============================================

    const extraInfos = document.getElementsByClassName('extra-info');
    for (let i = 0; i < extraInfos.length; i++) {
        extraInfos[i].style.display = "none";
    }

    // Hacer accesible la función globalmente
    window.toggleExtraInfo = toggleExtraInfo;
});

