var intervalLength = 10;
var cursor = document.getElementById('cursor');

function flashCursor() {
    setInterval(function() {

        if (cursor.style.opacity <= 0) {
            fadeIn(cursor, 1000);
        } else {
            fadeOut(cursor, 1000);
        }

    }, 1500);
}

function fadeIn(elem, ms) {
    var deltaPerFrame = intervalLength / ms;
    elem.style.opacity = 0;

    var interval = setInterval(function() {
        elem.style.opacity = parseFloat(elem.style.opacity) + deltaPerFrame;

        if (elem.style.opacity >= 1) {
            clearInterval(interval);
        }
    }, intervalLength);
}

function fadeOut(elem, ms) {
    var deltaPerFrame = intervalLength / ms;
    elem.style.opacity = 1;

    var interval = setInterval(function() {
        elem.style.opacity = parseFloat(elem.style.opacity) - deltaPerFrame;

        if (elem.style.opacity <= 0) {
            clearInterval(interval);
        }
    }, intervalLength);
}

flashCursor();
