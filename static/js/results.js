var grid = document.getElementById('grid');
var lightbox = document.getElementById('lightbox');
var highlight = document.getElementById('highlight');
var results = document.getElementById('results');
var thumbnails = [];
lightbox.addEventListener('click', deactivateLightbox);
window.addEventListener('keydown', navigateLightbox);
document.getElementById('close-highlight').addEventListener('click', deactivateLightbox);
var currentImageIndex = 0;
var closeResults = document.getElementById('close-results');
closeResults.addEventListener('click', newQuery);

function navigateLightbox(evt) {
    var key = evt.key.toLowerCase();

    if (key == 'arrowleft') {
        if (currentImageIndex > 0) {
            highlightImage(currentImageIndex - 1);
        }
    } else if (key == 'arrowright') {
        if (currentImageIndex < thumbnails.length - 1) {
            highlightImage(currentImageIndex + 1);
        }
    } else if (key == 'escape') {
        deactivateLightbox();
    }
}

function shrinkAndAddImage(evt) {
    var maxRatio = 0.8;
    var maxWidth = window.innerWidth * maxRatio;
    var maxHeight = window.innerHeight * maxRatio;

    var image = evt.target;
    var widthRatio = image.width / maxWidth;
    var heightRatio = image.height / maxHeight;

    if (widthRatio > 1 || heightRatio > 1) {
        if (widthRatio < heightRatio) {
            image.style.height = maxHeight + 'px';
            image.style.width = 'auto';
        } else {
            image.style.height = 'auto';
            image.style.width = maxWidth + 'px';
        }
    }

    highlight.appendChild(image);
}

function highlightImage(index) {
    clear(highlight);
    currentImageIndex = index;

    var link = thumbnails[index]['link'];
    var highlightImg = createImage(index, link, false);

    highlightImg.className += 'absolute-center highlight-image';
    highlightImg.addEventListener('load', shrinkAndAddImage);
}

function activateLightbox(index) {
    highlightImage(index);

    show(lightbox);
    highlight.style.display = 'initial';
    lightbox.style.display = 'initial';
}

function deactivateLightbox() {
    hide(lightbox);
    lightbox.style.display = 'none';
    highlight.style.display = 'none';
}

function addThumbnailListeners(index, thumbnail) {
    var noHover = 0.5;
    thumbnail.style.opacity = noHover;

    thumbnail.addEventListener('click', function(evt) {
        activateLightbox(index);
    });

    thumbnail.addEventListener('mouseover', function(evt) {
        this.style.opacity = 1;
    });

    thumbnail.addEventListener('mouseleave', function(evt) {
        this.style.opacity = noHover;
    });
}

function createImage(index, link, isThumb) {
    var newImg = new Image();
    newImg.src = link;

    if (isThumb) {
        addThumbnailListeners(index, newImg);
        newImg.className += 'thumbnail';
    }

    return newImg;
}

function createThumbnails(imageData) {
    for (var i = 0; i < imageData.length; i++) {
        var image = imageData[i];
        var newTile = createImage(thumbnails.length, image.image.thumbnailLink, true);

        thumbnails.push({'thumbnail': newTile,
                         'link': image.link});
        grid.appendChild(newTile);
    }
}

function displayResults(response) {
    var imageData = response.items;

    createThumbnails(imageData);
    setTimeout(function() {
        fadeIn(results, 1000);
    }, 1500);
}

function newQuery() {
    fadeOut(results, 1000);
    clear(grid);
    fadeIn(sentient, 1000);
    updateSearchContainerWidth();
    queryUser();
}
