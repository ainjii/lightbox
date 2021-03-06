function navigateLightbox(evt) {
    var code = evt.keyCode;

    if (code == 37) {  // left arrow
        if (currentImageIndex > 0) {
            highlightImage(currentImageIndex - 1);
        }
    } else if (code == 39) {  // right arrow
        if (currentImageIndex < thumbnails.length - 1) {
            highlightImage(currentImageIndex + 1);
        }
    } else if (code == 27) {  // escape
        deactivateLightbox(evt);
    }
}

function nextImage(direction) {
    if (direction == 'left') {
        var code = 37;
    } else if (direction == 'right') {
        var code = 39;
    }

    var evt = {'keyCode': code,
               'target': null};

    navigateLightbox(evt);
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

    loading.innerHTML = '';
    highlight.appendChild(image);
}

function updateVisibleNavArrows() {
    if (currentImageIndex <= 0) {
        removeFromPageFlow(left);
    } else {
        addToPageFlow(left);
    }

    if (currentImageIndex >= thumbnails.length - 1) {
        removeFromPageFlow(right);
    } else {
        addToPageFlow(right);
    }

}

function highlightImage(index) {
    clear(highlight);
    loading.innerHTML = 'Loading ...';
    currentImageIndex = index;

    updateVisibleNavArrows();

    var link = thumbnails[index]['link'];
    var highlightImg = createImage(link);

    highlightImg.className += 'absolute-center highlight-image';
    highlightImg.addEventListener('load', shrinkAndAddImage);
}

function activateLightbox(index) {
    highlightImage(index);

    set(lightbox, 'opacity', 0.8);
    addToPageFlow(highlight);
    addToPageFlow(lightbox);
}

function deactivateLightbox(evt) {
    hide(lightbox);
    removeFromPageFlow(lightbox);
    removeFromPageFlow(highlight);
}

function addThumbnailListeners(thumbnail) {
    var noHover = 0.5;
    var index = thumbnails.length;

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

function imgError(image) {
    image.onerror = '';
    image.src = '/static/image/no_image_available.png';
}

function createImage(link) {
    var newImg = new Image();
    newImg.onerror = function() {
        imgError(newImg);
    };
    newImg.src = link;

    return newImg;
}

function thumbify(thumb, link) {
    hide(thumb);
    thumb.className += 'thumbnail shadow';

    thumb.addEventListener('load', function() {
        addThumbnailListeners(thumb);
        grid.appendChild(thumb);
        fadeIn(thumb);

        thumbnails.push({'thumbnail': thumb,
                         'link': link});
    });

    return thumb;
}

function createThumbnails(imageData) {
    if (imageData) {
        for (var i = 0; i < imageData.length; i++) {
            var image = imageData[i];
            var newTile = createImage(image.image.thumbnailLink);
            newTile = thumbify(newTile, image.link);
        }
    }
}

function displayResults(response) {
    var imageData = response.items;
    reminder.innerHTML = 'You searched for <br><b>' + currentQuery + '</b>';

    createThumbnails(imageData);

    if (startIndex > numResults) {
        hide(moreResults);
    } else {
        show(moreResults);
    }

    if (results.style.opacity <= 0.1) {
        addToPageFlow(results);
        addToPageFlow(closeResults);
        setTimeout(function() {
            fadeIn(results);
        }, 1500);
    }
}

function newQuery() {
    fadeOut(results);

    setTimeout(function() {
        removeFromPageFlow(results);
        removeFromPageFlow(closeResults);
    }, standardFadeLength);

    clear(grid);
    hide(moreResults);

    currentQuery = '';
    thumbnails = [];
    startIndex = 1;
    numResults = null;

    updateSizes();

    addToPageFlow(promptBlock, 'block');
    fadeIn(sentient);

    queryUser();
}
