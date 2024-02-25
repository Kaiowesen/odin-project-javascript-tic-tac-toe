
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
    const playerX = Player("X");
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
    const getNextPlayerSymbol = () => nextPlayer.symbol
    const getCurrentPlayerSymbol = () => currentPlayer.getPlayerSymbol()

    return { getTurnCount, setTurnCount, setCurrentPlayer, setNextPlayer, getNextPlayerSymbol, getNextPlayer, getCurrentPlayerSymbol, getCurrentPlayerSymbol, getCurrentPlayer }

})()

const domControl = (function () {
    const messageDiv = document.querySelector(".message-grid");
    const h2 = document.createElement("h2");

    const markPlayerSymbol = (row, index) => {
        const h1 = document.createElement("h1");
        const selectedCell = document.getElementById(row + "-" + index)
        h1.textContent = playerControl.getCurrentPlayerSymbol()
        selectedCell.style.display = "grid";
        h1.style.fontSize = "48px"
        h1.style.placeSelf = "center"
        selectedCell.appendChild(h1)
    }
    const getCurrentPlayer = () => {
        playerControl.getTurnCount() % 2 == 0 ? "player Y" : "player X"
    }
    const displayPlayerTurnMessage = () => {
        clearMessageDiv()
        h2.textContent = `It's player ${playerControl.getTurnCount() % 2 == 0 ? "X" : "Y"}'s turn`
        messageDiv.appendChild(h2)
    }
    const clearMessageDiv = () => {
        messageDiv.firstElementChild.remove();
    }

    const displayWinnerMessage = () => {
        h2.style.fontSize = "48px"
        h2.textContent = `Game over! player ${playerControl.getCurrentPlayerSymbol()} won. Refresh page to play again`
        messageDiv.appendChild(h2)
    }
    return { markPlayerSymbol, displayPlayerTurnMessage, displayWinnerMessage }

})()
const playRound = (row, index) => {

    if (gameControl.getGameOver() !== true) {
        playerControl.setCurrentPlayer();
        gameControl.setSelectedRowAndIndex(row, index);
        domControl.markPlayerSymbol(row, index)
        gameControl.setPlayerSymbolOnBoard();
        playerControl.setTurnCount()
        domControl.displayPlayerTurnMessage()
        playerControl.setNextPlayer();
        if (playerControl.getTurnCount() > 4) {
            checkForGameWinner(playerControl.getCurrentPlayerSymbol())
        }
    }
}
const checkForGameWinner = (playerSymbol) => {
    for (let i = 1; i < 4; i++) {
        const rowWinner = gameBoard.board["row" + i][0] == playerSymbol && gameBoard.board["row" + i][1] == playerSymbol && gameBoard.board["row" + i][2] == playerSymbol
        const columnWinner = gameBoard.board.row1[parseInt(i - 1)] == playerSymbol && gameBoard.board.row2[parseInt(i - 1)] == playerSymbol && gameBoard.board.row3[parseInt(i - 1)] == playerSymbol
        const diagonalTopLeftRightWinner = gameBoard.board.row1[0] == playerSymbol && gameBoard.board.row2[1] == playerSymbol && gameBoard.board.row3[2] == playerSymbol
        const diagonalTopRightLeftWinner = gameBoard.board.row1[2] == playerSymbol && gameBoard.board.row2[1] == playerSymbol && gameBoard.board.row3[0] == playerSymbol

        if (rowWinner || columnWinner || diagonalTopLeftRightWinner || diagonalTopRightLeftWinner) {
            domControl.displayWinnerMessage();
            gameControl.setGameOver()
            return;
        }
    }
};

