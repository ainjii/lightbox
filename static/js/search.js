var startIndex = 1;
var numResults = null;
var input = document.getElementById('search-input');
var searchContainer = document.getElementById('search-container');

// API Request
function displayError(data) {
    console.log(data);
}

function processQueryResults(data) {
    var response = JSON.parse(data);

    startIndex += 10;
    numResults = response.searchInformation.totalResults;
    displayResults(response);
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
function checkProfanity(data, query) {
    // console.log(data);

    // if (data == 'true') {
        // chideUser();
    // } else {
        fetchImages(query);
    // }
}

function submitQuery(query) {
    var profanityBase = 'http://www.purgomalum.com/service/xml?text=';
    var url = profanityBase + query;

    // ajax(url, function(data) {
        checkProfanity(null, query);
    // }, displayError);
}

function fetchImages(query) {
    if (!numResults || startIndex <= numResults) {
        var queryBase = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCR05hGw42gSK8dOzF3HPgM6GamHUG6zDk&cx=011012745277674285058:c5dts1gynry&searchType=image&num=10&alt=json&startIndex=';
        var url = queryBase + startIndex + '&q=' + query;
        ajax(url, processQueryResults, displayError);
    }
}

function registerKey(evt) {
    var key = evt.key;
    var currentQuery = input.innerHTML;

    if (key == 'Enter') {
        evt.preventDefault();

        clear(input);
        fadeOut(sentient, 1000);
        fadeOut(searchContainer, 1000);

        submitQuery(currentQuery);
    }
}

function updateSearchContainerWidth() {
    var newWidth = (window.innerWidth *.67) + 'px';
    set(searchContainer, 'width', newWidth);
    set(sentient, 'width', newWidth);
}

function removeSentientCursor() {
    var cursor = document.getElementById('cursor');

    clearInterval(blinkID);
    hide(cursor);
}

function showSearchContainer() {
    removeSentientCursor();
    updateSearchContainerWidth();

    fadeIn(searchContainer, 1000);

    input.focus();

    window.addEventListener('keydown', registerKey);
}

window.addEventListener('resize', updateSearchContainerWidth);
