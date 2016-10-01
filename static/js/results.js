function updateStartIndex(queries) {
    var nextPage = queries.nextPage;

    if (nextPage) {
        startIndex = nextPage.startIndex;
    }

}

function parseThumbnailsAndLinks() {

}

function createImageTiles(images) {
    for (var i = 0; i < images.length; i++) {
        var newTile = createTile(images[i]);
    }
}
