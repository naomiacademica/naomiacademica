document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    let msnry;

    // Load images from PHP
    fetch('load-images.php')
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                
                const img = document.createElement('img');
                img.src = image.path;
                img.alt = image.name;
                
                item.appendChild(img);
                gallery.appendChild(item);
            });

            // Initialize Masonry after all images are loaded
            imagesLoaded(gallery, () => {
                msnry = new Masonry(gallery, {
                    itemSelector: '.gallery-item',
                    columnWidth: '.gallery-item',
                    percentPosition: true,
                    gutter: 20
                });
                
                // Hide loading screen
                document.querySelector('.loading').classList.add('hidden');
            });
        })
        .catch(error => {
            console.error('Error loading images:', error);
            document.querySelector('.loading').innerHTML = `
                <p>Error loading images. Please try again later.</p>
            `;
        });

    // Reinitialize Masonry on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            msnry.layout();
        }, 250);
    });
});
