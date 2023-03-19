const gameBoard = {
  array: [],
  display: document.querySelector(".game-display"),
  gameStatus: "ongoing",
  playerOne: "",
  playerTwo: "",
  init: function () {
    let btn = document.getElementById("start-btn");
    btn.addEventListener("click", () => {
      let p1 = document.getElementById("p1").value;
      let p2 = document.getElementById("p2").value;
      this.playerOne = p1;
      this.playerTwo = p2;
      let playerInputs = document.querySelector(".player-inputs");
      playerInputs.remove();
      this.display.classList.remove("flex");
      this.display.classList.add("grid");
      gameFlow.render();
    });
  },
};

const gameFlow = {
  display: document.querySelector(".game-display"),
  turn: 1,
  counter: function () {
    return this.turn++;
  },
  checkWinner: function () {
    let sq1 = document.getElementById("sq1").firstChild.innerText;
    let sq2 = document.getElementById("sq2").firstChild.innerText;
    let sq3 = document.getElementById("sq3").firstChild.innerText;
    let sq4 = document.getElementById("sq4").firstChild.innerText;
    let sq5 = document.getElementById("sq5").firstChild.innerText;
    let sq6 = document.getElementById("sq6").firstChild.innerText;
    let sq7 = document.getElementById("sq7").firstChild.innerText;
    let sq8 = document.getElementById("sq8").firstChild.innerText;
    let sq0 = document.getElementById("sq0").firstChild.innerText;

    // win conditions
    if (
      (sq0 === sq1 && sq0 === sq2 && sq0 !== "") || // horizontal
      (sq3 === sq4 && sq3 === sq5 && sq3 !== "") || // horizontal
      (sq6 === sq7 && sq6 === sq8 && sq6 !== "") || // horizontal
      (sq0 === sq3 && sq0 === sq6 && sq0 !== "") || // vert
      (sq1 === sq4 && sq1 === sq7 && sq1 !== "") || // vert
      (sq2 === sq5 && sq2 === sq8 && sq2 !== "") || // vert
      (sq0 === sq4 && sq0 === sq8 && sq0 !== "") || // cross
      (sq2 === sq4 && sq2 === sq6 && sq2 !== "") // cross
    ) {
      gameBoard.display.classList.add("game-finished");
      gameBoard.gameStatus = "finished";
    }
  },
  render: function () {
    let playerTurnUI = document.querySelector("h3");
    playerTurnUI.innerText = gameBoard.playerOne;

    for (let i = 0; i < 9; i++) {
      let div = document.createElement("div");
      div.id = "sq" + [i];
      let p = document.createElement("p");
      div.appendChild(p);
      div.addEventListener("click", () => {
        if (this.turn % 2 !== 0 && p.innerText == "") {
          p.innerText = "X";
          div.classList.add("x-selected");
          gameBoard.array.push(p.innerText + `${div.classList}`);
          this.counter();
          this.checkWinner();
          if (gameBoard.gameStatus === "finished") {
            playerTurnUI.innerText = `Congrats player ${gameBoard.playerOne}`;
            let selectedX = document.getElementsByClassName("x-selected");
            for (item of selectedX) {
              item.classList.add("winner");
            }
          } else {
            playerTurnUI.innerText = gameBoard.playerTwo;
          }
        } else if (this.turn % 2 == 0 && p.innerText == "") {
          p.innerText = "O";
          div.classList.add("o-selected");
          gameBoard.array.push(p.innerText + `${div.classList}`);
          this.counter();
          this.checkWinner();
          if (gameBoard.gameStatus === "finished") {
            playerTurnUI.innerText = `Congrats player ${gameBoard.playerTwo}`;
            let selectedO = document.getElementsByClassName("o-selected");
            for (item of selectedO) {
              item.classList.add("winner");
            }
          } else {
            playerTurnUI.innerText = gameBoard.playerOne;
          }
        } else {
          return;
        }
      });
      this.display.appendChild(div);
    }
  },
};

gameBoard.init();
