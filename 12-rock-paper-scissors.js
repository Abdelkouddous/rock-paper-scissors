//if const realonly property error
//add query selector to local storage cuz the other is
//local

let timer = document.querySelector(".timer-paragraph");

setInterval(func, 1000);
function func() {
  let d = new Date();
  timer.innerHTML = `<p>The time is -
  
    ${d.getHours()} 
    : 
    ${d.getMinutes()} 
    : 
    ${d.getSeconds()} </p>`;
  console.log(d.getHours(), d.getMinutes(), d.getSeconds());
}

document.body.addEventListener("keydown", (event) => {
  //console.log(event.key);
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  }
});
function switchMode() {
  const switchMode = document.querySelector(".js-btn-switch");
  document.body.classList.toggle("dark");
  //mistake
  //switchMode.classList.toggle('btn-switch.dark');
  //fixed
  switchMode.classList.toggle("dark");
}

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScore();
function updateScore() {
  document.querySelector(".gg").innerText =
    " Wins: " +
    score.wins +
    " Losses: " +
    score.losses +
    " Ties: " +
    score.ties;
}

/*  if (!score){
               score = {
                 wins:0,
                 losses:0,
                 ties:0
               }
           }
*/
let computerMove,
  result,
  playerMove = "";
//computer move fct___________
function reset() {
  (score.wins = 0), (score.losses = 0), (score.ties = 0);
  localStorage.removeItem("score");
  updateScore();
}
function pickComputerMove() {
  let randomNum = Math.random();
  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = "rock";
    //console.log('Bot moved: ' + computerMove);
  } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = "paper";
    //console.log('Bot moved: ' + computerMove);
  } else if (randomNum >= 2 / 3 && randomNum < 1) {
    computerMove = "scissors";
    //console.log('Bot moved: ' + computerMove);
  }
  return computerMove;
}
/*
           function pickRock(){
             if (computerMove==='rock'){
             result ='Tie.'
             alert('You picked rock. \nComputer picked ' + computerMove + '. \n' +result);
     
           } 
           else if (computerMove==='paper'){
             result = 'You lose .'
             alert('You picked rock. \nComputer picked ' + computerMove + '. \n' +result);
           }
           else if (computerMove==='scissors'){
             result = 'You win ';
             alert('You picked rock. \n Computer picked ' + computerMove + '. \n' +result);
           }
           //return result;
           }
           function pickPaper(){
             if (computerMove==='rock'){
           result ='You win.'
           alert('You picked paper. \nComputer picked ' + computerMove + '. \n' +result);
     
         } 
         else if (computerMove==='paper'){
           result = 'Tie.'
           alert('You picked paper. \nComputer picked ' + computerMove + '. \n' +result);
         }
         else if (computerMove==='scissors'){
           result = 'You lose.';
           alert('You picked paper. \n Computer picked ' + computerMove + '. \n' +result);
         }
         //return result;
           }
           function pickScissors(){
           if (computerMove==='rock'){
           result ='You lose.'
           alert('You picked scissors. \nComputer picked ' + computerMove + '. \n' +result);
           
         } 
         else if (computerMove==='paper'){
           result = 'You win.'
           alert('You picked scissors. \nComputer picked ' + computerMove + '. \n' +result);
         }
         else if (computerMove==='scissors'){
           result = 'Tie.';
           alert('You picked scissors. \n Computer picked ' + computerMove + '. \n' +result);
         }
         //return result;
         }
         //autoplay function
         
         */
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  const buttonElem = document.querySelector(".js-autoplay-btn");
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      //add a return statement to
      //the fucntion pick computer move so
      //u dont get the undefined method problem
      playGame(playerMove);
      // another way of doing it -----
      // chance = Math.random();
      // if (chance <= 1 / 3) {
      //   playGame("rock");
      // } else if (chance <= 2 / 3) {
      //   playGame("paper");
      // } else {
      //   playGame("scissors");
      // }
    }, 750);
    isAutoPlaying = true;
    buttonElem.innerText = "Stop";
  }
  //stop the interval
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonElem.innerText = "Auto-Play";
  }
}
document.querySelector(".js-rock-btn").addEventListener(
  "click", //playgame('rock') doesnt work
  () => {
    playGame("rock");
  }
);
document.querySelector(".js-paper-btn").addEventListener(
  "click", //playgame('rock') doesnt work
  () => {
    playGame("paper");
  }
);
document.querySelector(".js-scissors-btn").addEventListener("click", () => {
  playGame("scissors");
});

//here we combine the functions to create a new
//better function
function playGame(playerMove) {
  pickComputerMove();
  //if he choses scissors
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
      //alert('You picked scissors. \nComputer picked ' + computerMove + '. \n' +result);
    } else if (computerMove === "paper") {
      result = "You win.";
      //alert('You picked scissors. \nComputer picked ' + computerMove + '. \n' +result);
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }
  //if he choses paper
  else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
      //alert('You picked paper. \nComputer picked ' + computerMove + '. \n' +result);
    } else if (computerMove === "paper") {
      result = "Tie.";
      //alert('You picked paper. \nComputer picked ' + computerMove + '. \n' +result);
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  }
  //if he choses rock
  else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
      //alert('You picked rock. \nComputer picked ' + computerMove + '. \n' +result);
    } else if (computerMove === "paper") {
      result = "You lose.";
      //alert('You picked rock. \nComputer picked ' + computerMove + '. \n' +result);
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }
  if (result === "You win.") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  }
  //shortcut
  result === "Tie." && score.ties++;
  //save result in session
  localStorage.setItem("score", JSON.stringify(score));
  //show result
  // alert('You picked '+ playerMove+'. '+'  \nComputer picked ' + computerMove + '. \n' +result
  //   +'\nWins: '+ score.wins
  //   +' Losses: ' + score.losses
  //   +' Ties: ' + score.ties
  // );
  document.querySelector(".res").innerHTML = result;
  // document.querySelector('.phase').innerHTML =
  // 'You: '+ playerMove+' '+ ' - Computer: ' + computerMove + '\n';
  document.querySelector(".phase").innerHTML =
    "You " +
    '<img src="images/' +
    playerMove +
    '-emoji.png" alt="rock" class="move-icn">' +
    '<img src="images/' +
    computerMove +
    '-emoji.png" alt="paper" class="move-icn">' +
    "Computer";

  updateScore();
  // document.querySelector('.gg').innerText=
  //   'Score :' +
  //   '\nWins: '+ score.wins
  //   +' Losses: ' + score.losses
  //   +' Ties: ' + score.ties
  // ;
}
