'use strict';

function displayError(data) {
    console.log(data);
}

function ajax(url, callback, err) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                callback(this.responseText);
            } else {
                err(new Error('Response returned with error code.'));
            }
        }
    };

    request.open('GET', url, true);
    request.send();
}

function processQueryResults(data) {
    var response = JSON.parse(data);

    startIndex += 10;
    numResults = response.searchInformation.totalResults;
    displayResults(response);
}

function fetchImages() {
    if (!numResults || startIndex <= numResults) {
        var queryBase = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyB1vzRQkLE3IfC5L7NAHj0PNYDzDt6aKZQ&cx=011012745277674285058:c5dts1gynry&searchType=image&safe=medium&num=10&alt=json&start=';
        var url = queryBase + startIndex + '&q=' + currentQuery;
        ajax(url, processQueryResults, displayError);
    }
}

function checkProfanity(data) {
    var profaneWords = JSON.parse(data);

    if (profaneWords.indexOf(currentQuery) >= 0) {
         chideUser();
    } else {
        complimentUser();
     }
}

function submitQuery() {
    var url = 'https://gist.githubusercontent.com/ainjii/de6c9a0f6529080216e01a6e62226a8a/raw/3a790a6f16ea08677d33c5de04fb22a69b1050f8/profane.json';

    fadeOut(input);

    ajax(url, function(data) {
        checkProfanity(data);
    }, displayError);
}

function registerKey(evt) {
    if (evt.keyCode == 13) {  // enter
        evt.preventDefault();
        currentQuery = input.innerHTML;

        clear(input);
        submitQuery();
    }
}

function showSearchContainer() {
    updateSizes();

    fadeIn(input);
    input.focus();
}
