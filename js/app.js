console.log('hello world');
  // Function to clear keypresses at the end of a match
  // Function to increase points
  // Funtion to increase round number
const game = {
  players: [],   // Array of player objects
  timer: false,   // Timer in seconds: 3, 2, 1, 0  --> (0 = go)
  canChoose: false,
  startGame() {

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
  },
  playerKeypress(pressedKey){
    if (game.canChoose === true) {
      switch (pressedKey) {
        case 65: //Player 1 hits 'a' key (reload)
        game.player[0].action = 'reload';
        break;
        case 83: // Player 1 hits 'S' key (shield)
        game.player[0].action = 'shield';
        break;
        case 68: // Player 1 hits 'D' key (shoot)
        game.player[0].action = 'shoot';
        break;
        case 37: // Player 2 hits left arrow key (shoot)
        game.player[1].action = 'shoot';
        break;
        case 40: // Player 2 hits down arrow key (shoot)
        game.player[1].action = 'shield';
        break;
        case 39: //Player 2 hits right arrow key (reload)
        game.player[1].action = 'reload';
        break;
        default: return;
      }
    }
  },
  playerAction(number) {
    const key = game.player[number].action;
    switch (key) {
      case 'shoot':
        game.player[number].shoot();
      break;
      case 'reload':
        game.player[number].reload();
      break;
      case 'shield':
        game.player[number].shield();
      break;
      default: game.player[number].shield();  
    }
    game.player[number].reload();
  }
}
game.startCountdown();

  // Event listeners that listen for keypress
    $(document).keydown((e) => {
      console.log(e.which);
      game.playerKeypress(e.which);
    });











    //
    //
