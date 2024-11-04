let questions = [];
let selectedQuestions = [];
let userAnswers = [];
let startTime, endTime;

// Función para cargar preguntas desde el archivo JSON
async function loadQuestions() {
    const response = await fetch("questions.json");
    questions = await response.json();
    startQuiz();
}

// Función para iniciar el cuestionario
function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    // Seleccionar 10 preguntas al azar y registrar la hora de inicio
    selectedQuestions = shuffleArray(questions).slice(0, 10);
    startTime = new Date();
    displayQuestions();
}

// Función para mostrar todas las preguntas en la misma página
function displayQuestions() {
    const questionsContainer = document.getElementById("questions-container");
    questionsContainer.innerHTML = ""; // Limpiar contenido anterior

    selectedQuestions.forEach((question, index) => {
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question-block");

        // Título de la pregunta
        let questionTitle = document.createElement("p");
        questionTitle.innerHTML = `<strong>Pregunta ${index + 1}:</strong> ${question.question}`;
        questionDiv.appendChild(questionTitle);

        // Opciones de respuesta mezcladas
        shuffleArray(question.options).forEach((option) => {
            let label = document.createElement("label");
            label.classList.add("option-label");

            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `answer${index}`; // Nombre único para cada pregunta
            radio.value = option;
            radio.onclick = () => userAnswers[index] = option;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
        });

        questionsContainer.appendChild(questionDiv);
    });

    // Mostrar el botón "Finalizar" al final de todas las preguntas
    document.getElementById("finish-button").style.display = "block";
}

// Función para finalizar el cuestionario
function finishQuiz() {
    endTime = new Date();
    let timeTaken = ((endTime - startTime) / 1000).toFixed(2);

    // Mostrar resultados
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    displayResults(timeTaken);
}

// Función para mostrar los resultados
function displayResults(time) {
    let resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `<p>Tiempo total: ${time} segundos</p>`;

    selectedQuestions.forEach((question, index) => {
        let userAnswer = userAnswers[index] || "Sin respuesta";
        let isCorrect = userAnswer === question.answer ? "Correcto" : "Incorrecto";
        resultContainer.innerHTML += `
            <div>
                <p><strong>Pregunta ${index + 1}:</strong> ${question.question}</p>
                <p>Tu respuesta: ${userAnswer} - <strong>${isCorrect}</strong></p>
                <p>Respuesta correcta: ${question.answer}</p>
            </div>
            <hr>
        `;
    });
}

// Función para reiniciar el cuestionario
function restartQuiz() {
    selectedQuestions = [];
    userAnswers = [];
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}

// Función para mezclar un array (preguntas u opciones)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

