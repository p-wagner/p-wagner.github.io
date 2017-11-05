function GameInfoComponent() {
    this.heigth = 70;
    var padding = 5;

    this.init = function() {
        this.moneySection = {
            x: game.infoRegionX + padding,
            y: game.infoRegionY + padding,
            width: game.infoRegionWidth - (padding * 2),
            height: 20
        };
    }

    this.draw = function() {
        ctx.fillStyle = "#111111";
        ctx.font = "9px Arial";
        ctx.textAlign = "start";
        ctx.fillText("Money: ", this.moneySection.x, this.moneySection.y + 9);
        ctx.textAlign = "end";
        ctx.fillText(game.money, this.moneySection.x + this.moneySection.width, this.moneySection.y + 9);
    }
    this.update = function() {

    }
}