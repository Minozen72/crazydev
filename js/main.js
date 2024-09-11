const questions = [
    "Je suis souvent le premier à proposer de nouvelles idées.",
    "J'aime prendre des risques calculés.",
    "Je préfère travailler en équipe plutôt que seul.",
    "Je gère bien le stress et la pression.",
    "J'ai tendance à planifier à l'avance plutôt que d'improviser."
];

const choices = [1, 2, 3, 4, 5];

let currentQuestion = 0;

const popup = document.getElementById('popup');
const questionContainer = document.getElementById('question-container');
const choicesContainer = document.getElementById('choices-container');
const nextBtn = document.getElementById('next-btn');
const startQuizBtn = document.getElementById('start-quiz');
const closeBtn = document.querySelector('.close-btn');

function showQuestion() {
    if (currentQuestion < questions.length) {
        questionContainer.innerHTML = `<p>${questions[currentQuestion]}</p>`;
        choicesContainer.innerHTML = `
            <div class="choice-container">
                <span class="choice-label">Pas d'accord</span>
                <div class="choice-inputs">
                    ${choices.map(choice => `
                        <input type="radio" name="answer" value="${choice}" id="choice${choice}">
                        <label for="choice${choice}"></label>
                    `).join('')}
                </div>
                <span class="choice-label">D'accord</span>
            </div>
        `;
    } else {
        questionContainer.innerHTML = '<p>Merci d\'avoir répondu à toutes les questions !</p>';
        choicesContainer.innerHTML = '';
        nextBtn.textContent = 'Terminer';
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length) {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            currentQuestion++;
            showQuestion();
        } else {
            alert("Veuillez sélectionner une réponse avant de continuer.");
        }
    } else {
        // Fermer le popup et rediriger vers la page d'accueil
        popup.style.display = 'none';
        window.location.href = '#home';
    }
});


startQuizBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
    currentQuestion = 0;
    showQuestion();
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});