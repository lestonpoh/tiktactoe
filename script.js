const createPlayer = (name,marker)=>{
    return {name,marker}
}

const registerPlayer = (()=>{
    const form = document.querySelector("form");
    registerScreen = document.querySelector(".register-screen");
    gameScreen = document.querySelector(".game-screen");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        let playerOneName = document.querySelector("#playerOneName").value;
        let playerTwoName = document.querySelector("#playerTwoName").value;
        game.playerOne = createPlayer(playerOneName,"cross");
        game.playerTwo = createPlayer(playerTwoName,"circle");
        game.currentPlayer = game.playerOne

        registerScreen.style.display="none";
        gameScreen.style.display="block";

        game.resultDisplay.textContent = `${game.currentPlayer.name}'s turn!`

        form.reset();
    })
})()



const gameBoard = (()=>{

    // create empty board
    let board = [];
    for (let i=0;i<9;i++){
        board.push("")
    }

    const squares = document.querySelectorAll(".square");
    squares.forEach((square,index)=>{
        square.addEventListener("click",()=>{
            let img=document.createElement("img")
            img.src="images/"+game.currentPlayer.marker+".png"
            square.appendChild(img);
            square.style.pointerEvents="none";
            gameBoard.board[index]=game.currentPlayer.marker;
            
            game.checkWinner();
            game.squaresFilled+=1;

            if (game.winnerDeclared === false){
                if (game.squaresFilled<9){
                    game.nextPlayer();
        
                }else{
                    game.declareTie()
                    game.endGame()
                }
            }else{
                game.endGame()
            }
            
        })
    })

    const restartButton = document.querySelector(".restart")
    restartButton.addEventListener("click",()=>{
        game.resetGame()

        })

    const restartIcon = document.querySelector(".restart-icon")
    restartIcon.addEventListener("click",()=>{
        game.resetGame()
    
        })

    return {board}
})()

const game = (()=>{
    let squaresFilled = 0;
    let winnerDeclared = false

    const resultDisplay = document.querySelector(".result-display");
    const squares = document.querySelectorAll(".square");
    const restartButton = document.querySelector(".restart")

    function nextPlayer(){
        if (this.currentPlayer === this.playerOne){
            this.currentPlayer = this.playerTwo
        }else{
            this.currentPlayer = this.playerOne
        }
        this.resultDisplay.textContent = `${this.currentPlayer.name}'s turn!`
    }

    const winningCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    
    function checkWinner(){
        winningCondition.forEach((item)=>{
            if ((gameBoard.board[item[0]] === this.currentPlayer.marker)
                && (gameBoard.board[item[1]] === this.currentPlayer.marker)
                && (gameBoard.board[item[2]] === this.currentPlayer.marker)){
                    resultDisplay.textContent = `${this.currentPlayer.name} WIN!!`
                    this.winnerDeclared = true;
                }
        })

    }

    function declareTie(){
        resultDisplay.textContent="TIE"
    }

    

    function endGame(){   
        squares.forEach((square)=>{
            square.style.pointerEvents="none";
        })
        restartButton.classList.add("show-restart-button")
        
    }

    function resetGame(){
        gameBoard.board = [];
        for (let i=0;i<9;i++){
            gameBoard.board.push("")
        this.currentPlayer = this.playerOne;
        this.squaresFilled = 0;
        this.winnerDeclared = false

        squares.forEach((square)=>{
            square.innerHTML=""
            square.style.pointerEvents="all"
        })

        restartButton.classList.remove("show-restart-button")
        resultDisplay.textContent = `${this.currentPlayer.name}'s turn!`
    }
    }

    return {squaresFilled, winnerDeclared,resultDisplay,
            nextPlayer, checkWinner,declareTie,endGame,
            resetGame}

})()