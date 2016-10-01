var sentient = document.getElementById('sentient');

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

    for (var i = 0; i < message.length; i++) {
        timeToNext += generateRandomTimeMS();

        updateSentient(message[i], timeToNext);
    }

    if (callback) {
        setTimeout(callback, timeToNext);
    }
}

function sentientReset() {
    setTimeout(function() {
        sentient.innerHTML = '';
        queryUser();
    }, 2000);
};

function greetUser() {
    sentientSpeak("Hello.", sentientReset);
}

function queryUser() {
    sentientSpeak("What images are you looking for today?", showSearchPrompt);
}

greetUser();
