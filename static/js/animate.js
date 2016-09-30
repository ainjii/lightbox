function flashCursor() {
    setInterval(function() {
        var cursor = document.getElementById('cursor');
        fadeOut(cursor, 700);
    }, 1500);
}

function fadeIn(elem, ms) {
    var deltaPerFrame = 1 / ms;
    elem.style.opacity = 0;

    var interval = setInterval(function() {
        elem.style.opacity = parseFloat(elem.style.opacity) + deltaPerFrame;

        if (elem.style.opacity >= 1) {
            clearInterval(interval);
        }
    }, 15);
}

function fadeOut(elem, ms) {
    var deltaPerFrame = 1 / ms;
    elem.style.opacity = 1;

    var interval = setInterval(function() {
        elem.style.opacity = parseFloat(elem.style.opacity) - deltaPerFrame;

        if (elem.style.opacity <= 0) {
            clearInterval(interval);
        }
    }, 15);
}

flashCursor();
