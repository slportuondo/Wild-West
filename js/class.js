class Player {
  constructor(number){
    this.name = number;
    this.isAlive = true;
    this.isVulnerable = true;
    this.shield = 3; //Indicates number of shields, whether or not shield was used last turn
    this.ammo = 1;
    this.action = '';
  }
  shoot(enemy){
    this.animate('shoot')
    this.ammo--;
    if (enemy.isVulnerable == true) {
      enemy.isAlive = false;
    }
    this.shield = 3;
  }
  reload(){
    this.ammo ++;
    this.shield = 3;
    this.animate('reload');
  }
  useShield(){
    if (this.shield > 0) {
      this.shield --;
      this.animate('shield');
    }
  }
  animate(action){
    const character = ('character' + this.name + 'Display');
    switch (action) {
      case 'shoot':
        $(character);
        break;
      case 'reload':

        break;
      case 'shield':

        break;
      default:

    }
  }
}
