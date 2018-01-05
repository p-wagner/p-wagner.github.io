function GameArea() {
    this.gameState = "RUNNING";
    this.frameNo = 0;
    this.intervalMillis = 10;
    this.tiles = [];
    this.selectedTiles = []
    this.pathFinder = new PathFinder();
    this.path = [];
    this.openList = [];
    this.closedList = [];

    this.startX = 0;
    this.startY = 0;
    this.endTile = new EndTile((game.tilesCountWidth - 1) * game.tileSize, (game.tilesCountHeight - 1) * game.tileSize, game.tileSize, game.tileSize);

    this.waveGenerator = new EnemyWaveGenerator();
    this.enemies = [];

    this.handleMouseDown = function (e) {
        if (game.gameArea.gameState == "GAMEOVER") {
            return;
        }
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
        this.interval = setInterval(this.update.bind(this), this.intervalMillis);
    }
    this.loadTiles = function () {
        for (x = 0; x < game.tilesCountWidth; x += 1) {
            this.tiles[x] = [];
            for (y = 0; y < game.tilesCountHeight; y += 1) {
                if (x == this.endTile.coordsX && y == this.endTile.coordsY) {
                    this.tiles[x][y] = this.endTile;
                    continue;
                }

                this.tiles[x][y] = new Tile(x * game.tileSize, y * game.tileSize, game.tileSize, game.tileSize);
                if ((debugPathFinding || fillWithRandomTowers) && Math.random(1) > 0.5) {
                    if (x == this.startX && y == this.startY) {
                        continue;
                    }
                    if (x == this.endTile.coordsX && y == this.endTile.coordsY) {
                        continue;   
                    }
                    if (Math.random(1) > 0.5) {
                        this.tiles[x][y].tower = new BasicTower(x * game.tileSize, y * game.tileSize, game.tileSize, game.tileSize);
                    } else {
                        this.tiles[x][y].tower = new GunTower(x * game.tileSize, y * game.tileSize, game.tileSize, game.tileSize);
                    }
                }
                // else if (x * 2 == y) {
                //    this.tiles[x][y].tower = new GunTower(x * tileSize, y * tileSize, tileSize, tileSize);
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
        this.endTile.draw();

        this.pathFinder.draw();


        // draw Path
        ctx.fillStyle = "#C9C9C9";
        var margin = game.tileSize / 4;
        for (var i = 0; i < this.path.length; i++) {
            currentTile = game.gameArea.tiles[this.path[i].x][this.path[i].y];
            ctx.fillRect(currentTile.x + margin, currentTile.y + margin, currentTile.width - margin * 2, currentTile.height - margin * 2);
        }

        this.enemies.forEach(function(element) {
            element.draw();
        }, this);

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

        if (this.gameState == "GAMEOVER") {
            ctx.fillStyle = "#111111";
            ctx.font = "bold 60px Arial ";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", game.gameWidth / 2, game.gameHeight / 2);
        }
    }

    this.update = function () {
        if (this.endTile.isDead()) {
            this.gameState = "GAMEOVER";
        }

        if (this.gameState == "RUNNING") {
            this.frameNo += 1;

            for (var i = 0; i < this.enemies.length; i++) {
                var element = this.enemies[i];
                element.update();
                if (element.isDead()) {
                    this.enemies.splice(i, 1);
                    console.log("Enemy is Dead. Removed from List. New Count: " + this.enemies.length);
                }
                if (element.reachedGoal) {
                    this.enemies.splice(i, 1);
                    console.log("Enemy reached Goal. Removed from List. New Count: " + this.enemies.length);
                }
            }

            for (var x = 0; x < game.tilesCountWidth; x += 1) {
                for (var y = 0; y < game.tilesCountHeight; y += 1) {
                    this.tiles[x][y].update();
                }
            }
            this.endTile.draw();
            this.waveGenerator.update();
        }
        for (var i = 0; i < game.infoAreaComponents.length; i++) {
            var infoAreaComponent = game.infoAreaComponents[i];
            if (infoAreaComponent.isActive()) {
                infoAreaComponent.update();
                break;
            }
        }

        this.draw();
    }

    this.gameAreaChanged = function () {
        var startTime = performance.now();
        this.pathFinder.findPathAsync(this.startX, this.startY, this.endTile.coordsX, this.endTile.coordsY,
            this.tiles,
            game.tilesCountWidth,
            game.tilesCountHeight).then(path => {
                var endTime = performance.now();
                if (path == null) {
                    console.log("Found NO Path in " + (endTime - startTime));
                } else {
                    console.log("Found Path in " + (endTime - startTime));

                    game.gameArea.path = path;
                }

                for (var i = 0; i < this.enemies.length; i++) {
                    var element = this.enemies[i];
                    element.customPath = null;
                }
            });
    }
}