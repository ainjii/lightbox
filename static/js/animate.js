function clear(elem) {
    elem.innerHTML = '';
}

function addToPageFlow(elem, display) {
    var newDisplay = display || 'initial';
    set(elem, 'display', newDisplay);
}

function removeFromPageFlow(elem) {
    set(elem, 'display', 'none');
}

function hide(elem) {
    set(elem, 'opacity', 0);
}

function set(elem, style, value) {
    elem.style[style] = value;
}

function show(elem) {
    set(elem, 'opacity', 1);
}

function fadeIn(elem) {
    var deltaPerFrame = intervalLength / standardFadeLength;
    hide(elem);

    var interval = setInterval(function() {
        var newOpacity = parseFloat(elem.style.opacity) + deltaPerFrame;
        set(elem, 'opacity', newOpacity);

        if (newOpacity >= 1) {
            clearInterval(interval);
        }
    }, intervalLength);
}

function fadeOut(elem) {
    var deltaPerFrame = intervalLength / standardFadeLength;
    show(elem);

    var interval = setInterval(function() {
        var newOpacity = parseFloat(elem.style.opacity) - deltaPerFrame;
        set(elem, 'opacity', newOpacity);

        if (newOpacity <= 0) {
            clearInterval(interval);
        }
    }, intervalLength);
}

function updateSizes() {
    var width = 'width';
    var windowWidth = window.innerWidth;
    var newWidth = parseInt(windowWidth *.67) + 'px';

    set(input, 'max-width', newWidth);
    set(input, width, newWidth);
    set(sentient, width, newWidth);
    set(grid, width, newWidth);
}
