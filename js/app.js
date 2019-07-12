  //console.log('hello world');
  // Function to clear keypresses at the end of a match
  // Function to
  // Function to increase points
  // Funtion to increase round number
const game = {
  players: [], // Array of player objects
  animations: {
    sprite: ['1Sprite.png', '2Sprite.png'],
    shoot: ['1Shoot.gif', '2Shoot.gif'],
    reload: ['1Reload.gif', '2Reload.gif' ],
    shield: ['1Shield.gif', '2Shield.gif'],
    death: ['1Death.gif', '2Death.gif'],
    respawn:['1Respawn.gif', '2Respawn.gif']
  },
  points: [0,0],
  round: 1,
  suddenDeath: false,
  timer: 0,
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
    // Function to create timer that stops after 3 seconds
    this.timer = 3;
    this.countdown = setInterval(() => {
      $('#timer').text(this.timer);
      //console.log(this.timer);
      this.canChoose = true;
      if (typeof(this.timer) === 'number'){
        this.timer--;
      }
      if (this.timer === 0) {
        this.timer = '';
      } else if (this.timer === ''){
        clearInterval(this.countdown);
        this.canChoose = false;
        this.verifyAction(0); this.verifyAction(1);
        this.editPlayersVulnerability();
        this.doAction(0);
        this.doAction(1);
        this.animateActions();
        this.animateDeaths();
        this.findMatchWinner();
      }
    }, 500);
    // Call selected / verified action of both players after timer ends
  },
  keypressToAction(pressedKey){
    console.log('1 keypressToAction-------------');
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
          //console.log(this.players[0].action);
          break;
        case 37: // Player 2 hits left arrow key (shoot)
          this.players[1].action = 'shoot';
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
  },  //1
  verifyAction(playerNum) {
    console.log('2 verifyAction-------------------');
    const player = this.players[playerNum];
    if (player.action == 'shoot' && player.ammo == 0) {
        player.action = 'shield';
        // Error sound needed
    } else if (player.action == 'reload' && player.ammo == 2) {
        player.action = 'shield';
        // Error sound needed
    } else if (player.action === '') {
      player.action = 'shield';
     }
  },      //2
  editPlayersVulnerability(){
    console.log('3 editPlayersVulnerability-------------------');

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
  },    //3
  doAction(playerNum) {
    console.log('4 doAction-----------------');
    const player = this.players[playerNum];
    let enemy = null;

    if (playerNum == 0) {
      enemy = this.players[1];
    } else {
      enemy = this.players[0];
    }
    switch (player.action) {
      case 'shoot':
        player.shoot(enemy);
        break;
      case 'reload':
        player.reload();
        break;
      case 'shield':
        player.useShield();
        break;
      case '':
        player.action = 'shield';
        player.useShield();
        break;
    }
  },          //4
  animateActions() {
    console.log('5 animateActions-------------------');

    const player1Action = this.players[0].action;
    const player2Action = this.players[1].action;
    $('#0').attr('src', `images/cowboy${this.animations[player1Action][0]}`);
    $('#1').attr('src', `images/cowboy${this.animations[player2Action][1]}`);
  },             //5
  animateDeaths() {
    const player1 = this.players[0];
    const player2 = this.players[1];
    if (player1.isAlive && player2.isAlive) {
      return;
    } else {
      setTimeout(() => {
        console.log('MID death--------------');
        if (!player1.isAlive) {
          $(`#0`).attr('src', `images/cowboy${this.animations['death'][0]}`);
          setTimeout(() => {
            this.animateRespawn(0);
          }, 500);
        }
        if (!player2.isAlive) {
          $('#1').attr('src', `images/cowboy${this.animations['death'][1]}`);
          setTimeout(() => {
            this.animateRespawn(1);
          }, 500);
        }
      }, 850)
    }
  },
  animateRespawn(playerNum){
    console.log('MID Respawn--------------');
      $(`#${playerNum}`).attr('src', `images/cowboy${this.animations['respawn'][playerNum]}`);
  },                         //6
  findMatchWinner(){
    console.log('7 findMatchWinner-------------------');
    const p1isAlive= this.players[0].isAlive;
    //console.log('isp1 alive: ' + p1isAlive);
    const p2isAlive= this.players[1].isAlive;
    //console.log('isp2 alive: ' + p2isAlive);

    if (!p1isAlive&& !p2isAlive) {
      this.increasePoints(-1);
    } else if (p1isAlive&& !p2isAlive) {
      this.increasePoints(0);
    } else if (!p1isAlive&& p2isAlive) {
      this.increasePoints(1);
    } else if(p1isAlive && p2isAlive) {
      this.startCountdown();
    }
  },             //7
  increasePoints(winner) {
    console.log('8 increasePoints-------------------');

    let winMessage = ''
    switch (winner) {
      case -1:
        this.round++;
        winMessage = 'DRAW'
        break;
      case 0:
        this.points[0]++;
        this.round++;
        winMessage = 'P1 WINS MATCH';
        break;
      case 1:
        winMessage = 'P2 WINS MATCH';
        this.points[1]++;
        this.round++;
        break;
    }
    this.updateDisplay(winMessage);
  },       //8
  updateDisplay(winMessage){
    console.log('9 updateDisplay-------------------');

    $('#announcer').text(winMessage);
    console.log(winMessage)
    setTimeout(() => {
      $('#pointDisplayP1').text(this.points[0]);
      $('#pointDisplayP2').text(this.points[1]);
      $('#announcer').text('Round: ' + this.round);
    }, 2000);
    setTimeout(() => {
      $('#announcer').text('');
      this.newRound();
    }, 4000);
  },     //9
  newRound(){
    console.log('10newRound-------------------');
    if (this.round > 7) {
      this.gameOver();
    } else {
      this.resetObject(0);
      this.resetObject(1);
      this.startCountdown();
    }
  },                    //10
  resetObject(playerNum){
    console.log('11 resetObject-------------------');

    const player = this.players[playerNum];
    player.isAlive = true;
    player.isVulnerable = true;
    player.shield = 3;
    player.ammo = 1;
    player.action = '';
  },        //11
  gameOver(){
    console.log('12 gameOver-------------------');

    let winner = null;
    if (this.points[0] > this.points[1]) {
      winner = 'P1';
    } else {
      winner = 'P2';
    }
    $('#announcer').text('WINNER: P1');
  }                     //12
}
game.newGame();

// Event listeners that listen for keypress
$(document).keydown((e) => {
  game.keypressToAction(e.which);
});
