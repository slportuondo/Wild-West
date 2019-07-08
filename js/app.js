console.log('hello world');
  // Function to check keypress, if within the time limit
    // Player 1 choose to shoot
    // Player 1 choose to reload
    // Player 1 choose to shield
    // Player 2 choose to shoot
    // Player 2 choose to shoot
    // Player 2 choose to shield
  // Function to clear keypresses at the end of a match
  // Function to increase points
  // Funtion to increase round number
const game = {
  players: [],   // Array of player objects
  timer: null,   // Timer in seconds: 3, 2, 1, 0  --> (0 = go)
  startGame() {

  },
  startCountdown() {
    this.timer = 3;
    // Funtion to create timer that stops after 3 seconds
    let countdown = setInterval(() => {
      $('#timer').text(this.timer);
      if (typeof(this.timer) === 'number'){
        this.timer--;
      }

      if (this.timer === 0) {
        this.timer = '';
      } else if (this.timer === ''){
        clearInterval(countdown);
      }
    }, 1000);
  },
  playerAction(){}
}
game.startCountdown();

  // Event listeners that listen for keypress
    $(document).on('keypress', (e) => {
      console.log(e);
      game.startGame(e);
    });
