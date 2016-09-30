var input = document.getElementById('search-input');

function getSearchPrompt() {
    return document.getElementById('search-prompt');
}

function updateSearchPromptWidth() {
    var prompt = getSearchPrompt();

    var newWidth = window.innerWidth *.67;
    prompt.style.width = newWidth + 'px';
}

function submitQuery(query) {
    console.log(query);
}

function registerKey(evt) {
    if (evt.key == 'Backspace'){
        input.innerHTML = input.innerHTML.slice(0, -1);
    } else if (evt.key == 'Enter'){
        submitQuery(input.innerHTML);
        input.innerHTML = '';
    } else {
        input.innerHTML += evt.key;
    }
}

function showSearchPrompt() {
    var prompt = getSearchPrompt();
    var cursor = document.getElementById('cursor');

    updateSearchPromptWidth();
    fadeIn(prompt, 100);

    window.addEventListener('keydown', registerKey);
}

window.addEventListener('resize', updateSearchPromptWidth);
