
function BasicTower(x, y, width, height) {
    Tower.call(this, x, y, width, height);
    this.color = "#555599";
    this.prize = 10;
}
inheritPseudoClass(Tower, BasicTower);
game.availableTowers.push(BasicTower);


function GunTower(x, y, width, height) {
    Tower.call(this, x, y, width, height);
    this.color = "#559955";
    this.prize = 20;
    this.maxHealthPoints = 500;
    this.currentHealthPoints = this.maxHealthPoints;
}
inheritPseudoClass(Tower, GunTower);
game.availableTowers.push(GunTower);


function RocketTower(x, y, width, height) {
    Tower.call(this, x, y, width, height);
    this.color = "#995555";
    this.prize = 20;
    this.maxHealthPoints = 200;
    this.currentHealthPoints = this.maxHealthPoints;
}
inheritPseudoClass(Tower, RocketTower);
game.availableTowers.push(RocketTower);
