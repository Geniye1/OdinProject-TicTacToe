function Gameboard() {
    const currentBoard = [];

    for (let i = 0; i < 9; i++) {
        currentBoard[i] = Cell();
    }

    const applyMove = (cellNum, currentPlayer) => {
        currentBoard[cellNum - 1].setValue(currentPlayer.marker);
    }

    return { applyMove, currentBoard }
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

    const playRound = (cellNum) => {
        board.applyMove(cellNum, currentPlayer);
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