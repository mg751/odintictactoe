const gameBoard = {
  array: ["X", "O", "X", "O", "X", "O", "O", "X", "O"],
  display: document.querySelector(".game-display"),
};

const gameFlow = {
  display: document.querySelector(".game-display"),
  array: [],
  turn: 1,
  counter: function () {
    return this.turn++;
  },
  render: function () {
    for (let i = 0; i < 9; i++) {
      let div = document.createElement("div");
      let p = document.createElement("p");
      div.appendChild(p);
      div.addEventListener("click", () => {
        if (this.turn % 2 !== 0 && p.innerText == "") {
          p.innerText = "X";
          this.array.push(p.innerText);
          this.counter();
        } else if (this.turn % 2 == 0 && p.innerText == "") {
          p.innerText = "O";
          this.array.push(p.innerText);
          this.counter();
        } else {
          return;
        }
      });
      this.display.appendChild(div);
    }
  },
};

const PlayerFactory = (name) => {
  return { name };
};
