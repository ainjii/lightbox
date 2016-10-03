var intervalLength = 10;

function hide(elem) {
    elem.style.opacity = 0;
}

function show(elem) {
    elem.style.opacity = 1;
}

function flashCursor() {
    var cursor = document.getElementById('cursor');

    return setInterval(function() {

        if (cursor.style.opacity <= 0) {
            fadeIn(cursor, 1000);
        } else {
            fadeOut(cursor, 1000);
        }

    }, 1500);
}

function fadeIn(elem, ms) {
    var deltaPerFrame = intervalLength / ms;
    hide(elem);

    var interval = setInterval(function() {
        elem.style.opacity = parseFloat(elem.style.opacity) + deltaPerFrame;

        if (elem.style.opacity >= 1) {
            clearInterval(interval);
        }
    }, intervalLength);
}

function fadeOut(elem, ms) {
    var deltaPerFrame = intervalLength / ms;
    show(elem);

    var interval = setInterval(function() {
        elem.style.opacity = parseFloat(elem.style.opacity) - deltaPerFrame;

        if (elem.style.opacity <= 0) {
            clearInterval(interval);
        }
    }, intervalLength);
}

var blinkID = flashCursor();
