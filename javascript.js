
const gameBoard = (function () {
    board = {
        row1: [, ,],
        row2: [, ,],
        row3: [, ,]
    }
    const completeBoard = [...board.row1, board.row2, board.row3]
    return { board, completeBoard }
}())

const Player = function (symbol) {
    const playerSymbol = symbol;
    let playerScore = 0;
    const getPlayerScore = () => playerScore;
    const increasePlayerScore = () => playerScore++
    const getPlayerSymbol = () => playerSymbol
    return { getPlayerSymbol, getPlayerScore, increasePlayerScore }
};


/* need to control the flow of the game. 
Who's turn it is
function to check score.
check for winner
reset gameboard*/

const gameControl = (function () {

    let selectedRow = gameBoard.board.row1 || gameBoard.board.row2 || gameBoard.board.row3;
    let selectedIndex = 0 || 1 || 2;
    let gameOver = false;


    const setPlayerSymbolOnBoard = () => selectedRow[selectedIndex] = playerControl.getCurrentPlayerSymbol()
    const setSelectedRowAndIndex = (row, index) => { selectedRow = gameBoard.board["row" + row]; selectedIndex = index; }
    const setGameOver = () => gameOver = true;
    const getGameOver = () => gameOver;
    return { getGameOver, setPlayerSymbolOnBoard, setSelectedRowAndIndex, setGameOver }
})();
const playerControl = (function () {
    const playerX = Player("x");
    const playerY = Player("Y");

    let nextPlayer = playerX;
    let currentPlayer;
    let turnCount = 0;

    const setTurnCount = () => turnCount++
    const getTurnCount = () => turnCount
    const setCurrentPlayer = () => currentPlayer = nextPlayer;
    const getCurrentPlayer = () => currentPlayer;
    const setNextPlayer = () => {
        if (currentPlayer == playerX) {
            return nextPlayer = playerY
        } else {
            return nextPlayer = playerX
        }
    }
    const getNextPlayer = () => nextPlayer;
    const getCurrentPlayerSymbol = () => currentPlayer.getPlayerSymbol()

    return { getTurnCount, setTurnCount, setCurrentPlayer, setNextPlayer, getNextPlayer, getCurrentPlayerSymbol, getCurrentPlayerSymbol, getCurrentPlayer }

})()
const playGame = () => {
    console.log(gameControl.getGameOver() + "game over")
    if (gameControl.getGameOver() !== true) {
        playerControl.setCurrentPlayer();
        playerControl.setNextPlayer();

        let row = prompt("enter row")
        let index = prompt("enter indez")
        gameControl.setSelectedRowAndIndex(row, index);
        gameControl.setPlayerSymbolOnBoard();
        showBoard()
        playerControl.setTurnCount()
        console.log(playerControl.getTurnCount())
        if (playerControl.getTurnCount() > 4) {
            console.log("checking winner")
            checkForGameWinner(playerControl.getCurrentPlayerSymbol())
        }
        playGame();
    }

}
const checkForGameWinner = (playerSymbol) => {
    for (let i = 1; i < 4; i++) {
        console.log("i" + i)
        const rowWinner = gameBoard.board["row" + i][0] == playerSymbol && gameBoard.board["row" + i][1] == playerSymbol && gameBoard.board["row" + i][2] == playerSymbol
        const columnWinner = gameBoard.board.row1[parseInt(i - 1)] == playerSymbol && gameBoard.board.row2[parseInt(i - 1)] == playerSymbol && gameBoard.board.row3[parseInt(i - 1)] == playerSymbol
        const diagonalTopLeftRightWinner = gameBoard.board.row1[0] == playerSymbol && gameBoard.board.row2[1] == playerSymbol && gameBoard.board.row3[2] == playerSymbol
        const diagonalTopRightLeftWinner = gameBoard.board.row1[2] == playerSymbol && gameBoard.board.row2[1] == playerSymbol && gameBoard.board.row3[0] == playerSymbol

        if (rowWinner || columnWinner || diagonalTopLeftRightWinner || diagonalTopRightLeftWinner) {
            console.log("we have a winner")
            gameControl.setGameOver()
            return true
        }

    }
};
const showBoard = () => {
    console.log(` ${gameBoard.board.row1} \n ${gameBoard.board.row2}  \n ${gameBoard.board.row3}`);
}

// playerControl.setCurrentPlayer()
// playerControl.getCurrentPlayer()
// console.log(playerControl.getCurrentPlayerSymbol())
// console.log("before")
// playerControl.setNextPlayer()
// console.log(playerControl.getNextPlayer());
// playerControl.setCurrentPlayer()

// console.log("after " + playerControl.getCurrentPlayerSymbol())


// playerControl.setNextPlayer()

// console.log("after" + console.log(playerControl.getCurrentPlayer()))

playGame();