function Gameboard() {
    const currentBoard = [];

    for (let i = 0; i < 9; i++) {
        currentBoard[i] = Cell();
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

    const applyMove = (cellNum, currentPlayer) => {
        currentBoard[cellNum - 1].setValue(currentPlayer.marker);
    }

    return { applyMove, currentBoard, getIndicies }
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

    const _printInitialMessage = () => {
        console.log("Welcome! You are 'X', type call playRound on Game with your desired x and y position to play!");
    }

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
            return;
        }

        console.log("Holy fuck you did it oh my god thats so awesome wow great job (im being sarcastic)");
    }

    const playRound = (cellNum) => {
        board.applyMove(cellNum, currentPlayer);
        _checkForWin();
        _switchPlayerTurn();
    }

    _printInitialMessage();

    return { playRound, board }
})();

/*
    Game creates Gameboard object
    In each position of internal board array, create a new Cell
    Each cell must hold its current value, ('', 'X', or 'O'), and two methods to get and set its value
    Gameboard object initializes board
    Game prints initial message
    player does Game.playRound(cellNum)
    Game passes cellNum and the currentPlayer to the Gameboard() object with applyMove() for processing
    Game switches player turn
    Gameboard updates value of cell at position cellNum - 1 in array (since the player will be going from 1 - 9)
*/