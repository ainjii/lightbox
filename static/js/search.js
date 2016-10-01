var queryBase = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyB1vzRQkLE3IfC5L7NAHj0PNYDzDt6aKZQ&cx=011012745277674285058:c5dts1gynry&searchType=image&count=20&alt=json&startIndex=';
var startIndex = 1;


// API Request
function handleError(data) {
    console.log(data);
}

function handleQueryResults(data) {
    console.log(data);
    updateStartIndex(data.queries);
    parseThumbnailsAndLinks();
    createImageTiles();
}

function ajax(url, callback, err) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                callback(this.responseText);
            } else {
                err(new Error("Response returned with error code."));
            }
        }
    };

    request.open("GET", url, true);
    request.send();
}


// Interactivity
function submitQuery(query) {
    var url = queryBase + startIndex + '&q=' + query;
    ajax(url, handleQueryResults, handleError);
}

function isAlphaNumeric(key) {
    return /^[a-zA-Z0-9 ]$/.test(key);
}

function registerKey(evt) {
    var key = evt.key;
    var input = document.getElementById('search-input');

    if (key == 'Backspace'){
        input.innerHTML = input.innerHTML.slice(0, -1);
    } else if (key == 'Enter'){
        submitQuery(input.innerHTML);
        input.innerHTML = '';
    } else if (isAlphaNumeric(key)) {
        input.innerHTML += key;
    }
}


// Search prompt visibility + responsiveness
function getSearchPrompt() {
    return document.getElementById('search-prompt');
}

function updateSearchPromptWidth() {
    var prompt = getSearchPrompt();

    var newWidth = window.innerWidth *.67;
    prompt.style.width = newWidth + 'px';
    sentient.style.width = newWidth + 'px';
}

function showSearchPrompt() {
    var searchContainer = document.getElementById('search-container');
    var prompt = getSearchPrompt();
    var cursor = document.getElementById('cursor');

    cursor.className += 'search-input';
    searchContainer.insertBefore(cursor, prompt);

    updateSearchPromptWidth();
    fadeIn(prompt, 1000);

    window.addEventListener('keydown', registerKey);
}

window.addEventListener('resize', updateSearchPromptWidth);
