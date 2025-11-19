// Crear contenedor para redes sociales debajo del nav
const redesDesplegable = document.createElement('div');
redesDesplegable.classList.add('redes-desplegable');
redesDesplegable.style.display = 'none';
redesDesplegable.style.position = 'relative';
redesDesplegable.style.zIndex = 999;
redesDesplegable.style.width = '100%';
redesDesplegable.style.background = '#ffffff';
redesDesplegable.style.borderBottom = '1px solid #ddd';
redesDesplegable.style.padding = '10px 0';

if (nav) nav.insertAdjacentElement('afterend', redesDesplegable);

// Buscar link "Redes Sociales"
const redesNavLink = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
    .find(link => link.textContent.trim().toLowerCase().includes('redes'));

if (redesNavLink) {
    redesNavLink.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const visible = redesDesplegable.style.display === 'block';

        if (!visible) {

            redesDesplegable.innerHTML = '';

            if (redesFooter) {
                // ✨ CLON REAL, NO MOVER EL FOOTER
                const redesClon = redesFooter.cloneNode(true);
                const wrapper = document.createElement('div');
                wrapper.classList.add('redes-wrapper');
                wrapper.style.maxWidth = '1200px';
                wrapper.style.margin = 'auto';

                wrapper.appendChild(redesClon);
                redesDesplegable.appendChild(wrapper);
            }

            redesDesplegable.style.display = 'block';

        } else {
            redesDesplegable.innerHTML = '';
            redesDesplegable.style.display = 'none';
        }
    });
}
