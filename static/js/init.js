var sentient = document.getElementById('sentient');
var searchContainer = document.getElementById('search-container');
var input = document.getElementById('search-input');
var prompt = document.getElementById('search-prompt');
var results = document.getElementById('results');
var grid = document.getElementById('grid');
var closeResults = document.getElementById('close-results');
var moreResults = document.getElementById('more-results');
var lightbox = document.getElementById('lightbox');
var highlight = document.getElementById('highlight');
var closeHighlight = document.getElementById('close-highlight');

moreResults.addEventListener('click', fetchImages);
closeResults.addEventListener('click', newQuery);
lightbox.addEventListener('click', deactivateLightbox);
closeHighlight.addEventListener('click', deactivateLightbox);
window.addEventListener('resize', updateSizes);
window.addEventListener('keydown', registerKey);
window.addEventListener('keydown', navigateLightbox);

var intervalLength = 10;
var currentQuery = '';
var thumbnails = [];
var currentImageIndex = 0;
var startIndex = 1;
var numResults = null;

updateSizes();
//greetUser();
queryUser();
