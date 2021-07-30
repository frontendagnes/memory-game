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
  let boardId = []
  let boardField = []
  // tło planszy przed rozpoczęciem gry
  // const setColor = () => {
  //   for (let i = 0; i < items.length; i++) {
  //     items[i].classList.add("boardBackground")
  //   }
  // };
  // setColor()

  // sprawdzenie dopasowania pól
  const matchingFields = (index) => {
    const indexField = items[index].getAttribute("data-id")
    const backgroundField = boardItems[indexField]
    console.log(indexField)
    console.log(backgroundField)

      boardId.push(indexField)
      boardField.push(backgroundField)
      // console.log("id>>", boardId)

    if(boardId.length > 2){
      boardId.forEach(item => {
        items[item].style.backgroundColor = "#7979e9cb"
        boardId = []
      })
    }

    if(boardField.length >= boardItems.length){
      console.log("Koniec Pól") 
      boardField = []     
    }
        console.log("id>>", boardId)
        console.log("field>>", boardField)
  }

  // obrót pola
  const flipCard = (index) => {
    items[index].style.backgroundColor = boardItems[index]
    items[index].setAttribute("data-id", index)
    
    matchingFields(index)
  }

  // nasłuch na kliknięcie w pole
  for(let i = 0; i < items.length; i++){
    items[i].addEventListener("click", () => flipCard(i))
  }
});
