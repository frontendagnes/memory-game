document.addEventListener("DOMContentLoaded", () => {
  const boardItems = [
    "red",
    "yellow",
    "green",
    "purple",
    "orange",
    "blue",
    "red",
    "yellow",
    "green",
    "purple",
    "orange",
    "blue",
  ];

  const items = document.querySelectorAll(".board div");
  const win = document.querySelector(".win");
  const reset = document.querySelector(".reset-js");
  const score = document.querySelector(".score");
  let boardId = [];
  let boardField = [];
  let fieldsWon = [];

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
      console.log("klikałeś w to pole");
      items[idOne].style.backgroundColor = "#7979e9cb";
      items[idTwo].style.backgroundColor = "#7979e9cb";
    } else if (boardField[0] === boardField[1]) {
      // trafienie
      console.log("Trafienie");
      items[idOne].style.backgroundColor = "white";
      items[idTwo].style.backgroundColor = "white";
      items[idOne].removeEventListener("click", flipCard);
      items[idTwo].removeEventListener("click", flipCard);
      fieldsWon.push(boardField);
      score.textContent = `Liczba punktów: ${fieldsWon.length}`;
    } else {
      // brak trafienia
      console.log("Pudło");
      items[idOne].style.backgroundColor = "#7979e9cb";
      items[idTwo].style.backgroundColor = "#7979e9cb";
    }

    if (boardField.length === 2) {
      boardField = [];
    }
    if (boardId.length === 2) {
      boardId = [];
    }

    // sparawdzmy czy gra została skończona
    if (boardItems.length / 2 === fieldsWon.length) {
      console.log("you win");
      win.textContent = "You win";
    }
  };

  // obrót pola
  function flipCard() {
    const indexField = this.getAttribute("data-id");
    const backgroundField = boardItems[indexField];

    boardField.push(backgroundField);
    boardId.push(indexField);

    items[indexField].style.backgroundColor = boardItems[indexField];

    if (boardId.length === 2) {
      setTimeout(() => matchingFields(indexField), 1500);
    }
  }

  function resetGame() {
    boardItems.sort(() => 0.5 - Math.random());
    console.log(boardItems);
    boardId = [];
    boardField = [];
    fieldsWon = [];
    win.textContent = "";
    score.textContent = "";
    setBoard();
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", flipCard);
      items[i].style.backgroundColor = "#7979e9cb";
    }
  }

  resetGame();
  // reset ustawień gry
  reset.addEventListener("click", resetGame);
});
