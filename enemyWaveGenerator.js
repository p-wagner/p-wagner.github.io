function EnemyWaveGenerator() {
    this.currentWave = 0;
    this.wavePattern = [1,1,2,1,3,4,1,5,1,2,5,1,2];
    this.state = "break";
    this.counter = 10;
    this.wavePower = 100;
}


EnemyWaveGenerator.prototype.update = function () {
    if (this.state == "break" && this.counter == 0) {
        this.state = "wave";
        this.currentWave++;
        this.counter = 5;
    }

    if (this.state == "wave" && this.counter == 0) {
        this.state = "break";
        this.counter = 10;
    }


    if (game.gameArea.frameNo % 50 == 0) {
        this.counter--;

        if (this.state == "break") {
            // nothing
        } else if (this.state == "wave") {
            var enemy = this.buildEnemy();


            game.gameArea.enemies.push(enemy);
            this.generatedEnemy = true;
            console.log("New Enemy generated. New Count: " + game.gameArea.enemies.length);
            this.currentWaveEnemyLeft--;
        }
    }
}

EnemyWaveGenerator.prototype.buildEnemy = function() {
    var index = this.currentWave % this.wavePattern.length;
    var patternValue = this.wavePattern[index];

    switch(patternValue) {
        case 1: {
            var enemy = new BasicEnemy(
                game.gameArea.startX * game.tileSize + (game.tileSize / 2),
                game.gameArea.startY * game.tileSize + (game.tileSize / 2), game.tileSize / 4);
            break;
        }
        case 2: {
            var enemy = new FastEnemy(
                game.gameArea.startX * game.tileSize + (game.tileSize / 2),
                game.gameArea.startY * game.tileSize + (game.tileSize / 2), game.tileSize / 4);
            break;
        }
        case 3: {
            var enemy = new SlowEnemy(
                game.gameArea.startX * game.tileSize + (game.tileSize / 2),
                game.gameArea.startY * game.tileSize + (game.tileSize / 2), game.tileSize / 4);
            break;
        }
        case 4: {
            var enemy = new GroupEnemy(
                game.gameArea.startX * game.tileSize + (game.tileSize / 2),
                game.gameArea.startY * game.tileSize + (game.tileSize / 2), game.tileSize / 4);
            break;
        }
        case 5: {
            var enemy = new BossEnemy(
                game.gameArea.startX * game.tileSize + (game.tileSize / 2),
                game.gameArea.startY * game.tileSize + (game.tileSize / 2), game.tileSize / 4);
            break;
        }
    }

    return enemy;
}