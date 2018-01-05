//--TOWERS
function Tower(x, y, width, height) {
    this.prize = 0;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.margin = 3;
    this.color = "red";
    this.maxHealthPoints = 100;
    this.currentHealthPoints = this.maxHealthPoints;
}
Tower.prototype.draw = function () {
    ctx = game.gameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + this.margin, 
        this.y + this.margin,
         this.width - this.margin * 2, 
         this.height - this.margin * 2);

    if (this.maxHealthPoints > this.currentHealthPoints) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height / 8);
        ctx.fillStyle = "green";
        var healthWidth = this.width / this.maxHealthPoints * this.currentHealthPoints;
        ctx.fillRect(this.x, this.y, healthWidth, this.height / 8);
    }
}

Tower.prototype.hit = function (points) {
    this.currentHealthPoints -= points;
    if (this.currentHealthPoints <= 0) {
        this.currentHealthPoints = 0;
    }
}

Tower.prototype.update = function () {
}