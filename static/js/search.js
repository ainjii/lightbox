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
function checkProfanity(data) {
    var profaneWords = JSON.parse(data);

    if (profaneWords.indexOf(currentQuery) >= 0) {
         chideUser();
     } else {
        fadeOut(sentient);
        fadeOut(input);
        fadeOut(prompt);

        setTimeout(function() {
            removeFromPageFlow(promptBlock);
        }, standardFadeLength);

        fetchImages();
     }
}

function submitQuery() {
    var url = 'https://gist.githubusercontent.com/ainjii/de6c9a0f6529080216e01a6e62226a8a/raw/3a790a6f16ea08677d33c5de04fb22a69b1050f8/profane.json';

    ajax(url, function(data) {
        checkProfanity(data);
    }, displayError);
}

function fetchImages() {
    if (!numResults || startIndex <= numResults) {
        var queryBase = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCR05hGw42gSK8dOzF3HPgM6GamHUG6zDk&cx=011012745277674285058:c5dts1gynry&searchType=image&num=10&alt=json&start=';
        var url = queryBase + startIndex + '&q=' + currentQuery;
        ajax(url, processQueryResults, displayError);
    }
}

function registerKey(evt) {
    var key = evt.key;
    currentQuery = input.innerHTML;

    if (key == 'Enter') {
        evt.preventDefault();

        clear(input);
        submitQuery();
    }
}

function showSearchContainer() {
    updateSizes();

    fadeIn(searchContainer);
    fadeIn(input);
    fadeIn(prompt);

    input.focus();
}
