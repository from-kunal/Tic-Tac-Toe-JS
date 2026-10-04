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

  const setNames = (one = Player[0].name, two = Player[1].name) => {
    Player[0].name = one;
    Player[1].name = two;
  };

  let currentPlayer = Player[0];

  const switchPlayer = () => {
    status.text = `${currentPlayer.marker} : ${currentPlayer.name}'s turn`;
    return (currentPlayer =
      currentPlayer === Player[0] ? Player[1] : Player[0]);
  };

  let status = {
    started: false,
    gameOver: false,
    text: "Press red button to start the game",
  };

  const getStatus = () => status;

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
    if (!status.started) {
      status.text = "Press red button to start the game";
      return;
    }

    if (status.gameOver) {
      status.text = "Game Over, Restart to play again";
      return;
    }

    const success = GameBoard.placeMarker(index, currentPlayer.marker);
    if (!success) return;

    if (checkWinner(GameBoard.getBoard(), currentPlayer.marker)) {
      status.text = `${currentPlayer.name} "${currentPlayer.marker}" wins`;
      status.gameOver = true;
      return;
    } else if (isDraw(GameBoard.getBoard())) {
      status.text = "It's a draw";
      status.gameOver = true;
      return;
    }
    switchPlayer();
  };

  const restartGame = () => {
    GameBoard.resetBoard();
    currentPlayer = Player[0];
    status.gameOver = false;
    status.started = true;
    status.text = `${currentPlayer.marker} : ${currentPlayer.name}'s turn`;
  };

  return { playGame, restartGame, getStatus, setNames };
})();

const ScreenController = (() => {
  const boardDiv = document.querySelector(".board");
  const result = document.querySelector(".result");
  const startBtn = document.querySelector("#start-game");
  const reStartBtn = document.querySelector("#restart-game");

  const updateScreen = () => {
    // update board from dom & get changing status
    const board = GameBoard.getBoard();
    const status = GameController.getStatus();

    // display players turn
    result.textContent = status.text;

    const cells = document.querySelectorAll(".cell");
    // put each value in each cell again
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const clickHandlerBoard = (event) => {
    // grab the clicked cell to put marker
    const cell = event.target.closest(".cell");
    if (!cell) return;

    // if game is over or hasn't started
    if (GameController.getStatus().gameOver) {
      result.textContent = GameController.getStatus().text;
      return;
    }

    GameController.playGame(Number(cell.dataset.index));
    updateScreen();
  };

  const startGame = () => {
    GameController.setNames(
      document.querySelector("#player-one").value.trim(),
      document.querySelector("#player-two").value.trim(),
    );
    GameController.restartGame();
    updateScreen();
  };

  boardDiv.addEventListener("click", clickHandlerBoard);
  startBtn.addEventListener("click", startGame);
  reStartBtn.addEventListener("click", startGame);
})();
