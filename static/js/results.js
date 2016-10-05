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
        newImg.className += 'thumbnail shadow';
    }

    return newImg;
}

function createThumbnails(imageData) {
    if (imageData) {
        var newImageBlock = document.createElement('div');
        hide(newImageBlock);

        for (var i = 0; i < imageData.length; i++) {
            var image = imageData[i];
            var newTile = createImage(thumbnails.length, image.image.thumbnailLink, true);

            thumbnails.push({'thumbnail': newTile,
                             'link': image.link});
            newImageBlock.appendChild(newTile);
        }

        grid.appendChild(newImageBlock);
        fadeIn(newImageBlock);
    }
}

function displayResults(response) {
    var imageData = response.items;
    reminder.innerHTML = 'You searched for <b>' + currentQuery + '</b>.';

    createThumbnails(imageData);

    if (startIndex > numResults) {
        hide(moreResults);
    } else {
        show(moreResults);
    }

    if (results.style.opacity <= 0) {
        setTimeout(function() {
            fadeIn(results);
        }, 1500);
    }
}

function newQuery() {
    fadeOut(results);
    clear(grid);
    hide(moreResults);

    currentQuery = '';
    thumbnails = [];
    startIndex = 1;
    numResults = null;

    updateSizes();

    addToPageFlow(promptBlock, 'block');

    fadeIn(sentient);

    input.blur();
    queryUser();
}
