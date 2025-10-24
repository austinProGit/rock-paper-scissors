const game = {
    playerScore : 0,
    computerScore : 0,
    winningScore : 3,
    gameOver : false,

    computerMakesChoice() {
        return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]
    },
    handlePlayerMove(e) {
        let buttonClicked = e.target.closest('button')
        if (buttonClicked) {
            if (buttonClicked.classList.contains('option-rock') || buttonClicked.classList.contains('option-paper') || buttonClicked.classList.contains('option-scissors')) {
                let computerChoice = this.computerMakesChoice()
                let playerChoice = null
                let winner = null
                if(buttonClicked.classList.contains('option-rock')) {
                    playerChoice = 'rock'
                } else if (buttonClicked.classList.contains('option-paper')) {
                    playerChoice = 'paper'
                }else if (buttonClicked.classList.contains('option-scissors')) {
                    playerChoice = 'scissors'
                }
                if (playerChoice) {
                    if (playerChoice === 'rock') {
                        if (computerChoice == 'paper') {
                            winner = 'computer'
                        } else if (computerChoice === 'scissors') {
                            winner = 'player'
                        }
                    } else if (playerChoice === 'paper') {
                        if (computerChoice === 'rock' ) {
                            winner = 'player'
                        } else if (computerChoice === 'scissors') {
                            winner = 'computer'
                        }

                    } else if (playerChoice === 'scissors') {
                        if (computerChoice === 'rock') {
                            winner = 'computer'
                        } else if (computerChoice === 'paper') {
                            winner = 'player'
                        }
                    }
                }
                if (winner === 'player') {
                    this.playerScore++
                }else if (winner === 'computer') {
                    this.computerScore++
                }
                this.showResult(playerChoice, computerChoice, winner)
                this.displayScore()
                this.saveGame()
                this.checkGameScore()
            }
        }
    },
    displayScore() {
        let playerScoreDisplay = document.querySelector('.score-player')
        if (playerScoreDisplay) {
            playerScoreDisplay.innerHTML = `<h4>Player score: ${this.playerScore}</h4>`
        }
        let computerScoreDisplay = document.querySelector('.score-computer')
        if (computerScoreDisplay) {
            computerScoreDisplay.innerHTML = `<h4>Computer score: ${this.computerScore}</h4>`
        }
    },
    showResult(playerButton, computerButton, winner) {
        let playerBtn = document.querySelector(`.player-choices-container button.option-${playerButton}`)
        let computerBtn = document.querySelector(`.computer-choices-container button.option-${computerButton}`)
        if (!winner) {
            playerBtn.style.backgroundColor = 'gray'
            computerBtn.style.backgroundColor = 'gray'
        }
        if (winner === 'computer') {
            playerBtn.style.backgroundColor = 'red'
            computerBtn.style.backgroundColor = 'green'
        }
        if (winner === 'player') {
            playerBtn.style.backgroundColor = 'green'
            computerBtn.style.backgroundColor = 'red'
        }
        let playerButtons = document.querySelectorAll('.player-choices-container button')
        playerButtons.forEach((button) => {
            button.disabled = true
        })
        setTimeout(() => {
            let computerButtons = document.querySelectorAll('.computer-choices-container button')
            computerButtons.forEach((button) => {
                button.style.backgroundColor = 'rgb(174, 174, 174)'
            })
            playerButtons.forEach((button) => {
                button.style.backgroundColor = 'revert'
                button.disabled = false
            })
        }, 1000)
    },
    endGame(winner) {
        let gameWinner = winner
        let gameResultDialog = document.createElement('div')
        gameResultDialog.classList.add('game-result-dialog')
        gameResultDialog.innerHTML = `
        <h2>GAME OVER</h2>
        <h3>${gameWinner} won!</h3>
        <h4>Final Score:</h4>
        <p>Player Score: ${this.playerScore}</p>
        <p>Computer Score: ${this.computerScore}</p>

        `
        let mainContainer = document.querySelector('.main-container')
        if (mainContainer) { 
            mainContainer.appendChild(gameResultDialog)
        }
        let isFirstClick = true
        const outsideClickListener = (e) => {
            if (isFirstClick) {
                isFirstClick = false
                return
            } else {
                if (!(gameResultDialog.contains(e.target))) {
                    gameResultDialog.remove()
                    this.resetGame()
                    document.removeEventListener('click', outsideClickListener)
                }
            }
        }
        document.addEventListener('click', outsideClickListener)
    },
    checkGameScore() {
        let winner = null
        if (this.playerScore >= this.winningScore) {
            winner = 'player'
        }
        if (this.computerScore >= this.winningScore) {
            winner = 'computer'
        }
        if (winner) {
            return this.endGame(winner)
        }
    },
    resetGame() {
        this.playerScore = 0
        this.computerScore = 0
        this.gameOver = false
        this.displayScore()
        localStorage.setItem('rpsGame', JSON.stringify(this))
    },
    addEventListeners() {
        let playerChoicesContainer = document.querySelector('.player-choices-container')
        if (playerChoicesContainer) {
            playerChoicesContainer.addEventListener('click', this.handlePlayerMove.bind(this))
        }
        let resetGameButton = document.querySelector('.reset-container')
        if (resetGameButton) {
            resetGameButton.addEventListener('click', this.resetGame.bind(this))
        }
    },
    displayWinningScore() {
        let winningScoreDisplay = document.querySelector('.score-container span')
        if (winningScoreDisplay) {
            winningScoreDisplay.innerText = this.winningScore
        }
    },
    saveGame(){
        localStorage.setItem('rpsGame', JSON.stringify(this))
    },
    loadGame() {
        let loadedGame = JSON.parse(localStorage.getItem('rpsGame'))
        if (loadedGame) {
            this.playerScore = loadedGame.playerScore
            this.computerScore = loadedGame.computerScore
            this.gameOver = loadedGame.gameOver
        }
    },
    initialize() {
        this.addEventListeners()
        this.displayWinningScore()
        this.loadGame()
        this.displayScore()
    },
}
game.initialize()