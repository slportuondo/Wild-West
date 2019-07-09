console.log('hello world');
  // Function to clear keypresses at the end of a match
  // Function to
  // Function to increase points
  // Funtion to increase round number
const game = {
  players: [],   // Array of player objects
  score: [0,0],
  round: 0,
  timer: '',   // Timer in seconds: 3, 2, 1, 0  --> (0 = go)
  canChoose: false,
  startGame() {
    for (let i = 0; i < 2; i++) {
      let addPlayer = new Player(i);
      this.players.push(addPlayer);
    }
    this.startCountdown();
  },
  startCountdown() {
    this.timer = 3;
    // Funtion to create timer that stops after 3 seconds
    let countdown = setInterval(() => {
      $('#timer').text(this.timer);
      this.canChoose = true;
      if (typeof(this.timer) === 'number'){
        this.timer--;
      }
      if (this.timer === 0) {
        this.timer = '';
      } else if (this.timer === ''){
        clearInterval(countdown);
        this.canChoose = false;
      }
    }, 1000);
    // Call selected / verified action of both players after timer ends
    this.doAction(0);
    this.doAction(1)
  },
  translateKeypress(pressedKey){
    if (game.canChoose === true) {
      switch (pressedKey) {
        case 65: //Player 1 hits 'a' key (reload)
        game.player[0].action = 'reload';
        this.verifyAction(0);
        break;
        case 83: // Player 1 hits 'S' key (shield)
        game.player[0].action = 'shield';
        this.verifyAction(0);
        break;
        case 68: // Player 1 hits 'D' key (shoot)
        game.player[0].action = 'shoot';
        this.verifyAction(0);
        break;
        case 37: // Player 2 hits left arrow key (shoot)
        game.player[1].action = 'shoot';
        this.verifyAction(1);
        break;
        case 40: // Player 2 hits down arrow key (shoot)
        game.player[1].action = 'shield';
        this.verifyAction(1);
        break;
        case 39: //Player 2 hits right arrow key (reload)
        game.player[1].action = 'reload';
        this.verifyAction(1);
        break;
        default: return;
      }
    }
  },
  verifyAction(playerNum) {
    const player = game.players[playerNum];
    console.log(player);
    let enemyNum = null;
    if (playerNum === 0) {
      enemyNum = 1;
    } else {
      enemyNum = 0;
    }
    console.log(playerNum);
    console.log(player.action);
    if (player.action === 'shoot') {
      if (player.ammo < 1) {
        player.action = 'shield';
        // Add error sound later
      }
    } else if (action === 'reload') {
      if (player.ammo > 1) {
        player.action = 'shield';
        // Add error sound later
      } else {
        return;
      }
    }
  },
  doAction(playerNum) {
    const key = game.player[playerNum].action;
    switch (key) {
      case 'shoot':
        game.player[playerNum].shoot();
      break;
      case 'reload':
        game.player[playerNum].reload();
      break;
      case 'shield':
        game.player[playerNum].shield();
      break;
      default: game.player[playerNum].shield();
    }
  },
  findMatchWinner(){
    let winner = null;
    const p1Alive = this.player[0].alive;
    const p2Alive = this.player[1].alive;

    switch (true) {
      case p1Alive && p2Alive:
      winner = 0;
        break;
      case p1Alive && !p2Alive:
        winner = 1;
        break;
      case !p1Alive && p2Alive:
        winner = 2;
        break;
      default: winner = 0;
    }

    this.pointsTo(winner);
  },
  pointsTo(winner) {

  },
  newRound(){
    //reset obj values
    //
  }
}

game.startGame();


  // Event listeners that listen for keypress
  $(document).keydown((e) => {
      console.log(e.which);
      game.translateKeypress(e.which);
    });











    //
    //
