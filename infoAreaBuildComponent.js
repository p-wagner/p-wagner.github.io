function InfoAreaBuildComponent() {
    this.towers = [];

    this.selectedTower;
    this.enougthMoneyToBuildSelection = false;
    this.buildButton;
    this.infoSection;

    this.isActive = function() {
        return true; // allways active, last option in queue
    }

    this.init = function () {
        var padding = 5;

        var towerSpaceX = game.infoRegionWidth - (padding);
        var towersPerRow = Math.floor(towerSpaceX / (game.tileSize + padding));
        var cleanSpacing = game.infoRegionWidth - (padding) - (game.tileSize * towersPerRow) - (towersPerRow * padding);
        var currentX = padding;
        var currentY = game.gameInfo.heigth + padding;

        var currentTowersInRow = 0;
        for (i = 0; i < game.availableTowers.length; i++) {
            if (currentTowersInRow >= towersPerRow) {
                currentTowersInRow = 0;
                currentX = padding;
                currentY += padding + tileSize;
            }

            currentTowersInRow += 1;

            var towerObj = {
                inst: new game.availableTowers[i](currentX + game.infoRegionX, currentY + game.infoRegionY, game.tileSize, game.tileSize),
                constructor: game.availableTowers[i]
            }

            this.towers.push(towerObj);

            currentX += game.tileSize + padding + cleanSpacing;
        }

        currentY += game.tileSize + (padding * 4);

        this.infoSection = {
            x: game.infoRegionX + padding,
            y: currentY,
            width: game.infoRegionWidth - (padding * 2),
            height: game.tileSize
        }

        currentY += padding;

        this.buildButton = {
            x: game.infoRegionX + padding,
            y: currentY,
            width: game.infoRegionWidth - (padding * 2),
            height: game.tileSize * 0.7
        };

        //currentY += this.buildButton.height;

    }
    this.draw = function () {
        var padding = 5;

        for (i = 0; i < this.towers.length; i++) {
            this.towers[i].inst.draw();
        }

        if (this.selectedTower != null) {
            var ctx = game.gameArea.context;

            ctx.fillStyle = "#111111";
            ctx.font = "9px Arial";
            ctx.textAlign = "start";
            ctx.fillText("Prize: ", this.infoSection.x, this.infoSection.y);
            ctx.textAlign = "end";
            ctx.fillText(this.selectedTower.inst.prize, this.infoSection.x + this.infoSection.width, this.infoSection.y);

            if (this.enougthMoneyToBuildSelection) {
                ctx.fillStyle = "green";
            } else {
                ctx.fillStyle = "gray";
            }
            ctx.fillRect(this.buildButton.x, this.buildButton.y, this.buildButton.width, this.buildButton.height);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Build", this.buildButton.x + this.buildButton.width / 2, this.buildButton.y + this.buildButton.height / 2 + 4);
        }
    }

    this.update = function () {
        this.calculacteEnougthMoneyForSelection();
    }

    this.calculacteEnougthMoneyForSelection = function() {
        if (this.selectedTower == null) {
            enougthMoneyToBuildSelection = false;
            return;
        }

        var towerPrize = this.selectedTower.inst.prize;
        var numberOfTowersToBuild = 0;
        for (i = 0; i < game.gameArea.selectedTiles.length; i++) {
            for (i = 0; i < game.gameArea.selectedTiles.length; i++) {
                currentTile = game.gameArea.tiles[game.gameArea.selectedTiles[i].x][game.gameArea.selectedTiles[i].y];
                if (currentTile.tower == null) {
                    numberOfTowersToBuild += 1;
                }
            }
        }

        this.enougthMoneyToBuildSelection = numberOfTowersToBuild * towerPrize <= game.money;
    }

    this.handleMouseDown = function (e) {
        if (!this.isActive()) {
            return;
        }
        var mouse = getMouse(e);

        for (var i = 0; i < this.towers.length; i++) {
            if (mouse.x > this.towers[i].inst.x && mouse.x < this.towers[i].inst.x + this.towers[i].inst.width
                && mouse.y > this.towers[i].inst.y && mouse.y < this.towers[i].inst.y + this.towers[i].inst.height) {
                this.selectedTower = this.towers[i];
                return;
            }
        }
        if (this.enougthMoneyToBuildSelection) {
            
            if (mouse.x > this.buildButton.x && mouse.y > this.buildButton.y
                && mouse.x < this.buildButton.x + this.buildButton.width
                && mouse.y < this.buildButton.y + this.buildButton.height) {

                var towerPrize = this.selectedTower.inst.prize;
                for (var i = 0; i < game.gameArea.selectedTiles.length; i++) {
                    for (i = 0; i < game.gameArea.selectedTiles.length; i++) {
                        currentTile = game.gameArea.tiles[game.gameArea.selectedTiles[i].x][game.gameArea.selectedTiles[i].y];
                        if (currentTile.tower == null) {
                            if (game.money >= towerPrize) {
                                game.money -= towerPrize;
                                currentTile.tower = new this.selectedTower.constructor(currentTile.x, currentTile.y, game.tileSize, game.tileSize);
                            }
                        }
                    }
                }
                game.gameArea.gameAreaChanged();
            }
        }
    }


    game.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), true);
}
inheritPseudoClass(InfoAreaComponent, InfoAreaBuildComponent);