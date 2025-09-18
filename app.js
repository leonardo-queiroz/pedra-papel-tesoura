const instructions = document.querySelector("#instructions");
const instructionsButtons = document.querySelector("#instructions-toggle");

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGame);

const rock = document.querySelector("#rock");
rock.addEventListener("click", choiceListener)
const paper = document.querySelector("#paper");
paper.addEventListener("click", choiceListener);
const scissors = document.querySelector("#scissors");
scissors.addEventListener("click", choiceListener);

const board = document.querySelector("#board");
const score = document.querySelector("#score");

const playerImage = document.querySelector("#player-img");
const computerImage = document.querySelector("#computer-img");

const playerPoints = document.querySelector("#player-points");
const computerPoints = document.querySelector("#computer-points");

const winScore = document.querySelector("#score-win");
const lossScore = document.querySelector("#score-loss");
const tieScore = document.querySelector("#score-tie");

const finalResults = document.querySelector("#final-results");

let instructionsClicked = false;
let listenerVerifier = true;
let winCount = 0;
let lossCount = 0;
let tieCount = 0;

instructionsButtons.addEventListener("click", function() {
    if (!instructionsClicked) {
        instructions.classList.remove("hidden");
        instructionsButtons.classList.add("instructions-active");
        instructionsClicked = true;
    } else {
        instructions.classList.add("hidden");
        instructionsButtons.classList.remove("instructions-active");
        instructionsClicked = false;
    }
});


function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const randomChoice = Math.floor(Math.random() * options.length);
    const computerChoice = options[randomChoice];
    
    if (computerChoice === "rock") {
        computerImage.setAttribute("src", "./assets/imagens/CPU-Pedra.png");
        computerImage.setAttribute("alt", "Computador escolheu Pedra");
        computerImage.classList.remove("img-animation");
        void playerImage.offsetWidth;
        computerImage.classList.add("img-animation");
    } else if (computerChoice === "paper") {
        computerImage.setAttribute("src", "./assets/imagens/CPU-Papel.png");
        computerImage.setAttribute("alt", "Computador escolheu Papel");
        computerImage.classList.remove("img-animation");
        void playerImage.offsetWidth;
        computerImage.classList.add("img-animation");
    } else if (computerChoice === "scissors") {
        computerImage.setAttribute("src", "./assets/imagens/CPU-Tesoura.png");
        computerImage.setAttribute("alt", "Computador escolheu Tesoura");
        computerImage.classList.remove("img-animation");
        void playerImage.offsetWidth;
        computerImage.classList.add("img-animation");
    }

    return computerChoice;
}


function choiceListener(event) {
    playRound(event.target.id, getComputerChoice());
}


function renderScore() {
    winScore.textContent = winCount;
    lossScore.textContent = lossCount;
    tieScore.textContent = tieCount;
}


function resetGame() {
    winCount = 0;
    lossCount = 0;
    tieCount = 0;
    renderScore();
    
    if (!listenerVerifier) {
        rock.addEventListener("click", choiceListener);    
        paper.addEventListener("click", choiceListener);
        scissors.addEventListener("click", choiceListener);
        listenerVerifier = true;
    }
    
    board.classList.remove("disabled");
    score.classList.remove("disabled");
    rock.classList.remove("disabled");
    paper.classList.remove("disabled");
    scissors.classList.remove("disabled");
    
    playerImage.setAttribute("src", "");
    playerImage.setAttribute("alt", "");    
    computerImage.setAttribute("src", "");
    computerImage.setAttribute("alt", "");
    
    finalResults.classList.add("hidden");
    finalResults.classList.remove("results-animation");
    finalResults.textContent = "";
}


function addPoint() {
    const onePoint = document.createElement("p");
    onePoint.textContent = "+1 PONTO!";
    onePoint.classList.add("points");
    onePoint.setAttribute("id", "added-point"); 
    return onePoint;
}


function removePoint() {
    var checkPoint = document.getElementById("added-point");
    if(checkPoint !== null) {
        checkPoint.remove();
    }
}


function playRound(playerSelection, computerSelection) {
    removePoint();
    if (playerSelection === "rock") {    
        playerImage.setAttribute("src", "./assets/imagens/CPU-Pedra.png");
        playerImage.setAttribute("alt", "Você escolheu Pedra");
        playerImage.classList.remove("img-animation");
        void playerImage.offsetWidth;
        playerImage.classList.add("img-animation");

        if (computerSelection === "rock") {
            tieCount++;
            renderScore();            
        } else if (computerSelection === "paper") {
            computerPoints.appendChild(addPoint());
            lossCount++;
            renderScore();                                 
        } else if (computerSelection === "scissors") {
            playerPoints.appendChild(addPoint());
            winCount++;
            renderScore();        
        }

    } else if (playerSelection === "paper") {
        playerImage.setAttribute("src", "./assets/imagens/CPU-Papel.png");
        playerImage.setAttribute("alt", "Você escolheu Papel");
        playerImage.classList.remove("img-animation");
        void playerImage.offsetWidth;
        playerImage.classList.add("img-animation");

        if (computerSelection === "rock") {
            playerPoints.appendChild(addPoint());
            winCount++;
            renderScore();            
        } else if (computerSelection === "paper") {
            tieCount++;
            renderScore();        
        } else if (computerSelection === "scissors") {
            computerPoints.appendChild(addPoint());
            lossCount++;
            renderScore();               
        }

    } else if (playerSelection === "scissors") {
        playerImage.setAttribute("src", "./assets/imagens/CPU-Tesoura.png");
        playerImage.setAttribute("alt", "Você escolheu Tesoura");
        playerImage.classList.remove("img-animation");
        void playerImage.offsetWidth;
        playerImage.classList.add("img-animation");

        if (computerSelection === "rock") {
            computerPoints.appendChild(addPoint());
            lossCount++;
            renderScore();              
        } else if (computerSelection === "paper") {
            playerPoints.appendChild(addPoint());
            winCount++;
            renderScore();            
        } else if (computerSelection === "scissors") {
            tieCount++;
            renderScore();
        }
    }

    if (winCount === 5) {        
        finalResults.textContent = "*** VOCÊ VENCEU! ***";        
        finalResults.classList.remove("hidden");
        finalResults.classList.add("results-animation");
        finishGame();   
    } else if (lossCount === 5) {        
        finalResults.textContent = "XxX VOCÊ PERDEU! XxX";       
        finalResults.classList.remove("hidden");
        finalResults.classList.add("results-animation");
        finishGame();
    }
}


function finishGame() {
    board.classList.add("disabled");
    score.classList.add("disabled");
    rock.classList.add("disabled");
    paper.classList.add("disabled");
    scissors.classList.add("disabled");  
    
    rock.removeEventListener("click", choiceListener);    
    paper.removeEventListener("click", choiceListener);
    scissors.removeEventListener("click", choiceListener);
    listenerVerifier = false;
}