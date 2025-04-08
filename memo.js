const memoryGame = {
  tileCount: 16,
  tileOnRow: 4,
  divBoard: null,
  divScore: null,
  divEnd: null,
  divMessage: null,
  btnStart: null,
  divEnd: null,
  btnRestart: null,
  tiles: [],
  tilesChecked: [],
  moveCount: 0,
  tilesImg: [
    "flagPL.png",
    "flagIT.png",
    "flagGR.png",
    "flagFR.png",
    "flagSD.png",
    "flagDE.png",
    "flagCZ.png",
    "flagSP.png",
  ],

  canGet: true,
  tilePairs: 0,

  tileClick(element) {
    const tile = element.currentTarget;

    if (this.canGet) {
      if (
        !this.tilesChecked[0] ||
        this.tilesChecked[0].dataset.index !== tile.dataset.index
      ) {
        const front = tile.querySelector(".front");
        front.style.backgroundImage = `url(${
          this.tilesImg[tile.dataset.cardType]
        })`;

        tile.classList.add("flip");
        this.tilesChecked.push(tile);
      }

      if (this.tilesChecked.length === 2) {
        this.canGet = false;

        if (
          this.tilesChecked[0].dataset.cardType ===
          this.tilesChecked[1].dataset.cardType
        ) {
          setTimeout(() => this.deleteTiles(), 500);
        } else {
          setTimeout(() => this.resetTiles(), 500);
        }

        this.moveCount++;
        this.divScore.innerText = this.moveCount;
      }
    }
  },

  startGame() {
    this.divBoard = document.querySelector(".game-board");
    this.divBoard.innerHTML = "";

    this.divScore = document.querySelector(".game-score");
    this.divScore.innerHTML = "";

    this.tiles = [];
    this.tilesChecked = [];
    this.canGet = true;
    this.moveCount = 0;
    this.tilePairs = 0;

    this.btnStart = document.querySelector(".game-start");

    this.divEnd = document.querySelector(".game-end");
    this.divMessage = document.querySelector(".game-message");
    this.btnRestart = document.querySelector(".game-restart");

    this.divEnd.style.display = "none";
    this.divScore.classList.remove("hidden");
    this.btnStart.classList.add("hidden");
    this.divScore.innerText = "0";

    for (let i = 0; i < this.tileCount; i++) {
      this.tiles.push(Math.floor(i / 2));
    }

    for (let i = this.tileCount - 1; i > 0; i--) {
      const swap = Math.floor(Math.random() * i);
      const tmp = this.tiles[i];
      this.tiles[i] = this.tiles[swap];
      this.tiles[swap] = tmp;
    }

    for (let i = 0; i < this.tileCount; i++) {
      const tile = document.createElement("div");
      tile.classList.add("game-tile");

      const front = document.createElement("div");
      front.classList.add("front");
      tile.appendChild(front);

      const back = document.createElement("div");
      back.classList.add("back");
      tile.appendChild(back);

      this.divBoard.appendChild(tile);

      tile.dataset.cardType = this.tiles[i];
      tile.dataset.index = i;

      tile.addEventListener("click", (e) => this.tileClick(e));
    }
  },

  deleteTiles() {
    this.tilesChecked.forEach((el) => {
      const emptyDiv = document.createElement("div");
      el.after(emptyDiv);
      el.remove();
    });

    this.canGet = true;
    this.tilesChecked = [];

    this.tilePairs++;

    if (this.tilePairs >= this.tileCount / 2) {
      this.divMessage.innerText = `Gratulacje, odgadłeś karty w ${this.moveCount} ruchach!`;
      this.divEnd.style.display = "flex";
      this.divScore.classList.add("hidden");
      this.btnStart.classList.add("hidden");
    }
  },

  resetTiles() {
    this.tilesChecked.forEach((el) => el.classList.remove("flip"));
    this.tilesChecked = [];
    this.canGet = true;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".game-start");
  startBtn.addEventListener("click", () => memoryGame.startGame());

  const restartBtn = document.querySelector(".game-restart");
  restartBtn.addEventListener("click", () => memoryGame.startGame());
});
