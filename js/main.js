



questions = [];


fetch('http://localhost:3000/questions/', {
    method: 'GET',
    headers: {
        'Accept': 'application/json', // Pour être explicite sur ce qu'on attend en retour
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch. Status: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => { 
        data.forEach(item => {
        questions.push(item.libelle);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });




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
        // Fermer le popup et rediriger vers la page reponse
        popup.style.display = 'none';
        window.location.href = 'reponse.html';
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