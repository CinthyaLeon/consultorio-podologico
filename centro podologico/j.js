document.addEventListener('DOMContentLoaded', function() {
    // Carrusel automático
    const carrusel = document.getElementById('carrusel');
    const imagenes = carrusel ? carrusel.getElementsByTagName('img') : []; // Verificar si carrusel existe
    let index = 0;

    function cambiarImagen() {
        if (imagenes.length > 0) {
            for (let i = 0; i < imagenes.length; i++) {
                imagenes[i].style.display = 'none';
            }
            imagenes[index].style.display = 'block';
            index = (index + 1) % imagenes.length;
        }
    }

    if (carrusel) { // Iniciar el carrusel solo si el elemento existe
        setInterval(cambiarImagen, 3000);
        cambiarImagen();
    }
    const header = document.querySelector('header');
    const mainNav = document.querySelector('.main-nav');

    if (header && mainNav) {
        header.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });
    }
});

    // --- Código para la barra de navegación activa al hacer scroll ---
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const headerHeight = header ? header.offsetHeight : 0; // Obtener altura si existe

    function updateHeaderOnScroll() {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        if (header) {
            if (window.scrollY > headerHeight) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    }

    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll();

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

