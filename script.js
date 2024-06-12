document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    // Quiz questions for each subject
    const quizzes = {
        'history-quiz': [
            {
                question: "Who was the first President of the United States?",
                answers: {
                    a: "George Washington",
                    b: "Thomas Jefferson",
                    c: "Abraham Lincoln",
                    d: "John Adams"
                },
                correctAnswer: "a"
            },
            {
                question: "In which year did the Titanic sink?",
                answers: {
                    a: "1912",
                    b: "1905",
                    c: "1923",
                    d: "1898"
                },
                correctAnswer: "a"
            },
            {
                question: "Who wrote the 'I Have a Dream' speech?",
                answers: {
                    a: "Malcolm X",
                    b: "Nelson Mandela",
                    c: "Martin Luther King Jr.",
                    d: "Rosa Parks"
                },
                correctAnswer: "c"
            }
        ],
        'science-quiz': [
            {
                question: "What is the chemical symbol for water?",
                answers: {
                    a: "O2",
                    b: "H2O",
                    c: "CO2",
                    d: "NaCl"
                },
                correctAnswer: "b"
            },
            {
                question: "What planet is known as the Red Planet?",
                answers: {
                    a: "Mars",
                    b: "Jupiter",
                    c: "Saturn",
                    d: "Venus"
                },
                correctAnswer: "a"
            },
            {
                question: "What gas do plants absorb from the atmosphere?",
                answers: {
                    a: "Oxygen",
                    b: "Nitrogen",
                    c: "Carbon Dioxide",
                    d: "Hydrogen"
                },
                correctAnswer: "c"
            }
        ],
        'geography-quiz': [
            {
                question: "What is the capital of Australia?",
                answers: {
                    a: "Sydney",
                    b: "Melbourne",
                    c: "Canberra",
                    d: "Perth"
                },
                correctAnswer: "c"
            },
            {
                question: "Which continent is the Sahara Desert located on?",
                answers: {
                    a: "Asia",
                    b: "Africa",
                    c: "North America",
                    d: "Australia"
                },
                correctAnswer: "b"
            },
            {
                question: "What is the largest country in the world by area?",
                answers: {
                    a: "Canada",
                    b: "China",
                    c: "United States",
                    d: "Russia"
                },
                correctAnswer: "d"
            }
        ]
    };

    // Determine which quiz to load based on the body ID
    const bodyId = document.body.id;
    const currentQuiz = quizzes[bodyId];

    function buildQuiz(quizQuestions) {
        const output = [];

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question">
                    <h3>${currentQuestion.question}</h3>
                    <div class="answers">${answers.join('')}</div>
                </div>`
            );
        });

        quizContainer.innerHTML = output.join('');
    }

    function showResults(quizQuestions) {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
    }

    if (currentQuiz) {
        buildQuiz(currentQuiz);
        submitButton.addEventListener('click', () => showResults(currentQuiz));
    } else {
        quizContainer.innerHTML = "<p>Quiz not found. Please select a valid quiz.</p>";
    }
});
