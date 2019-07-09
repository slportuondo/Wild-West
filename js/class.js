class Player {
  constructor(number){
    this.player = 'player' + number;
    this.alive = true;
    this.vulnerability = false;
    this.shield = [3, false]; //Indicates number of shields, whether or not shield was used last turn
    this.ammo = 1;
    this.action = '';
  }
  shoot(enemy){
    this.vulnerability = true;
    this.ammo--;
    if (enemy.vulnerability === true) {
      enemy.alive = false;
    }
  }
  reload(){
    this.vulnerability = true;
    this.shield[1] = false;
    if (this.ammo < 2) {
      this.ammo ++;
    }
  }
  shield() {
    // Reload shields if they weren't used last turn
    if (this.shield[1] === false){
      this.shield[0] = 3;
    }
    this.shield[1] = true;
    if (this.shield[0] > 0) {
      this.shield[0] --;
      this.vulnerability = false;
    } else {
      this.vulnerability = true;
    }
  }
}
