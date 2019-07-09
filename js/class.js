class Player {
  constructor(number){
    this.name = number;
    this.isAlive = true;
    this.isVulnerable = true;
    this.shield = 3; //Indicates number of shields, whether or not shield was used last turn
    this.ammo = 100;
    this.action = '';
  }
  shoot(enemy){
    this.ammo--;
    if (enemy.isVulnerable == true) {
      enemy.isAlive = false;
    }
    this.shield = 3;
  }
  reload(){
    this.ammo ++;
    this.shield = 3;
  }
  useShield(){
    if (this.shield > 0) {
      this.shield --;
    }
  }
}
