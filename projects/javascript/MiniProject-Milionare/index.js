const questions = [
    {
        question: "A magnet would most likely attract which of the following?",
        answers: ["Metal", "Plastic", "Wood", "The wrong man"],
        correct: 0
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "How much is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the boiling point of water in degrees Celsius?",
        answers: ["50°C", "75°C", "100°C", "150°C"],
        correct: 2
    },
    {
        question: "Which Disney movie features the song 'Let It Go'?",
        answers: ["Tangled", "Frozen", "Moana", "Cinderella"],
        correct: 1
    },
    {
        question: "What is the primary ingredient in guacamole?",
        answers: ["Tomato", "Onion", "Garlic", "Avocado"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
const prizeMoney = [100, 500, 1000, 5000, 10000, 20000];
let selectedAnswer = null;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("prize").textContent = `This question is worth: $${prizeMoney[currentQuestion]}`;
    const answerBlocks = document.querySelectorAll(".answer-block");
    answerBlocks.forEach((block, index) => {
        block.textContent = q.answers[index];
        block.classList.remove("correct", "incorrect");
    });
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("reset-btn").style.display = "none";
    selectedAnswer = null;
}

function selectAnswer(index) {
    if (selectedAnswer !== null) return;
    selectedAnswer = index;
    const q = questions[currentQuestion];
    const answerBlocks = document.querySelectorAll(".answer-block");
    answerBlocks.forEach((block, i) => {
        if (i === q.correct) {
            block.classList.add("correct");
        } else if (i === index && index !== q.correct) {
            block.classList.add("incorrect");
        }
    });

    if (index === q.correct) {
        score += prizeMoney[currentQuestion];
        document.getElementById("score").textContent = `Score: $${score}`;
        document.getElementById("next-btn").classList.remove("hidden");
    } else {
        document.getElementById("game-over").textContent = `Game Over! Final Score: $${score}`;
        document.getElementById("game-over").classList.remove("hidden");
        document.getElementById("next-btn").classList.add("hidden");
        document.getElementById("reset-btn").style.display = "block";
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("game-over").textContent = `Congratulations! You won: $${score}`;
        document.getElementById("game-over").classList.remove("hidden");
        document.getElementById("next-btn").classList.add("hidden");
        document.getElementById("reset-btn").style.display = "block";
    }
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").textContent = `Score: $0`;
    document.getElementById("game-over").classList.add("hidden");
    document.getElementById("reset-btn").style.display = "none";
    loadQuestion();
}

// Start the game
loadQuestion();