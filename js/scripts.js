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

console.log('[init] redesNavLink ->', !!redesNavLink);

if (redesNavLink) {
    redesNavLink.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const visible = redesDesplegable.style.display === 'block';

        if (!visible) {
            if (redesFooter) {
                redesDesplegable.innerHTML = `
                    <div class="redes-wrapper" style="max-width:1200px;margin:auto;">
                        ${redesFooter.outerHTML}
                    </div>
                `;
            }
            redesDesplegable.style.display = 'block';
        } else {
            redesDesplegable.innerHTML = '';
            redesDesplegable.style.display = 'none';
        }

        console.log('[redes] toggle ->', !visible);
    });
}
