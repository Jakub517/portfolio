window.onload = function () {
    generateQuestion();
  };

var correctCount = 0;
var incorrectCount = 0;

function generateQuestion() {
  var num1 = Math.floor(Math.random() * 10) + 1;
  var num2 = Math.floor(Math.random() * 10) + 1;
  var operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];

  var question = num1 + ' ' + operator + ' ' + num2;
  document.getElementById('question').innerText = question;
}

function checkAnswer() {
  var question = document.getElementById('question').innerText;
  var userAnswer = document.getElementById('answer').value;
  var correctAnswer = eval(question);

  var resultElement = document.getElementById('result');

  if (userAnswer == correctAnswer) {
    resultElement.innerText = 'Správně!';
    resultElement.className = '';
    correctCount++;
    document.getElementById('correctCount').innerText = correctCount;
  } else {
    resultElement.innerText = 'Chyba, správná odpověď: ' + correctAnswer;
    resultElement.className = 'incorrect';
    incorrectCount++;
    document.getElementById('incorrectCount').innerText = incorrectCount;
  }

  generateQuestion();
}
