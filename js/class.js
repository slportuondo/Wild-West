// Create a class that creates Player object
  // Constructor method
    // Player number
    // Player ammo: 1
    // Player shield: 3
    // Player vulnerability: false while the player has shields
    // Player keypress: '';
  // Function to let player shoot
  // Function to let player reload
  // Function to let player shield

class Player {
  constructor(number){
    this.player = 'player' + number;
    this.ammo = 1;
    this.shield = 3;
    this.vulnerability = false;
    this.action = '';
  }
  shoot(enemy){
    enemy.shield --;
    this.vulnerability = true;
  }
  reload(){
    this.ammo ++;
    this.vulnerability = true;
  }
  shield() {
    this.shield --;
    this.vulnerability = false;
  }
}
