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
        fadeOut(sentient, 1);
        sentient.innerHTML = '';
        fadeIn(sentient, 1);
    }, 2000);
};

sentientSpeak("Hello.", sentientReset);
