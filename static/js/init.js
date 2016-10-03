var sentient = document.getElementById('sentient');
var cursor = document.getElementById('cursor');
var searchContainer = document.getElementById('search-container');
var input = document.getElementById('search-input');
var results = document.getElementById('results');
var grid = document.getElementById('grid');
var closeResults = document.getElementById('close-results');
var lightbox = document.getElementById('lightbox');
var highlight = document.getElementById('highlight');
var closeHighlight = document.getElementById('close-highlight');

closeResults.addEventListener('click', newQuery);
lightbox.addEventListener('click', deactivateLightbox);
closeHighlight.addEventListener('click', deactivateLightbox);
window.addEventListener('resize', updateSizes);
window.addEventListener('keydown', registerKey);
window.addEventListener('keydown', navigateLightbox);

var intervalLength = 10;
var blinkID = flashCursor();
var thumbnails = [];
var currentImageIndex = 0;
var startIndex = 1;
var numResults = null;

updateSizes();
//greetUser();
queryUser();
