//--TOWERS
function Tower(x, y, width, height) {
    this.prize = 0;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.margin = 3;
    this.color = "red";
}
Tower.prototype.draw = function () {
    ctx = game.gameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + this.margin, 
        this.y + this.margin,
         this.width - this.margin * 2, 
         this.height - this.margin * 2);
}
Tower.prototype.update = function () {
}