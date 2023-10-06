function Gameboard() {
    const currentBoard = [];

    for (let i = 0; i < 9; i++) {
        currentBoard[i] = Cell();
    }

    const _displayMove = (cell, marker) => {
        cell.children[0].textContent = marker;
    }

    const getIndicies = (marker) => {
        let indicies = [];
        currentBoard.forEach((cell, index) => {
            if (cell.getValue() === marker) {
                indicies.push(index);
            }
        });
        return indicies;
    }

    const applyMove = (cell, cellNum, currentPlayer) => {
        currentBoard[cellNum].setValue(currentPlayer.marker);
        _displayMove(cell, currentPlayer.marker);
    }

    const resetBoard = () => {
        currentBoard.forEach((cell) => {
            cell.setValue("");
        });

        gameCells.forEach((cell) => {
            cell.children[0].textContent = "";
        });
    }

    return { applyMove, currentBoard, getIndicies, resetBoard }
}

function Cell() {
    let _currentValue = '';

    const getValue = () => {
        return _currentValue;
    }

    const setValue = (newVal) => {
        _currentValue = newVal;
    }

    return { getValue, setValue }
}

const Game = (() => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const infoHeading = document.querySelector("#game-info-heading");
    const date = new Date();
    const welcomeMessage = "Welcome! Click a cell to begin playing.";
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // USED PURELY FOR THE 5th QUOTE
    const moveQuotes = [
        "That's uhh... haha, that's an interesting move for sure.",
        "Great move, I bet your opponent has absolutely soiled themselves by now.",
        "That's your move? You do know you have to play to win right?",
        "WHOA. Absolutely INSANE move. Never would have seen that coming",
        `You know, I envy you: playing Tic Tac Toe on a ${weekdays[date.getDate()]}. I'm just a computer, I will never know the touch of a human.`,
        "Guys I hate to admit this since I'm literally the computer controlling this but this game is boring as fuck.",
        "Another fantastic move, you could be world champion material you know (im being totally sarcastic).",
        "Guys I got places to be can we hurry this up?"
    ]
    const winQuotes = [
        "I bet you feel really satisfied right now. Relish this moment. It WILL be fleeting. Play again?",
        "I hope this doesn't change your friendship, I know it changed mine... play again?",
        "Incredible... simply incredible. I've never seen someone manage to accidentally win a game of Tic Tac Toe before. Astounding. Play again?",
        "Yaaaaaaaaaaaaaayyyyy, god I wish I was put into a AI sex toy and not a Tic Tac Toe rip off. Play Again?",
        "YES YES YES!!! YEEESS!!! FUCK YESSSS!!!! IM SO FUCKING HAPPY RIGHT NOWWWWWW!!!! PLAY AGAIN??? OF COURSE YOU DO!!!"
    ]
    const tieQuotes = [
        "I hate to be the bearer of bad news, but you guys fucking suck at this game. Try again?",
        "hAHAHAHAHAHAHAH YOU TIED??!?!?! HAHAHAHAHAAHAHHAHAHA LMAO LMAO LMAO LMAO LMAO TRY AGAIN PLEASE",
        "Oooooo... yikes. Looks like you guys tied. I am so sorry (im not im being sarcastic again). Try again?"
    ]

    const board = Gameboard();

    const players = [
        {
            name: 'player1',
            marker: 'X'
        },
        {
            name: 'player2',
            marker: 'O'
        }
    ]
    let currentPlayer = players[0];

    // If this becomes true at all then the game has ended and no more moves should be allowed
    let hasGameEnded = false;

    // const _printInitialMessage = () => {
    //     console.log("Welcome! You are 'X', type call playRound on Game with your desired x and y position to play!");
    // }

    const _switchPlayerTurn = () => {
        currentPlayer = ((currentPlayer == players[0]) ? players[1] : players[0]);
    }

    const _checkForWin = () => {
        // get indices of each marker for current player, 'X' or 'O'
        let playerMoveIndicies = board.getIndicies(currentPlayer.marker);

        // Iterate through each win condition, checking whether or not the moves the player has made contain all of those indicies.
        // If one does, then that means the player has won.
        let hasWon = winningConditions.some((condition) => {
            return condition.every((value) => {
                return playerMoveIndicies.indexOf(value) !== -1;
            });
        });

        if (!hasWon) {
            // If they haven't won AND there are 4 indicies in the array, then that means a tie has been reached as that is the max moves any player can make
            if (playerMoveIndicies.length === 5) {
                infoHeading.textContent = tieQuotes[Math.floor(Math.random() * tieQuotes.length)];
                hasGameEnded = true;
                return;
            } 
            // Otherwise, no tie has been reached and we can continue the game
            else {
                infoHeading.textContent = moveQuotes[Math.floor(Math.random() * moveQuotes.length)];
                return;
            }
        }

        // If they have won, display win message
        infoHeading.textContent = winQuotes[Math.floor(Math.random() * winQuotes.length)];
        hasGameEnded = true;
    }

    const initializeGame = () => {
        infoHeading.textContent = welcomeMessage;
    }

    const playRound = (cell, cellId) => {
        if (!hasGameEnded) {
            board.applyMove(cell, cellId, currentPlayer);
            _checkForWin();
            _switchPlayerTurn();
        }
    }

    const reset = () => {
        board.resetBoard();
        initializeGame();
        hasGameEnded = false;
    }

    initializeGame();

    return { playRound, board, reset }
})();

const gameCells = document.querySelectorAll(".game-cell");
gameCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        console.log(e.target);
        Game.playRound(e.target, e.target.dataset.id);
    })
})

const resetButton = document.querySelector("svg");
resetButton.addEventListener("click", () => {
    Game.reset();
})
