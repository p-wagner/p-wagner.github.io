
function BasicTower(x, y, width, height) {
    Tower.call(this, x, y, width, height);
    this.color = "blue";
    this.prize = 10;
}
inheritPseudoClass(Tower, BasicTower);
game.availableTowers.push(BasicTower);


function GunTower(x, y, width, height) {
    Tower.call(this, x, y, width, height);
    this.color = "green";
    this.prize = 20;
}
inheritPseudoClass(Tower, GunTower);
game.availableTowers.push(GunTower);
