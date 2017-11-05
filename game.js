game = new Game();

function Game() {

    this.canvas = document.createElement("canvas");;
    this.gameWidth = 480;
    this.gameHeight = 260;
    
    this.tilesCountWidth = 20;
    this.tilesCountHeight = 13;
    this.tileSize = 20;
    
    this.availableTowers = [];

    this.infoRegionX = this.tilesCountWidth * this.tileSize;
    this.infoRegionY = 0;
    this.infoRegionWidth = this.gameWidth - this.infoRegionX;
    
    this.towerMenu = [];
    this.gameArea;
    this.infoAreaComponents = []; 
    this.gameInfo;

    this.money = 10000;
    

    this.start = function() {
        this.gameArea = new GameArea();
        this.gameArea.loadTiles();
        this.gameInfo = new GameInfoComponent();
        this.infoAreaComponents.push(new InfoAreaTowerMenuComponent());
        this.infoAreaComponents.push(new InfoAreaBuildComponent());
    

        game.infoAreaComponents.forEach(function(element) {
            element.init();
        }, this);

        this.gameInfo.init();

        game.gameArea.start();
    }
}

function startGame() {
    mouseCaptureSetup();

    game.start();
}

function mouseCaptureSetup() {
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(game.canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(game.canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(game.canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(game.canvas, null)['borderTopWidth'], 10) || 0;
    }
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    game.canvas.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    }, false);
}
