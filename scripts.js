//create game module
const game = (() => {
    //create bools to alternate turn
    let isPlayer1Turn = true;
    let hasWinner = false;
    
    //creating function to switch turn
    const switchTurn = function() {
        if(isPlayer1Turn){
            isPlayer1Turn = false;
        } else {
            isPlayer1Turn = true;
        }
    }

    //create function to check turn
    const checker = function() {
        if(hasWinner){
            return 0;
        } else if(hasWinner === false && isPlayer1Turn === true){
            return 1;
        } else {
            return -1;
        }
    }
    
    //create counter for turns to sniff out draws
    let count = 0;

    const turnCount = function(){
        count++;
        if(count === 9){
            hasWinner = true;
            alert("It's a tie");
        }
    }

    const resetWinner = function() {
        hasWinner = false;
        count = 1;
    }

    const resetTurn = function () {
        isPlayer1Turn = true;
    }

    //create function that checks for winner
    const checkWinner = function() {
        let a = gameBoard.board[0].value + gameBoard.board[1].value + gameBoard.board[2].value;
        let b = gameBoard.board[0].value + gameBoard.board[3].value + gameBoard.board[6].value;
        let c = gameBoard.board[0].value + gameBoard.board[4].value + gameBoard.board[8].value;
        let d = gameBoard.board[1].value + gameBoard.board[4].value + gameBoard.board[7].value;
        let e = gameBoard.board[2].value + gameBoard.board[5].value + gameBoard.board[8].value;
        let f = gameBoard.board[2].value + gameBoard.board[4].value + gameBoard.board[6].value;
        let g = gameBoard.board[3].value + gameBoard.board[4].value + gameBoard.board[5].value;
        let h = gameBoard.board[6].value + gameBoard.board[7].value + gameBoard.board[8].value;
        if(a === 3 || b === 3 || c === 3 || d === 3 || e === 3 || f === 3 || g === 3 || h === 3){
            hasWinner = true;
            return 1;
        } else if(a === -3 || b === -3 || c === -3 || d === -3 || e === -3 || f === -3 || g === -3 || h === -3){
            hasWinner = true;
            return -1;
        }
    }

    return {
        isPlayer1Turn,
        hasWinner,
        checker,
        switchTurn,
        checkWinner,
        resetWinner,
        resetTurn,
        turnCount,
    }
})();

//create gameBoard module
const gameBoard = (() => {
    const board = [];

    //create factory for elements
    const squareFactory = (name) => {
        let DOM = document.getElementById(`${name}`);
        let value = 0;
        return { DOM, value };
    };

    //grab DOM elements and push into array
    const div0 = squareFactory("div0");
    const div1 = squareFactory("div1");
    const div2 = squareFactory("div2");
    const div3 = squareFactory("div3");
    const div4 = squareFactory("div4");
    const div5 = squareFactory("div5");
    const div6 = squareFactory("div6");
    const div7 = squareFactory("div7");
    const div8 = squareFactory("div8");
    board.push(div0, div1, div2, div3, div4, div5, div6, div7, div8);

    //create function to target the add event listener to elements
    const addEvents = function(arrayElement) {
        arrayElement.DOM.addEventListener("click", function() {
            let check = game.checker();
            if(game.checker() !== 0){
                if(check === 1){
                    arrayElement.DOM.textContent = "X";
                    arrayElement.value = 1;
                } else if (check === -1){
                    arrayElement.DOM.textContent = "O";
                    arrayElement.value = -1;
                }
                let winCheck = game.checkWinner();
                if(winCheck === 1){
                    player1.addPoint();
                    player1.alertWin();
                } else if(winCheck === -1) {
                    player2.addPoint();
                    player2.alertWin();
                } else {
                    game.turnCount();
                    game.switchTurn();
                }
            }

        }, {once: true});
    };

    //add event listener for click
    board.forEach(addEvents);

    //adding DOM elements for player score, etc
    const scoreP1 = document.getElementById("p1-score");
    const scoreP2 = document.getElementById("p2-score");
    const nameP1 = document.getElementById("p1-name");
    const nameP2 = document.getElementById("p2-name");
    const editP1 = document.getElementById("p1-edit");
    const editP2 = document.getElementById("p2-edit");

    //adding the reset and start buttons
    const startBtn = document.getElementById("start");
    const resetBtn = document.getElementById("reset");

    const newGame = function(arrayElement) {
        arrayElement.DOM.textContent = "";
        arrayElement.value = 0;
    }

    startBtn.addEventListener("click", function(){
        board.forEach(newGame);
        board.forEach(addEvents);
        game.resetWinner();
    });

    resetBtn.addEventListener("click", function(){
        startBtn.click();
        player1.resetScore();
        player2.resetScore();
        game.resetTurn();
    });

    return {
        board,
        scoreP1,
        scoreP2,
        nameP1,
        nameP2,
        editP1,
        editP2,
    }
})();

//create player factory
const player = function(nameEle, scoreEle, editBtn) {
    let score = 0;
    let pname = nameEle.textContent;
    const addPoint = function(){
        score++;
        scoreEle.textContent = `Score: ${score}`;
    }

    editBtn.addEventListener("click", function() {
        nameEle.textContent = prompt("enter new name");
        pname = nameEle.textContent;
    });

    const alertWin = function(){
        alert(`${pname} wins this round`);
    }

    const resetScore = function() {
        score = 0;
        scoreEle.textContent = `Score: ${score}`;
    }

    return{ score, addPoint, alertWin, resetScore }
}

const player1 = player(gameBoard.nameP1, gameBoard.scoreP1, gameBoard.editP1);
const player2 = player(gameBoard.nameP2, gameBoard.scoreP2, gameBoard.editP2);
