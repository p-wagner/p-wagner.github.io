
function EndTile(x, y, width, height) {
    Tile.call(this, x, y, width, height);
    this.color = "#000000";
    this.coordsX = this.x / game.tileSize;
    this.coordsY = this.y / game.tileSize;
    this.currentHealth = 1000;
    this.maxHealth = this.currentHealth;

    this.isDead = function() {
        return this.currentHealth <= 0;
    }

    this.isWalkable = function() {
        return false;
    }
    
    this.draw = function() {
        Tile.prototype.draw.call(this);
        var ctx = game.gameArea.context;
        ctx.fillStyle = this.color;

        ctx.fillRect(this.x, 
            this.y,
            this.width, 
            this.height);
        
        ctx.fillStyle = "#CCCCCC";    
        for (var cx = this.x; cx < this.x+this.width; cx+= 4) {
            for (var cy = this.y; cy < this.y+this.height; cy+= 4) {
                if ((cx + cy) % 8 == 4) {
                    ctx.fillRect(cx, cy, 4, 4);
                }
            }        
        }
    }

    EndTile.prototype.hit = function(points) {
        this.currentHealth -= points;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
        }
    }
}
inheritPseudoClass(Tile, EndTile);