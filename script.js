// global variables
let playerScore = 0
let computerScore = 0
let winningScore = 4
let gameOver = false

// functions
function computerMakesChoice() {
    let choiceNum = Math.floor(Math.random() * 3)
    let computerChoice = ''
    if (choiceNum === 0) {
        computerChoice = 'rock'
    }
    if (choiceNum === 1) {
        computerChoice = 'paper'
    }
    if (choiceNum === 2) {
        computerChoice = 'scissors'
    }
    return computerChoice
}
function evaluatePlayerClicksRock() {
    let computerChoice = computerMakesChoice()
    let playerChoice = 'rock'
    if (computerChoice === 'rock') {
        showResult(playerChoice, computerChoice, null)
    }
    if (computerChoice === 'paper') {
        computerScore++
        showResult(playerChoice, computerChoice, 'computer')
    }
    if (computerChoice === 'scissors') {
        playerScore++
        showResult(playerChoice, computerChoice, 'player')
    }
    displayScore()
    checkGameScore()
}
function evaluatePlayerClicksPaper() {
    let computerChoice = computerMakesChoice()
    let playerChoice = 'paper'
    if (computerChoice === 'rock') {
        playerScore++
        showResult(playerChoice, computerChoice, 'player')
    }
    if (computerChoice === 'paper') {
        showResult(playerChoice, computerChoice, null)
    }
    if (computerChoice === 'scissors') {
        computerScore++
        showResult(playerChoice, computerChoice, 'computer')
    }
    displayScore()
    checkGameScore()
}
function evaluatePlayerClicksScissors(){
    let computerChoice = computerMakesChoice()
    let playerChoice = 'scissors'
    if (computerChoice === 'rock') {
        computerScore++
        showResult(playerChoice, computerChoice, 'computer')
    }
    if (computerChoice === 'paper') {
        playerScore++
        showResult(playerChoice, computerChoice, 'player')
    }
    if (computerChoice === 'scissors') {
        showResult(playerChoice, computerChoice, null)
    }
    displayScore()
    checkGameScore()
}
function handlePlayerMove(e) {
    let buttonClicked = e.target.closest('button')
    if (buttonClicked) {
        if(buttonClicked.classList.contains('option-rock')) {
            evaluatePlayerClicksRock()
        }
        if(buttonClicked.classList.contains('option-paper')) {
            evaluatePlayerClicksPaper()
        }
        if(buttonClicked.classList.contains('option-scissors')) {
            evaluatePlayerClicksScissors()
        }
    }
}
function displayScore() {
    let playerScoreDisplay = document.querySelector('.score-player')
    if (playerScoreDisplay) {
        playerScoreDisplay.innerHTML = `<h4>Player score: ${playerScore}</h4>`
    }
    let computerScoreDisplay = document.querySelector('.score-computer')
    if (computerScoreDisplay) {
        computerScoreDisplay.innerHTML = `<h4>Computer score: ${computerScore}</h4>`
    }
}
function showResult(playerButton, computerButton, winner) {
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
    }, 2000)
}
function endGame(winner) {
    let gameWinner = winner
    let gameResultDialog = document.createElement('div')
    gameResultDialog.classList.add('game-result-dialog')
    gameResultDialog.innerHTML = `
    <h2>GAME OVER</h2>
    <h3>${gameWinner} won!</h3>
    <h4>Final Score:</h4>
    <p>Player Score: ${playerScore}</p>
    <p>Computer Score: ${computerScore}</p>

    `
    let mainContainer = document.querySelector('.main-container')
    if (mainContainer) { 
        mainContainer.appendChild(gameResultDialog)
    }
    setTimeout(() => {
        document.addEventListener('click', e => {
            if (!(gameResultDialog.contains(e.target))) {
                gameResultDialog.remove()
            }
        })
    }, 100)
}
function checkGameScore() {
    let winner = null
    if (playerScore >= winningScore) {
        winner = 'player'
    }
    if (computerScore >= winningScore) {
        winner = 'computer'
    }
    if (!winner) {
        localStorage.setItem('gameScore', 'test')
    } else {
        return endGame(winner)
    }
}
function resetGame() {
    playerScore = 0
    computerScore = 0
    gameOver = false
    displayScore()
}
function addEventListeners() {
    let playerChoicesContainer = document.querySelector('.player-choices-container')
    if (playerChoicesContainer) {
        playerChoicesContainer.addEventListener('click', handlePlayerMove)
    }
    let resetGameButton = document.querySelector('.reset-container')
    if (resetGame) {
        resetGameButton.addEventListener('click', resetGame)
    }
}
function displayWinningScore() {
    let winningScoreDisplay = document.querySelector('.score-container span')
    if (winningScoreDisplay) {
        winningScoreDisplay.innerText = winningScore
    }
}
function initialize() {
    addEventListeners()
    displayWinningScore()
}
initialize()