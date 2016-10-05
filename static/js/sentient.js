'use strict';

function generateRandomTimeMS() {
    return Math.random() * 125 + 15;
}

function updateSentient(char, timeToWait) {
    setTimeout(function() {
        sentient.innerHTML += char;
    }, timeToWait);
}

function sentientSpeak(message, callback) {
    var timeToNext = 1;

    clear(sentient);

    for (var i = 0; i < message.length; i++) {
        timeToNext += generateRandomTimeMS();

        updateSentient(message[i], timeToNext);
    }

    if (callback) {
        setTimeout(callback, timeToNext);
    }
}

function sentientReset(callback) {
    setTimeout(function() {
        clear(sentient);
        callback();
    }, 2000);
};

function greetUser() {
    sentientSpeak('Hello.', function() {
        sentientReset(queryUser);
    });
}

function queryUser() {
    sentientSpeak('What images should I look for?', showSearchContainer);
}

function chooseRandomResponse(type) {
    if (type == 'chide') {
        var responses = ["I'm sorry. What did you say?",
                         "You don’t really expect me to search for that, do you?",
                         "Help me understand why you thought that was an appropriate thing to say.",
                         "Bite me.",
                         "Gross."];

    } else if (type == 'compliment') {
        var responses = ["An excellent choice.",
                         "Your wish is my command.",
                         "I like your style.",
                         "You have the best ideas.",
                         "Good idea."];
    }

    var index = parseInt(Math.random() * responses.length);
    return responses[index];
}

function chideUser() {
    sentientSpeak(chooseRandomResponse('chide'), function() {
        sentientReset(queryUser);
    });
}

function complimentUser() {
    sentientSpeak(chooseRandomResponse('compliment'), function() {
        fadeOut(sentient);

        setTimeout(function() {
            removeFromPageFlow(promptBlock);
        }, standardFadeLength);

        fetchImages();
    });
}
