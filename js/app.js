  //console.log('hello world');
  // Function to clear keypresses at the end of a match
  // Function to
  // Function to increase points
  // Funtion to increase round number
const game = {
  players: [],   // Array of player objects
  points: [0,0],
  round: 0,
  timer: 0,   // Timer in seconds: 3, 2, 1, 0  --> (0 = go)
  canChoose: false,
  countdown: null,
  newGame() {
    for (let i = 0; i < 2; i++) {
      let addPlayer = new Player(i);
      this.players.push(addPlayer);
    }
    this.startCountdown();
  },
  startCountdown() {
    this.timer = 3;
    // Function to create timer that stops after 3 seconds
    this.countdown = setInterval(() => {
      $('#timer').text(this.timer);
      //console.log(this.timer);
      this.canChoose = true;
      if (typeof(this.timer) === 'number'){
        this.timer--;
      }
      if (this.timer === 0) {
        this.timer = 'GO';
      } else if (this.timer === 'GO'){
        clearInterval(this.countdown);
        this.canChoose = false;
        this.verifyAction(0);
        this.verifyAction(1);
        this.editPlayersVulnerability();
        this.doAction(0);
        this.doAction(1);
        this.findMatchWinner();
      }
    }, 500);
    // Call selected / verified action of both players after timer ends

  },
  keypressToAction(pressedKey){
    //console.log('keypressToAction-------------');
    if (game.canChoose === true) {
      switch (pressedKey) {
        case 65: //Player 1 hits 'a' key (reload)
          this.players[0].action = 'reload';
          break;
        case 83: // Player 1 hits 'S' key (shield)
          this.players[0].action = 'shield';
          break;
        case 68: // Player 1 hits 'D' key (shoot)
          this.players[0].action = 'shoot';
          //console.log('1 Shot');
          //console.log(this.players[0].action);
          break;
        case 37: // Player 2 hits left arrow key (shoot)
          this.players[1].action = 'shoot';
          //console.log('2 Shot');
          //console.log(this.players[1].action);
          break;
        case 40: // Player 2 hits down arrow key (shoot)
          this.players[1].action = 'shield';
          break;
        case 39: //Player 2 hits right arrow key (reload)
          this.players[1].action = 'reload';
        break;
      }
    }
  },
  verifyAction(playerNum) {
    // //console.log('verifyAction------------');
    const player = this.players[playerNum];
    if (player.action == 'shoot' && player.ammo == 0) {
        player.action = 'shield';
        $('.debugger').append(`<h3>Player ${player.name + 1} tried to shoot with no ammo defaulted to shield, shield at ${player.shield}</h3>`);

        // Error sound needed
    } else if (player.action == 'reload' && player.ammo == 2) {
        player.action = 'shield';
        $('.debugger').append(`<h3>Player ${player.name+ 1} tried to reload with full ammo, defaulted to shield, shield at ${player.shield}</h3>`);
        // Error sound needed
    } else if (player.action == '') {
      player.action = 'shield'; $('.debugger').append(`<h3>Player ${player.name + 1} defaulted to shield, shield at ${player.shield}</h3>`);
    } else {
      $('.debugger').append(`<h3>Player ${player.name + 1} chose to ${player.action}, shield at ${player.shield}</h3>`).hide();
    }
  },
  editPlayersVulnerability(){
    //console.log('editPlayersVulnerability------------');
    //Edits players' vulnerability before their actions are executed, so that both are able to shoot each other at the same time
    for (let i = 0; i < 2; i++) {
      const player = this.players[i];
      //console.log('this is players action: ' + player.action)
      if (player.action === 'shield') {
        if (player.shield < 1) {
          player.isVulnerable = true;
          //console.log('no shield left');
        } else {
          player.isVulnerable = false;
        }
      } else {
        player.isVulnerable = true;
      }

    }
  },
  doAction(playerNum) {
    //console.log('doAction-----------------');
    const player = this.players[playerNum];
    let enemy = null;
    //console.log('DO' + player.action);
    if (playerNum == 0) {
      enemy = this.players[1];
    } else {
      enemy = this.players[0];
    }

    switch (player.action) {
      case 'shoot':
        this.players[playerNum].shoot(enemy);
        break;
      case 'reload':
        this.players[playerNum].reload();
        break;
      case 'shield':
        this.players[playerNum].useShield();
        break;
      default:
        this.players[playerNum].useShield();
        break;
    }
  },
  findMatchWinner(){
    //console.log('findMatchWinner');

    let winner = null;
    const p1isAlive= this.players[0].isAlive;
    //console.log('isp1 alive: ' + p1isAlive);
    const p2isAlive= this.players[1].isAlive;
    //console.log('isp2 alive: ' + p2isAlive);

    if(p1isAlive && p2isAlive) {
      //restarted match;
      this.players[0].action = '';
      this.players[1].action = '';
      this.startCountdown();
    } else if (!p1isAlive&& !p2isAlive) {
      winner = -1;
      $('.debugger').append(`<h3>winner: tie!</h3>`);
    } else if (p1isAlive&& !p2isAlive) {
      winner = 0;
      $('.debugger').append(`<h3>winner: Player 1</h3>`);
    } else if (!p1isAlive&& p2isAlive) {
      winner = 1;
      //console.log('winner: Player 2');
      $('.debugger').append(`<h3>winner: Player 2</h3>`)
    } else {
      winner = -1;
    }
    //console.log('winner: ' + winner);
    this.increasePoints(winner);
  },
  increasePoints(winner) {
    switch (winner) {
      case -1:
        this.round++;
        break;
      case 0:
        this.points[0]++;
        this.round++;
        break;
      case 1:
        this.points[1]++;
        this.round++;
        break;
    }
    // this.newRound();
  },
  newRound(){
    if (this.round > 7) {
      this.gameOver();
    } else {
      this.resetObject(0);
      this.resetObject(1);
    }
  },
  gameOver(){
    let winner = null;
    if (this.points[0] > this.points[1]) {
      winner = 0;
    } else {
      winner = 1;
    }
    console.log(`GAME OVER – PLAYER ${this.players[winner]}`);
  },
  resetObject(playerNum){
    const player = this.players[playerNum];
    player.isAlive = true;
    player.isVulnerable = true;
    player.shield = 3;
    player.ammo = 1;
    player.action = '';
  }
}
game.newGame();


  // Event listeners that listen for keypress
$(document).keydown((e) => {
    if(e.which==32) {
        clearInterval(game.countdown)
    } else {
      game.keypressToAction(e.which);
    }
});
