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

  boardItems.sort(() => 0.5 - Math.random());
  console.log(boardItems);
  const items = document.querySelectorAll(".board div");
  const win = document.querySelector(".win");
  let boardId = [];
  let boardField = [];
  let fieldsWon = [];

  // dodanie atryputu data-id do planszy
  const setBoard = () => {
    for (let i = 0; i < items.length; i++) {
      items[i].setAttribute("data-id", i);
    }
  };
  setBoard();

  // sprawdzenie dopasowania pól
  const matchingFields = (index) => {
    const idOne = boardId[0];
    const idTwo = boardId[1];
    console.log("i>>", boardId);
    console.log(boardField);

    if (idOne == idTwo) { // sprawdzamy czy klinelismy w to samo pole
      console.log("klikałeś w to pole");
      items[idOne].style.backgroundColor = "#7979e9cb";
      items[idTwo].style.backgroundColor = "#7979e9cb";
    } else if (boardField[0] === boardField[1]) { // trafienie
      console.log("Trafienie");
      items[idOne].style.backgroundColor = "white";
      items[idTwo].style.backgroundColor = "white";
      items[idOne].removeEventListener("click", () => flipCard(index));
      items[idTwo].removeEventListener("click", () => flipCard(index));
      fieldsWon.push(boardField);
    } else { // brak trafienia
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
  const flipCard = (index) => {
    const backgroundField = boardItems[index];
    const indexField = items[index].getAttribute("data-id");

    boardField.push(backgroundField);
    boardId.push(indexField);

    items[index].style.backgroundColor = boardItems[index];

    if (boardId.length === 2) {
      setTimeout(() => matchingFields(index), 1500);
    }
  };

  // nasłuch na kliknięcie w pole
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", () => flipCard(i));
  }
});
