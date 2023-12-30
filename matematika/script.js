const problems = [];
let score = 0;

function generateProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() < 0.5 ? '+' : '-';
    const problemString = `${num1} ${operator} ${num2}`;
    const correctAnswer = eval(problemString);
    problems.push({ problem: problemString, answer: correctAnswer });
    return problemString;
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('user-answer').value);
    const currentProblem = problems[problems.length - 1];

    if (userAnswer === currentProblem.answer) {
        score++;
        document.getElementById('result').innerText = `Correct! Score: ${score}`;
    } else {
        document.getElementById('result').innerText = `Wrong! Your final score is: ${score}`;
        saveScore(score);
    }

    document.getElementById('user-answer').value = '';
    document.getElementById('problem').innerText = generateProblem();
    document.getElementById('user-answer').focus();
}

function saveScore(score) {
    Swal.fire({
        title: 'Enter your name:',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value) {
                return 'Please enter your name';
            }
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
    }).then((result) => {
        if (result.isConfirmed) {
            const encodedName = encodeURIComponent(result.value);
            fetch('save_score.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: encodedName, score: score }),
            }).then(() => {
                showTopPlayers();
            });
        }
    });
}

function showTopPlayers() {
    fetch('get_top_players.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('top-players');
            table.innerHTML = '<tr><th>Name</th><th>Score</th></tr>';
            data.forEach(player => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.innerText = player.name;
                cell2.innerText = player.score;
            });
        });
}

document.getElementById('problem').innerText = generateProblem();
document.getElementById('user-answer').focus();
