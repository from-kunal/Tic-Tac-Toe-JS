const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMarker = (index, marker) => {
    if (board[index] !== "") return false;
    board[index] = marker;
    return true;
  };

  const resetBoard = () => {
    board.fill("");
  };

  return { getBoard, placeMarker, resetBoard };
})();

const GameController = ((
  playerOne = "Player One",
  playerTwo = "Player Two",
) => {
  const Player = [
    {
      name: playerOne,
      marker: "X",
    },
    {
      name: playerTwo,
      marker: "O",
    },
  ];

  let currentPlayer = Player[0];

  const switchPlayer = () => {
    currentPlayer = currentPlayer === Player[0] ? Player[1] : Player[0];
  };

  const getCurrentPlayer = () => currentPlayer;
  let gameOver = false;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board, marker) => {
    return winningCombos.some((combination) => {
      return combination.every((index) => board[index] === marker);
    });
  };

  const isDraw = (board) => {
    return board.every((mark) => mark !== "");
  };

  const playGame = (index) => {
    const success = GameBoard.placeMarker(index, currentPlayer.marker);
    if (!success) return;

    if (checkWinner(GameBoard.getBoard(), currentPlayer.marker)) {
      console.log(`${currentPlayer.name} "${currentPlayer.marker} wins`);
      gameOver = true;
    } else if (isDraw(GameBoard.getBoard())) {
      console.log("It's a draw");
      gameOver = true;
    }
    switchPlayer();
  };

  const restartGame = () => {
    GameBoard.resetBoard();
    currentPlayer = Player[0];
    gameOver = false;
  };

  return { getCurrentPlayer, playGame, restartGame };
})();

GameController.playGame(0);
GameController.playGame(4);

GameController.playGame(1);
GameController.playGame(8);

GameController.playGame(2);
GameController.playGame(5);
