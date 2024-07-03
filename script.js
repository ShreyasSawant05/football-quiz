// Sample quiz questions (can be replaced with actual quiz questions)
const quizQuestions = [
    {
        question: "Who is the all-time top scorer in the FIFA World Cup?",
        options: ["Lionel Messi", "Cristiano Ronaldo", "Mbappe", "Pele"],
        answer: "Cristiano Ronaldo"
    },
    {
        question: "Which country has won the most FIFA World Cup titles?",
        options: ["Brazil", "Argentina", "Germany", "India"],
        answer: "Brazil"
    },
    {
        question: "Which player has won the most Ballon d'Or awards?",
        options: ["Lionel Messi", "Cristiano Ronaldo", "Michel Platini", "Johan Cruyff"],
        answer: "Lionel Messi"
    },
    {
        question: "Which country won the 2018 FIFA World Cup?",
        options: ["France", "Argentina", "Portugal", "Brazil"],
        answer: "France"
    },
    {
        question: "Which tournament decides the champion of Europe in club football?",
        options: ["UEFA Champions League", "Europa League", "FIFA Club World Cup", "UEFA Super Cup"],
        answer: "Europa League"
    },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const startQuizBtn = document.getElementById('startQuizBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
const resultMessage = document.getElementById('resultMessage');

// Function to start quiz
startQuizBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startQuizBtn.classList.add('d-none');
    loadQuestion();
}

// Function to load question
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionCard = `
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">${question.question}</h5>
                <div id="options">
                    ${question.options.map(option => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="option" id="${option}" value="${option}">
                            <label class="form-check-label" for="${option}">
                                ${option}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    quizContainer.innerHTML = questionCard;
    nextBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');
}

// Function to handle next button click
nextBtn.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert('Please select an option!');
        return;
    }
    const answer = selectedOption.value;
    if (answer === quizQuestions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// Function to show result
function showResult() {
    const totalQuestions = quizQuestions.length;
    const percentage = (score / totalQuestions) * 100;
    let message;
    if (percentage >= 70) {
        message = `Congratulations! You scored ${score} out of ${totalQuestions}. You are a trivia master!`;
    } else if (percentage >= 40) {
        message = `Not bad! You scored ${score} out of ${totalQuestions}. Keep practicing!`;
    } else {
        message = `You scored ${score} out of ${totalQuestions}. Keep learning and try again!`;
    }
    resultMessage.textContent = message;
    resultModal.show();
}

// Function to handle form submission
const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    // Here you can add code to handle form submission (e.g., send data to server)
    // For demo purposes, let's just show a success message
    $('#feedbackForm').trigger("reset");
    $('#feedbackSuccessToast').toast('show');
});

