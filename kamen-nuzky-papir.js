let userScore = 0;
let computerScore = 0;
const winningScore = 10;

function playGame(userChoice) {
  const choices = ["kámen", "papír", "nůžky"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let resultText = "";

  if (userChoice === computerChoice) {
    resultText = "Remíza!";
  } else if (
    (userChoice === "kámen" && computerChoice === "nůžky") ||
    (userChoice === "nůžky" && computerChoice === "papír") ||
    (userChoice === "papír" && computerChoice === "kámen")
  ) {
    resultText = "Správně!";
    userScore++;
  } else {
    resultText = "Špatně!";
    computerScore++;
  }

  document.getElementById("userSelection").innerHTML = `<i class="fas fa-hand-${userChoice}"></i> Váš výběr: <b>${userChoice}</b>`;
  document.getElementById("computerSelection").innerHTML = `<i class="fas fa-hand-${computerChoice}"></i> Výběr počítače: <b>${computerChoice}</b>`;
  document.getElementById("result").textContent = `Výsledek: ${resultText}`;
  document.getElementById("userScore").textContent = userScore;
  document.getElementById("computerScore").textContent = computerScore;

  if (userScore === winningScore) {
    document.getElementById("result").textContent = "Vyhrál jsi!";
    document.getElementById("result").classList.add("winner");
    document.getElementById("result").style.color = "#64ffda";
    disableChoices();
  } else if (computerScore === winningScore) {
    document.getElementById("result").textContent = "Prohrál jsi!";
    document.getElementById("result").classList.add("winner");
    disableChoices();
  }

  const gameContainer = document.querySelector(".game");
  gameContainer.classList.add("active");
  setTimeout(() => {
    gameContainer.classList.remove("active");
  }, 1500);
}

function disableChoices() {
  const choiceButtons = document.querySelectorAll(".choice");
  choiceButtons.forEach(button => {
    button.disabled = true;
  });
}
