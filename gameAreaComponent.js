function GameArea() {
    this.frameNo = 0;
    this.tiles = [];
    this.selectedTiles = []
    this.pathFinder = new PathFinder();
    this.path = null;

    this.handleMouseDown = function (e) {
        var mouse = getMouse(e);
        var xPos = Math.floor(mouse.x / game.tileSize);
        var yPos = Math.floor(mouse.y / game.tileSize);
        if (mouse.x <= game.tileSize * game.tilesCountWidth && mouse.y <= game.tileSize * game.tilesCountHeight) {
            if (xPos < game.tilesCountWidth && yPos < game.tilesCountHeight) {
                if (!e.ctrlKey) {
                    this.selectedTiles = [];
                }
                var deselected = false;
                for (var i = 0; i < this.selectedTiles.length; i++) {
                    if (this.selectedTiles[i].x == xPos
                        && this.selectedTiles[i].y == yPos) {
                        this.selectedTiles.splice(i, 1);
                        deselected = true;
                    }
                }
                if (!deselected) {
                    this.selectedTiles.push({ x: xPos, y: yPos });
                }
            } else {
                this.selectedTiles = [];
            }
        }
    }
    game.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), true);

    this.start = function () {
        game.canvas.width = game.gameWidth;
        game.canvas.height = game.gameHeight;
        this.context = game.canvas.getContext("2d");
        document.body.insertBefore(game.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(this.update.bind(this), 200);
    }
    this.loadTiles = function () {
        for (x = 0; x < game.tilesCountWidth; x += 1) {
            this.tiles[x] = [];
            for (y = 0; y < game.tilesCountHeight; y += 1) {
                this.tiles[x][y] = new Tile(x * game.tileSize, y * game.tileSize, game.tileSize, game.tileSize);
                //if (x == y) {
                //    this.tiles[x][y].tower = new GunTower(x * tileSize, y * tileSize, tileSize, tileSize);
                //} else if (x * 2 == y) {
                //    this.tiles[x][y].tower = new BasicTower(x * tileSize, y * tileSize, tileSize, tileSize);
                //}
            }
        }
        this.gameAreaChanged();
    }
    this.clear = function () {
        game.gameArea.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    }

    this.draw = function () {
        this.clear();

        for (var i = 0; i < game.infoAreaComponents.length; i++) {
            var infoAreaComponent = game.infoAreaComponents[i];
            var active = infoAreaComponent.isActive();
            if (active) {
                infoAreaComponent.draw();
                break;
            }
        }


        for (x = 0; x < game.tilesCountWidth; x += 1) {
            for (y = 0; y < game.tilesCountHeight; y += 1) {
                this.tiles[x][y].draw();
            }
        }

        ctx.fillStyle = "#C9C9C9";
        if (this.path != null) {
            var margin = game.tileSize / 4;
            for (i = 0; i < this.path.length; i++) {
                currentTile = this.tiles[this.path[i].x][this.path[i].y];
                ctx.fillRect(currentTile.x + margin, currentTile.y + margin, currentTile.width - margin * 2, currentTile.height - margin * 2);
            }
        }

        ctx.fillStyle = "#87CEFA";
        ctx.globalAlpha = 0.6;
        for (i = 0; i < this.selectedTiles.length; i++) {
            for (i = 0; i < this.selectedTiles.length; i++) {
                currentTile = this.tiles[this.selectedTiles[i].x][this.selectedTiles[i].y];
                ctx.fillRect(currentTile.x, currentTile.y, currentTile.width, currentTile.height);
            }
        }
        ctx.globalAlpha = 1;

        game.gameInfo.draw();
    }

    this.update = function () {
        this.frameNo += 1;

        for (i = 0; i < game.infoAreaComponents.length; i++) {
            var infoAreaComponent = game.infoAreaComponents[i];
            if (infoAreaComponent.isActive()) {
                infoAreaComponent.update();
                break;
            }
        }

        for (x = 0; x < game.tilesCountWidth; x += 1) {
            for (y = 0; y < game.tilesCountHeight; y += 1) {
                this.tiles[x][y].update();
            }
        }

        game.gameInfo.update();

        this.draw();
    }

    this.gameAreaChanged = function () {
        var startTime = performance.now();
        var path = this.pathFinder.findPath(0, 0, game.tilesCountWidth - 1, game.tilesCountHeight - 1, this.tiles, game.tilesCountWidth, game.tilesCountHeight);
        var endTime = performance.now();
        if (path == null) {
            console.log("Found NO Path in " + (endTime - startTime));
        } else {
            console.log("Found Path in " + (endTime - startTime));
            this.path = path;
        }
    }
}