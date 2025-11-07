document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image');

    images.forEach(image => {
        image.addEventListener('click', function() {
            if (image.classList.contains('expanded')) {
                image.classList.remove('expanded');
            } else {
                images.forEach(item => {
                    item.classList.remove('expanded');
                });
                image.classList.add('expanded');
            }
        });
    });
});