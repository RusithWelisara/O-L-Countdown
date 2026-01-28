const targetDate = new Date('2026-02-17T00:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.querySelector('.countdown-container').innerHTML = '<h2>Good Luck!</h2>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateElement('days', days);
    updateElement('hours', hours);
    updateElement('minutes', minutes);
    updateElement('seconds', seconds);
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    const formattedValue = value < 10 ? `0${value}` : value;

    // Only animate if value changed
    if (element.innerText !== formattedValue.toString()) {
        element.innerText = formattedValue;
    }
}

// Quotes System
const quotes = [
    "Success is the sum of small efforts, repeated day in and day out.",
    "The future belongs to those who prepare for it today.",
    "Don't watch the clock; do what it does. Keep going.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger."
];

let currentQuoteIndex = -1;

function setRandomQuote() {
    const quoteElement = document.getElementById('quote-text');
    // Fade out
    quoteElement.style.opacity = 0;

    setTimeout(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === currentQuoteIndex);

        currentQuoteIndex = randomIndex;
        quoteElement.innerText = quotes[randomIndex];
        // Fade in
        quoteElement.style.opacity = 1;
    }, 300);
}

// Study Mode
const studyBtn = document.getElementById('study-mode-btn');
const exitStudyBtn = document.getElementById('exit-study-btn');
const studyOverlay = document.getElementById('study-overlay');
const mainContainer = document.getElementById('main-container');

studyBtn.addEventListener('click', () => {
    studyOverlay.classList.remove('hidden');
    // Request fullscreen for immersion
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    }
});

exitStudyBtn.addEventListener('click', () => {
    studyOverlay.classList.add('hidden');
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.log(err));
    }
});

// Event Listeners
document.getElementById('refresh-quote').addEventListener('click', setRandomQuote);

// Init
setInterval(updateCountdown, 1000);
updateCountdown();
setRandomQuote();
