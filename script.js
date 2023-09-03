const gameBoard = (()=>{

    // create empty board
    let board = [];
    for (let i=0;i<9;i++){
        board.push("")
    }
    
    // display board as 3x3 squares 
    let displayBoard = document.querySelector(".game-board");
    board.forEach((item,index)=>{
        const square = document.createElement("div");
        square.classList.add("square")
        displayBoard.appendChild(square)

        // add event listener
        square.addEventListener("click",()=>{
            square.classList.add();
            square.textContent="X"
            board[index]="X"
            console.log(board)
        })

    
    })
})()

