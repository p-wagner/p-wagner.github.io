function InfoAreaTowerMenuComponent() {

    this.isActive = function() {
        for (var i = 0; i < game.gameArea.selectedTiles.length; i++) {
            currentTile = game.gameArea.tiles[game.gameArea.selectedTiles[i].x][game.gameArea.selectedTiles[i].y];
            if (currentTile.tower != null) {
                return true;
            }
            if (currentTile instanceof EndTile) {
                return true;
            }
        }
        return false;
    }
    this.init = function () {
        var padding = 5;

        var currentX = padding;
        var currentY = game.gameInfo.heigth + padding;

        this.infoSection = {
            x: game.infoRegionX + padding,
            y: currentY,
            width: game.infoRegionWidth - (padding * 2),
            height: game.tileSize
        }

        currentY += padding;

        this.sellButton = {
            x: game.infoRegionX + padding,
            y: currentY,
            width: game.infoRegionWidth - (padding * 2),
            height: game.tileSize * 0.7
        };

        //currentY += this.sellButton.height;

    }
    this.draw = function () {
        var padding = 5;
        ctx.font = "9px Arial";
        ctx.fillStyle = "red";
        ctx.fillRect(this.sellButton.x, this.sellButton.y, this.sellButton.width, this.sellButton.height);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Sell", this.sellButton.x + this.sellButton.width / 2, this.sellButton.y + this.sellButton.height / 2 + 4);
    }

    this.update = function () {
      
    }

    this.handleMouseDown = function (e) {
        if (game.gameArea.gameState == "GAMEOVER") {
            return;
        }
        if (!this.isActive()) {
            return;
        }
        var mouse = getMouse(e);

        if (mouse.x > this.sellButton.x && mouse.y > this.sellButton.y
            && mouse.x < this.sellButton.x + this.sellButton.width
            && mouse.y < this.sellButton.y + this.sellButton.height) {
            for (i = 0; i < game.gameArea.selectedTiles.length; i++) {
                for (i = 0; i < game.gameArea.selectedTiles.length; i++) {
                    currentTile = game.gameArea.tiles[game.gameArea.selectedTiles[i].x][game.gameArea.selectedTiles[i].y];
                    if (currentTile.tower != null) {
                        game.money += currentTile.tower.prize;
                        currentTile.tower = null;
                    }
                }
            }
            game.gameArea.gameAreaChanged();
        }
    }


    game.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), true);

}
inheritPseudoClass(InfoAreaComponent, InfoAreaTowerMenuComponent);