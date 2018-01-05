
function Tile(x, y, width, height) {
    this.margin = 0.2;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.selected = false;
    this.tower = null;

    Tile.prototype.isWalkable = function() {
        return this.tower == null;
    }

    Tile.prototype.draw = function() {
        var ctx = game.gameArea.context;
        
        ctx.fillStyle = "#bbbbbb";
        ctx.fillRect(this.x + this.margin, this.y + this.margin, this.width - this.margin * 2, this.height - this.margin * 2);

        if (this.tower != null) {
            this.tower.draw();
        }
        if (this.selected) {
            ctx.fillStyle = "#87CEFA";
            ctx.globalAlpha = 0.6;
            ctx.fillRect(this.x + this.margin, this.y + this.margin, this.width - this.margin * 2, this.height - this.margin * 2);
            ctx.globalAlpha = 1;
        }
    }

    Tile.prototype.update = function () {
       
        if (this.tower != null) {
            this.tower.update();
            if (this.tower.currentHealthPoints == 0) {
                this.tower = null;
                game.gameArea.gameAreaChanged();
            }
        }
    }

    Tile.prototype.hit = function(attackPower) {
        var tower = this.tower;
        if (tower == null) {
            console.log("No Tower here " + x + " / " + y);
        } else {
            tower.hit(attackPower);
        }
    }
}