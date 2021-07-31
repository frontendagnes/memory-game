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
  let boardId = [];
  let boardField = [];
  // tło planszy przed rozpoczęciem gry
  // const setColor = () => {
  //   for (let i = 0; i < items.length; i++) {
  //     items[i].classList.add("boardBackground")
  //   }
  // };
  // setColor()

  // sprawdzenie dopasowania pól
  const matchingFields = (index) => {
    const idOne = boardId[0];
    const idTwo = boardId[1];
    console.log("i>>", boardId);
    console.log(boardField);

    if (idOne == idTwo) {
      console.log("klikałeś w to pole");
      items[idOne].style.backgroundColor = "#7979e9cb";
      items[idTwo].style.backgroundColor = "#7979e9cb";
    }else if (boardField[0] === boardField[1]) {
      console.log("Trafienie");
      items[idOne].style.backgroundColor = "white";
      items[idTwo].style.backgroundColor = "white";
      items[idOne].removeEventListener("click", flipCard);
      items[idTwo].removeEventListener("click", flipCard);
    }else{
      console.log("Pudło");
      items[idOne].style.backgroundColor = "#7979e9cb";
      items[idTwo].style.backgroundColor = "#7979e9cb";
      items[idOne].removeEventListener("click", flipCard);
      items[idTwo].removeEventListener("click", flipCard);
    }

    if (boardField.length === 2) {
      boardField = [];
    }
    if (boardId.length === 2) {
      boardId = [];
    }
  };

  // obrót pola
  const flipCard = (index) => {
    const backgroundField = boardItems[index];
    const indexField = items[index].getAttribute("data-id");
    
    boardField.push(backgroundField);
    boardId.push(indexField);

    items[index].style.backgroundColor = boardItems[index];
    items[index].setAttribute("data-id", index);

    if(boardId.length === 2){
      matchingFields(index);
    }
    
  };

  // nasłuch na kliknięcie w pole
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", () => flipCard(i));
  }
});
