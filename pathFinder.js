function PathFinder() {
    var sort = function (a, b) {
        return b.distance - a.distance;
    }

    var calcDistance = function (x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    }

    var checkTile = function (visited, queue, grid, element, x, y, endX, endY) {
        for(var i = 0; i < visited.length; i++) {
            var current = visited[i];
            if (current.x == x && current.y == y) {
                return;
            }
        }
        visited.push({
            x: x,
            y: y
        });

        var tile = grid[x][y];
        if (tile.isWalkable()) {
            queue.push({
                x: x,
                y: y,
                distance: calcDistance(x, y, endX, endY),
                previous: element
            });
            queue.sort(sort);
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

    this.findPath = function (startX, startY, endX, endY, grid, width, heigth) {
        var queue = [];
        var visited = [];

        queue.push({
            x: startX,
            y: startY,
            distance: calcDistance(startX, startY, endX, endY),
            previous: null
        });

        while (queue.length > 0) {
            var element = queue.pop();
            if (element.x == endX && element.y == endY) {
                return formatPath(element);
            }

            //UP
            if (element.y > 0) {
                var x = element.x;
                var y = element.y - 1;
                checkTile(visited, queue, grid, element, x, y, endX, endY);
            }

            //DOWN
            if (element.y < heigth - 1) {
                var x = element.x;
                var y = element.y + 1;
                checkTile(visited, queue, grid, element, x, y, endX, endY);
            }

            //RIGHT
            if (element.x < width - 1) {
                var x = element.x + 1;
                var y = element.y;
                checkTile(visited, queue, grid, element, x, y, endX, endY);
            }

            //LEFT
            if (element.x > 0) {
                var x = element.x - 1;
                var y = element.y;
                checkTile(visited, queue, grid, element, x, y, endX, endY);
            }
        }
    }
}