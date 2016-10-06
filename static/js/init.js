var promptBlock = document.getElementById('prompt-container');
var sentient = document.getElementById('sentient');
var input = document.getElementById('search-input');
var results = document.getElementById('results');
var grid = document.getElementById('grid');
var closeResults = document.getElementById('close-results');
var reminder = document.getElementById('query-reminder');
var moreResults = document.getElementById('more-results');
var lightbox = document.getElementById('lightbox');
var left = document.getElementById('left');
var loading = document.getElementById('loading');
var right = document.getElementById('right');
var highlight = document.getElementById('highlight');
var closeHighlight = document.getElementById('close-highlight');

moreResults.addEventListener('click', fetchImages);
closeResults.addEventListener('click', newQuery);
left.addEventListener('click', function() {
    nextImage('left');
});
lightbox.addEventListener('click', deactivateLightbox);
right.addEventListener('click', function() {
    nextImage('right');
});
closeHighlight.addEventListener('click', deactivateLightbox);
window.addEventListener('resize', updateSizes);
window.addEventListener('keydown', registerKey);
window.addEventListener('keydown', navigateLightbox);

var intervalLength = 10;
var standardFadeLength = 1000;
var currentQuery = '';
var thumbnails = [];
var currentImageIndex = 0;
var startIndex = 1;
var numResults = null;

updateSizes();
greetUser();
