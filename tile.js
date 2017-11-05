
function Tile(x, y, width, height) {
    this.margin = 0.2;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.selected = false;
    this.tower = null;

    this.isWalkable = function() {
        return this.tower == null;
    }

    this.draw = function() {
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

    this.update = function () {
       
        if (this.tower != null) {
            this.tower.update();
        }
    }
}