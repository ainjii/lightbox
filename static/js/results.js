var grid = document.getElementById('grid');
var lightbox = document.getElementById('lightbox');
var highlight = document.getElementById('highlight');
var thumbnails = [];
highlight.addEventListener('click', deactivateLightbox);
window.addEventListener('keydown', navigateLightbox);
document.getElementById('close-highlight').addEventListener('keypress', deactivateLightbox);
var currentImageIndex = 0;

function navigateLightbox(evt) {
    var key = evt.key.toLowerCase();
    console.log(key);

    if (key == 'arrowleft') {
        if (currentImageIndex > 0) {
            currentImageIndex ++;
            highlightImage(currentImageIndex);
        }
    } else if (key == 'arrowright') {

    } else if (key == 'escape') {
        deactivateLightbox();
    }
}

function highlightImage(index) {
    highlight.innerHTML = '';
    console.log(index);
}

function activateLightbox(index) {
    highlightImage(index);

    show(lightbox);
    highlight.style.display = 'initial';
}

function deactivateLightbox() {
    hide(lightbox);
    highlight.style.display = 'none';
}

function createImage(index, thumbnailLink) {
    var newImg = new Image();
    var noHover = 0.5;

    newImg.style.opacity = noHover;
    newImg.src = thumbnailLink;

    newImg.addEventListener('click', function(evt) {
        activateLightbox(index);
    });

    newImg.addEventListener('mouseover', function(evt) {
        this.style.opacity = 1;
    });

    newImg.addEventListener('mouseleave', function(evt) {
        this.style.opacity = noHover;
    });

    return newImg;
}

function createThumbnails(imageData) {
    for (var i = 0; i < imageData.length; i++) {
        var image = imageData[i];
        var newTile = createImage(thumbnails.length, image.image.thumbnailLink);

        thumbnails.push(newTile);
        grid.appendChild(newTile);
    }
}

function displayResults(response) {
    var imageData = response.items;

    createThumbnails(imageData);
    setTimeout(function() {
        fadeIn(grid, 1000);
    }, 1500);
}
