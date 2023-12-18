let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //player0, playerX

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    enableboxes();
    msgContainer.classList.add("hide");
}

const disableboxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}
const enableboxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "0";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
}
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos0Val = boxes[pattern[0]].innerText;
        let pos1Val = boxes[pattern[1]].innerText;
        let pos2Val = boxes[pattern[2]].innerText;

        if(pos0Val != "" && pos1Val != "" && pos2Val != ""){
            if(pos0Val === pos1Val && pos1Val === pos2Val){
                showWinner(pos1Val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// const New = () => {
//     let cnt = 0;
//     for(box of boxes){
//         if(box.innerText = "0" || box.innerText == "X"){
//             cnt++;
//         }
//     }
//     if(cnt === 9) resetGame();
// }
// New();

// Function to check if the board is full and no one has won
function isGameOver() {
    // Check if the board is full
    for(box of boxes){
        if(box.innerText != ""){
            msg.innerText = "It's a tie";
            msgContainer.classList.remove("hide");
            resetGame();
        }
    }
  
    // // If the loop completes, and no empty space is found, it's a tie
    // msg.innerText = "It's a tie";
    // msgContainer.classList.remove("hide");
    // resetGame();
    // return true;
}

isGameOver();
