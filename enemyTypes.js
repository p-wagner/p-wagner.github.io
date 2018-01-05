
function BasicEnemy(x, y, size, life) {
    var color = "blue";
    Enemy.call(this, x, y, size, life, color);
}
inheritPseudoClass(Enemy, BasicEnemy);

function FastEnemy(x, y, size, life) {
    var color = "green";
    var speed = 1.5;
    life *= 0.7;
    Enemy.call(this, x, y, size, life, color, speed);
}
inheritPseudoClass(Enemy, FastEnemy);

function SlowEnemy(x, y, size, life) {
    var color = "yellow";
    var speed = 0.8;
    life *= 1.3;
    Enemy.call(this, x, y, size, life, color, speed);
}
inheritPseudoClass(Enemy, SlowEnemy);

function GroupEnemy(x, y, size, life) {
    var color = "black";
    life *= 0.5;
    Enemy.call(this, x, y, size, life, color);
}
inheritPseudoClass(Enemy, GroupEnemy);

function BossEnemy(x, y, size, life) {
    var color = "red";
    var speed = 0.3;
    life *= 4;
    Enemy.call(this, x, y, size, life, color, speed);
}
inheritPseudoClass(Enemy, BossEnemy);