function Enemy(x, y, size, life, color, speed = 1) {
    this.life = 100;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.lastAttack = 0;
    this.attackPower = 5;
    this.attacksPerSeconds = 100;

    this.nextWalkPoint = null;
    this.reachedGoal = false;
    this.customPath = null;
}
Enemy.prototype.draw = function () {
    ctx = game.gameArea.context;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
}

Enemy.prototype.calculateWalkPoint = function() {

    var currentPath = game.gameArea.path;
    if (this.customPath != null) {
        currentPath = this.customPath;
    }

    var xPos = Math.floor(this.x / game.tileSize);
    var yPos = Math.floor(this.y / game.tileSize);


    var indexOnPath = null;
    for (var i = 0; i < currentPath.length; i++) {
        var element = currentPath[i];
        if (element.x == xPos && element.y == yPos) {
            indexOnPath = i;
            break;
        }
    }

    if (indexOnPath == 0) {
        if (xPos == game.gameArea.endTile.coordsX && yPos == game.gameArea.endTile.coordsY) {
            this.reachedGoal = true;
            return null;
        } else {
            this.reachedGoal = false;
            return null;
        }
    }

    if (indexOnPath == null && this.customPath == null) {
        this.customPath = game.gameArea.pathFinder.findPath(xPos, yPos, game.gameArea.endTile.coordsX, game.gameArea.endTile.coordsY,
            game.gameArea.tiles,
            game.tilesCountWidth,
            game.tilesCountHeight);

        return this.calculateWalkPoint();
    } else if (indexOnPath == null) {
          // calc new Path..
          return { 
            x: game.gameArea.endTile.x + (game.tileSize/ 2),
            y: game.gameArea.endTile.y + (game.tileSize/ 2)
        }
    }
        
    return { 
        x: currentPath[indexOnPath-1].x * game.tileSize + (game.tileSize/ 2),
        y: currentPath[indexOnPath-1].y * game.tileSize + (game.tileSize/ 2)
    }
}


Enemy.prototype.attack = function() {
    //game.gameArea.invervalMillis
    if (this.lastAttack + this.attacksPerSeconds  > game.gameArea.frameNo) {
        return;
    }
    this.lastAttack = game.gameArea.frameNo;

    var xPos = Math.floor(this.x / game.tileSize);
    var yPos = Math.floor(this.y / game.tileSize);

    var diffX = xPos - game.gameArea.endTile.coordsX;
    var diffY = yPos - game.gameArea.endTile.coordsY;

    if (diffX < diffY) {
        if (diffX <= 0) {
            this.attackAt(xPos + 1, yPos);
        } else {
            this.attackAt(xPos - 1, yPos);
        }
    } else {
        if (diffY <= 0) {
            this.attackAt(xPos, yPos + 1);
        } else {
            this.attackAt(xPos, yPos - 1);
        }
    }
}

Enemy.prototype.attackAt = function(x, y) {
    var tile = game.gameArea.tiles[x][y];
    tile.hit(this.attackPower); 
}
    
Enemy.prototype.update = function () {
    if (this.nextWalkPoint == null) {
        this.nextWalkPoint = this.calculateWalkPoint();
    }
    if (!this.reachedGoal) {     
        if (this.nextWalkPoint == null && !this.reachedGoal){
            var xPos = Math.floor(this.x / game.tileSize);
            var yPos = Math.floor(this.y / game.tileSize);

            var tx = xPos * game.tileSize + game.tileSize / 2 - this.x;
            var ty = yPos * game.tileSize + game.tileSize / 2 - this.y;
            var dist = Math.sqrt(tx*tx+ty*ty);
            
            // Check if not already on place.
            if (dist != 0) {
                var velX = (tx/dist)*this.speed;
                var velY = (ty/dist)*this.speed;
                
                this.x += velX;
                this.y += velY;
            }

            this.attack();
        } else {
            var tx = this.nextWalkPoint.x - this.x;
            var ty =  this.nextWalkPoint.y - this.y;
            var dist = Math.sqrt(tx*tx+ty*ty);
            
            if (dist <= this.size) {
                this.nextWalkPoint = null;
            } else {
                var velX = (tx/dist)*this.speed;
                var velY = (ty/dist)*this.speed;
                
                this.x += velX;
                this.y += velY;
            }
        }
    }
    if (isNaN(this.x)) {
        console.log("nooo");
    }
}

Enemy.prototype.isDead = function () {
    return this.life <= 0;
}