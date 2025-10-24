# rock-paper-scissors
A simple rock, paper, scissors game where the player competes against the computer.

## Description
This JavaScript application uses HTML, CSS, and JS to provide the user with a simple-to-use GUI for playing the classic rock, paper, scissors game against the computer.

## Key Features

- **Rock, Paper, Scissors Gameplay**: Play against the computer with classic rules (Rock beats Scissors, Paper beats Rock, Scissors beats Paper).
- **Score Tracking & Winning Condition**: Tracks player and computer scores, ending the game when either reaches the winning score (default: 3).
- **Game Over Dialog**: Displays a modal with the winner and final scores, closable by clicking outside (with first-click skip to prevent instant closure).
- **State Persistence**: Saves and loads game state (scores, game status) to/from localStorage for resuming on reload.
- **Visual Feedback & Reset**: Highlights choices (green for winner, red for loser, gray for tie), disables buttons briefly, and resets via dialog or button.

## Installation

1. Clone the repo: `git clone https://github.com/austinProGit/rock-paper-scissors.git`
2. Open `index.html` in a modern browser (e.g., Chrome, Firefox).

No dependencies required (uses vanilla JavaScript, HTML, CSS).