function GameInfoComponent() {
    this.heigth = 70;
    this.padding = 5;

    this.init = function () {
        this.infoSection = {
            x: game.infoRegionX + this.padding,
            y: game.infoRegionY + this.padding,
            width: game.infoRegionWidth - (this.padding * 2),
            height: 10
        };
    }

    this.draw = function () {
        this.drawControls();
        this.drawInfoObject("Money", game.money, 2);
        this.drawInfoObject("Wave", game.gameArea.waveGenerator.currentWave, 3);
        this.drawInfoObject("Health", game.gameArea.endTile.currentHealth + "/" + game.gameArea.endTile.maxHealth, 4);
    }

    this.drawInfoObject = function (name, value, pos) {
        ctx.fillStyle = "#111111";
        ctx.font = "9px Arial";
        ctx.textAlign = "start";
        ctx.fillText(name, this.infoSection.x, (this.infoSection.y + 9) * pos);
        ctx.textAlign = "end";
        ctx.fillText(value, this.infoSection.x + this.infoSection.width, (this.infoSection.y + 9) * pos);
    }

    this.drawControls = function () {
        ctx.fillStyle = "#111111";
        if (game.gameArea.gameState == "RUNNING") {
            ctx.fillRect( this.infoSection.x + this.infoSection.width - this.infoSection.height, 
                this.infoSection.y,
                this.infoSection.height /10*4, 
                this.infoSection.height);

                ctx.fillRect( this.infoSection.x + this.infoSection.width - this.infoSection.height/10*4, 
                    this.infoSection.y,
                    this.infoSection.height/10*4, 
                    this.infoSection.height);

        } else if (game.gameArea.gameState == "PAUSED") {
            ctx.beginPath();
            ctx.moveTo(this.infoSection.x + this.infoSection.width - this.infoSection.height, this.infoSection.y);
            ctx.lineTo(this.infoSection.x + this.infoSection.width, this.infoSection.y + this.infoSection.height / 2);
            ctx.lineTo(this.infoSection.x + this.infoSection.width - this.infoSection.height, this.infoSection.y + this.infoSection.height);
            ctx.closePath();
            ctx.fill();
        }
    }

    this.handleMouseDown = function (e) {
        if (game.gameArea.gameState == "GAMEOVER") {
            return;
        }
        var mouse = getMouse(e);
        var realX = this.infoSection.x + this.infoSection.width - this.infoSection.height
        if (mouse.x > realX
            && mouse.y > this.infoSection.y
            && mouse.x < realX + this.infoSection.width
            && mouse.y < this.infoSection.y + this.infoSection.height) {
            if (game.gameArea.gameState == "PAUSED") {
                game.gameArea.gameState = "RUNNING";
            } else if (game.gameArea.gameState == "RUNNING") {
                game.gameArea.gameState = "PAUSED";
            }
        }
    }


    game.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), true);

    this.update = function () {

    }
}