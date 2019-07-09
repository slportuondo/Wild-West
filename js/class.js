class Player {
  constructor(number){
    this.player = number;
    this.alive = true;
    this.vulnerability = false;
    this.shield = 3; //Indicates number of shields, whether or not shield was used last turn
    this.ammo = 1;
    this.action = '';
  }
  shoot(enemy){
    this.vulnerability = true;
    this.shield = 3;
    this.ammo--;
    if (enemy.vulnerability === true) {
      enemy.alive = false;
    }
  }
  reload(){
    this.vulnerability = true;
    this.shield = 3;
    this.ammo ++;
  }
  shield(){
    // Reload shields if they weren't used last turn
    if (this.shield[0] > 0) {
      this.shield[0] --;
      this.vulnerability = false;
    } else {
      this.vulnerability = true;
    }
  }
}
