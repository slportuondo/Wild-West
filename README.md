Terminator / James Bond / Wild Wild West Game:

MVP:
  - Rules:
    - 2 players
      - Each player has 3 powers:
        - Shield (default)
          - Players start with 3 Shield
          - Players can use shield 3 times in a row
          - Shield completely refills each time it isn't used
        - Reload (on button push) -- Gives player 1 ammo
          - Each player can hold up to 2 ammo
        - Shoot
          - Each player can only shoot if they have ammo
    - 7 Rounds (Or best of 7)
      - Each round is comprised of matches
        - Each match is 3 seconds long
          <!-- pause after each match, until animation plays out -->
        - In each match, players have to select which power they use
          - Power-specific animation will play on each players screen, depending on their respective power selection
          - If a player does not select a power, they will default to using shield (if shield is available)
            - If shield is unavailable, the player defaults to being vulnerable
        - Rounds end when one (or both players) die
          - Players die when they are shot, unless they have selected to use their shield during the match
        - The winner of the round gets a point, which is applied to their win total
          - If both players die, no one gets a point
      - If the scores are tied at the end of the 7 rounds, a sudden death match occurs



  Additional options after MVP:
    - More than 2 Players
      - Players are arranged in a circle in the center of the screen
      - Players can select who they shoot at
      - Ammo each match is limited to one
      - Reload is replaced with "risky shield"
        - If player uses risky shield, all opponents who select to shoot the player are eliminated
        - If player uses risky shield and no one has shot at them, the player is eliminated

      OR

    - Single player mode
      - One player acts is controlled by user, other is a bot
