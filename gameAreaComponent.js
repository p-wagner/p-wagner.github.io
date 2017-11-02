function GameArea() {
    this.frameNo = 0;
    this.tiles = [];
    this.selectedTiles = []

    this.handleMouseDown = function (e) {
        var mouse = getMouse(e);
        var xPos = Math.floor(mouse.x / tileSize);
        var yPos = Math.floor(mouse.y / tileSize);
        if (mouse.x <= tileSize * tilesCountWidth && mouse.y <= tileSize * tilesCountHeight) {
            if (xPos < tilesCountWidth && yPos < tilesCountHeight) {
                if (!e.ctrlKey) {
                    this.selectedTiles = [];
                }
                this.selectedTiles.push({ x: xPos, y: yPos });
            } else {
                this.selectedTiles = [];
            }
        }
    }
    canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), true);

    this.start = function () {
        canvas.width = gameWidth;
        canvas.height = gameHeight;
        this.context = canvas.getContext("2d");
        document.body.insertBefore(canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(this.update.bind(this), 20);
    }
    this.loadTiles = function () {
        for (x = 0; x < tilesCountWidth; x += 1) {
            this.tiles[x] = [];
            for (y = 0; y < tilesCountHeight; y += 1) {
                this.tiles[x][y] = new Tile(x * tileSize, y * tileSize, tileSize, tileSize);
                //if (x == y) {
                //    this.tiles[x][y].tower = new GunTower(x * tileSize, y * tileSize, tileSize, tileSize);
                //} else if (x * 2 == y) {
                //    this.tiles[x][y].tower = new BasicTower(x * tileSize, y * tileSize, tileSize, tileSize);
                //}
            }
        }
    }
    this.clear = function () {
        gameArea.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    this.draw = function () {
        this.clear();
        infoArea.draw();

        for (x = 0; x < tilesCountWidth; x += 1) {
            for (y = 0; y < tilesCountHeight; y += 1) {
                this.tiles[x][y].draw();
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
    }

    this.update = function () {
        this.frameNo += 1;

        infoArea.update();

        for (x = 0; x < tilesCountWidth; x += 1) {
            for (y = 0; y < tilesCountHeight; y += 1) {
                this.tiles[x][y].update();
            }
        }

        this.draw();
    }
}