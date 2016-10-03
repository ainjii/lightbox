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
            set(image, 'height', maxHeight + 'px');
            set(image, 'width', 'auto');
        } else {
            set(image, 'height', 'auto');
            set(image, 'width', maxWidth + 'px');
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

    set(lightbox, 'opacity', 0.8);
    addToPageFlow(highlight);
    addToPageFlow(lightbox);
}

function deactivateLightbox() {
    hide(lightbox);
    removeFromPageFlow(lightbox);
    removeFromPageFlow(highlight);
}

function addThumbnailListeners(index, thumbnail) {
    var noHover = 0.5;
    set(thumbnail, 'opacity', noHover);

    thumbnail.addEventListener('click', function(evt) {
        activateLightbox(index);
    });

    thumbnail.addEventListener('mouseover', function(evt) {
        set(this, 'opacity', 1);
    });

    thumbnail.addEventListener('mouseleave', function(evt) {
        set(this, 'opacity', noHover);
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
