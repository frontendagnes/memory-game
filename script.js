document.addEventListener("DOMContentLoaded", () => {
  // const boardItems = [
  //   "red",
  //   "yellow",
  //   "green",
  //   "purple",
  //   "orange",
  //   "blue",
  //   "red",
  //   "yellow",
  //   "green",
  //   "purple",
  //   "orange",
  //   "blue",
  // ];
  const boardItems = [
    `url('./images/emoji1.png')`,
    `url('./images/emoji2.webp')`,
    `url('./images/emoji3.png')`,
    `url('./images/emoji4.png')`,
    `url('./images/emoji5.webp')`,
    `url('./images/emoji6.png')`,
    `url('./images/emoji1.png')`,
    `url('./images/emoji2.webp')`,
    `url('./images/emoji3.png')`,
    `url('./images/emoji4.png')`,
    `url('./images/emoji5.webp')`,
    `url('./images/emoji6.png')`,
  ];
  const items = document.querySelectorAll(".board div");
  const win = document.querySelector(".win");
  const reset = document.querySelector(".reset-js");
  const score = document.querySelector(".score");
  let boardId = [];
  let boardField = [];
  let fieldsWon = [];
items.forEach(item => {
  item.addEventListener("click", function(){
    item.style.background = "./images/emoji1.png"
  })
})
  // dodanie atrybutu data-id do planszy
  const setBoard = () => {
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute("data-id", i);
    }
  };
  // sprawdzenie dopasowania pól
  const matchingFields = () => {
    const idOne = boardId[0];
    const idTwo = boardId[1];

    if (idOne == idTwo) {
      // sprawdzamy czy klinelismy w to samo pole
      items[idOne].style.backgroundColor = "#7979e9cb";
      items[idTwo].style.backgroundColor = "#7979e9cb";
    } else if (boardField[0] === boardField[1]) {
      // trafienie
      items[idOne].style.backgroundColor = "white";
      items[idTwo].style.backgroundColor = "white";
      items[idOne].removeEventListener("click", flipCard);
      items[idTwo].removeEventListener("click", flipCard);
      items[idOne].style.backgroundImage = `none`;
      items[idTwo].style.backgroundImage = `none`;
      fieldsWon.push(boardField);
      score.textContent = `Score: ${fieldsWon.length}`;
    } else {
      // brak trafienia

      items[idOne].style.backgroundColor = "#7979e9cb";
      items[idTwo].style.backgroundColor = "#7979e9cb";
      items[idOne].style.backgroundImage = `none`;
      items[idTwo].style.backgroundImage = `none`;
    }

    if (boardField.length === 2) {
      boardField = [];
    }
    if (boardId.length === 2) {
      boardId = [];
    }

    // sparawdzmy czy gra została skończona
    if (boardItems.length / 2 === fieldsWon.length) {
      win.textContent = `Cool! You found all the pairs 😁` ;
    }
  };

  // obrót pola
  function flipCard() {
    const indexField = this.getAttribute("data-id");
    const backgroundField = boardItems[indexField];

    boardField.push(backgroundField);
    boardId.push(indexField);

    items[indexField].style.backgroundImage = boardItems[indexField];

    if (boardId.length === 2) {
      setTimeout(matchingFields, 1000);
    }
  }

  function startGame() {
    boardItems.sort(() => 0.5 - Math.random());
    boardId = [];
    boardField = [];
    fieldsWon = [];
    win.textContent = "";
    score.textContent = "Score: 0";
    setBoard();
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", flipCard);
      items[i].style.backgroundColor = "#7979e9cb";
      items[i].style.backgroundImage = `none`;
    }
  }

  startGame();
  // reset ustawień gry
  reset.addEventListener("click", startGame);
});
