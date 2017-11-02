
function InfoArea() {
    this.towers = [];

    this.selectedTower;
    this.buildButton;
    this.infoSection;

    this.init = function () {
        var padding = 5;

        var towerSpaceX = towerRegionWidth - (padding);
        var towersPerRow = Math.floor(towerSpaceX / (tileSize + padding));
        var cleanSpacing = towerRegionWidth - (padding) - (tileSize * towersPerRow) - (towersPerRow * padding);
        var currentX = padding;
        var currentY = padding;

        var currentTowersInRow = 0;
        for (i = 0; i < availableTowers.length; i++) {
            if (currentTowersInRow >= towersPerRow) {
                currentTowersInRow = 0;
                currentX = padding;
                currentY += padding + tileSize;
            }

            currentTowersInRow += 1;

            var towerObj = {
                inst: new availableTowers[i](currentX + towerRegionX, currentY + towerRegionY, tileSize, tileSize),
                constructor: availableTowers[i]
            }

            this.towers.push(towerObj);

            currentX += tileSize + padding + cleanSpacing;
        }

        currentY += tileSize + (padding * 4);

        this.infoSection = {
            x: towerRegionX + padding,
            y: currentY,
            width: towerRegionWidth - (padding * 2),
            height: tileSize
        }

        currentY += padding;

        this.buildButton = {
            x: towerRegionX + padding,
            y: currentY,
            width: towerRegionWidth - (padding * 2),
            height: tileSize * 0.7
        };

        //currentY += this.buildButton.height;

    }
    this.init();
    this.draw = function () {
        var padding = 5;

        for (i = 0; i < this.towers.length; i++) {
            this.towers[i].inst.draw();
        }

        if (this.selectedTower != null) {
            ctx = gameArea.context;

            ctx.fillStyle = "#111111";
            ctx.font = "9px Arial";
            ctx.textAlign = "start";
            ctx.fillText("Prize: ", this.infoSection.x, this.infoSection.y);
            ctx.textAlign = "end";
            ctx.fillText(this.selectedTower.inst.prize, this.infoSection.x + this.infoSection.width, this.infoSection.y);

            ctx.fillStyle = "green";
            ctx.fillRect(this.buildButton.x, this.buildButton.y, this.buildButton.width, this.buildButton.height);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Build", this.buildButton.x + this.buildButton.width / 2, this.buildButton.y + this.buildButton.height / 2 + 4);
        }
    }

    this.update = function () {
        //no Tower Update 
    }

    this.handleMouseDown = function (e) {
        var mouse = getMouse(e);

        for (i = 0; i < this.towers.length; i++) {
            if (mouse.x > this.towers[i].inst.x && mouse.x < this.towers[i].inst.x + this.towers[i].inst.width
                && mouse.y > this.towers[i].inst.y && mouse.y < this.towers[i].inst.y + this.towers[i].inst.height) {
                this.selectedTower = this.towers[i];
                return;
            }
        }

        if (mouse.x > this.buildButton.x && mouse.y > this.buildButton.y
            && mouse.x < this.buildButton.x + this.buildButton.width
            && mouse.y < this.buildButton.y + this.buildButton.height) {
            for (i = 0; i < gameArea.selectedTiles.length; i++) {
                for (i = 0; i < gameArea.selectedTiles.length; i++) {
                    currentTile = gameArea.tiles[gameArea.selectedTiles[i].x][gameArea.selectedTiles[i].y];
                    if (currentTile.tower == null) {
                        currentTile.tower = new this.selectedTower.constructor(currentTile.x, currentTile.y, tileSize, tileSize);
                        console.log(currentTile.tower);
                    }
                }
            }
        }
    }


    canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), true);
}