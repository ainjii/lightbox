function generateRandomTimeMS() {
    return Math.random() * 150 + 25;
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

function chideUser() {
    sentientSpeak("Don't make me blush.", function() {
        sentientReset(queryUser);
    });
}
