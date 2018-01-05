function PathFinder() {
    this.openList = [];
    this.closedList = [];

    var sort = function (a, b) {
        var factor = 1.4;
        if ((b.distance * factor + b.pathLength) > (a.distance * factor + a.pathLength)) {
            return -1;
        }
        if ((b.distance * factor + b.pathLength) < (a.distance * factor + a.pathLength)) {
            return 1;
        }
        return 0;
    }

    var calcDistance = function (x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    }

    var expandTile = function (closedList, openList, grid, element, x, y, endX, endY) {
        for (var i = 0; i < closedList.length; i++) {
            var current = closedList[i];
            if (current.x == x && current.y == y) {
                return;
            }
        }

        var tile = grid[x][y];
        if (tile.isWalkable()) {

            var pathLength = element.pathLength + calcDistance(element.x, element.y, x, y)

            var elementInOpenList = null;
            var openListIndex = 0;
            for (var openListIndex = 0; openListIndex < openList.length; openListIndex++) {
                var current = openList[openListIndex];
                if (current.x == x && current.y == y) {
                    elementInOpenList = current;
                }
            }
            if (elementInOpenList != null) {
                if (elementInOpenList.pathLength > pathLength) {
                    openList.splice(openListIndex, 1);
                } else {
                    return;
                }
            }

            openList.push({
                x: x,
                y: y,
                distance: calcDistance(x, y, endX, endY),
                pathLength: pathLength,
                previous: element,
                length: element.length + 1
            });
        }
    }

    var formatPath = function (end) {
        var path = [];
        path.push()
        var currentElement = end;
        do {
            path.push({
                x: currentElement.x,
                y: currentElement.y
            });
            currentElement = currentElement.previous;
        }
        while (currentElement != null);
        return path;
    }



    this.findPathAsync = async function (startX, startY, endX, endY, grid, width, heigth) {
        return this.findPath(startX, startY, endX, endY, grid, width, heigth);
    }

    this.findPath = function (startX, startY, endX, endY, grid, width, heigth) {
        this.openList = [];
        this.closedList = [];

        this.openList.push({
            x: startX,
            y: startY,
            distance: calcDistance(startX, startY, endX, endY),
            pathLength: 0,
            previous: null,
            length: 0
        });

        var checkedTiles = 0;
        while (this.openList.length > 0) {
            this.openList.sort(sort);
            var element = this.openList.shift();
            checkedTiles++;
            if (element.x == endX && element.y == endY) {
                console.log("Took " + checkedTiles + " checks to find Path");
                return formatPath(element);
            }
            if (debugPathFinding) {
                this.sleep(20);
            }

            this.closedList.push(element);

            //UP
            if (element.y > 0) {
                var x = element.x;
                var y = element.y - 1;
                expandTile(this.closedList, this.openList, grid, element, x, y, endX, endY);
            }

            //DOWN
            if (element.y < heigth - 1) {
                var x = element.x;
                var y = element.y + 1;
                expandTile(this.closedList, this.openList, grid, element, x, y, endX, endY);
            }

            //RIGHT
            if (element.x < width - 1) {
                var x = element.x + 1;
                var y = element.y;
                expandTile(this.closedList, this.openList, grid, element, x, y, endX, endY);
            }

            //LEFT
            if (element.x > 0) {
                var x = element.x - 1;
                var y = element.y;
                expandTile(this.closedList, this.openList, grid, element, x, y, endX, endY);
            }
        }
        console.log("Took " + checkedTiles + " checks to find no Path");
        var nearestElementToEnd = {
            distance: Number.MAX_VALUE
        };
        for (var i = 0; i < this.closedList.length; i++) {
            var element = this.closedList[i];
            if (element.distance < nearestElementToEnd.distance) {
                nearestElementToEnd = element;
            }
        }
        return formatPath(nearestElementToEnd);
    }

    this.draw = function () {
        if (!debugPathFinding) {
            return;
        }
        if (!this.openList || !this.closedList || !game.gameArea.tiles) {
            return;
        }
        ctx.fillStyle = "green";
        var margin = game.tileSize / 5;
        for (i = 0; i < this.openList.length; i++) {
            currentTile = game.gameArea.tiles[this.openList[i].x][this.openList[i].y];
            ctx.fillRect(currentTile.x + margin, currentTile.y + margin, currentTile.width - margin * 2, currentTile.height - margin * 2);
        }


        ctx.fillStyle = "red";
        for (var i = 0; i < this.closedList.length; i++) {
            if (isNaN(this.closedList[i].x) || isNaN(this.closedList[i].y)) {
                continue;
            }
            currentTile = game.gameArea.tiles[this.closedList[i].x][this.closedList[i].y];
            ctx.fillRect(currentTile.x + margin, currentTile.y + margin, currentTile.width - margin * 2, currentTile.height - margin * 2);
        }

    }

    this.sleep = function (ms) {
        return new Promise(r => setTimeout(r, ms));
    }
}