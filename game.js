var canvas;
var gameWidth = 480;
var gameHeight = 260;

var availableTowers = [];

var tilesCountWidth = 20;
var tilesCountHeight = 13;
var tileSize = 20;
var towerRegionX = tilesCountWidth * tileSize;
var towerRegionY = 0;
var towerRegionWidth = gameWidth - towerRegionX;

var myObstacles = [];
var myScore;
var towerMenu = [];
var gameArea;
var infoArea;

function startGame() {
    canvas = document.createElement("canvas")
    gameArea = new GameArea()
    gameArea.loadTiles();

    infoArea = new InfoArea();

    mouseCaptureSetup();
    gameArea.start();
}

function mouseCaptureSetup() {
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    canvas.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    }, false);
}
