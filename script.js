// script.js

// Lydfiler
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');

// Start troll-animasjon
function startTrollAnimation() {
    const trollContainer = document.getElementById('troll-container');

    // Fjern eksisterende troll hvis noen
    trollContainer.innerHTML = '';

    // Antall troll som skal animeres
    const trollCount = 7; // Juster dette tallet for flere eller færre troll

    // Totalt antall trollbilder du har
    const totalTrollImages = 12; // Sett dette til 12 siden du har 12 bilder

    // Opprett troll-elementer
    for (let i = 0; i < trollCount; i++) {
        const troll = document.createElement('img');
        // Velg et tilfeldig trollbilde
        const randomTrollNumber = Math.floor(Math.random() * totalTrollImages) + 1;
        troll.src = `images/troll${randomTrollNumber}.png`; // Forventer at du har troll1.png til troll12.png
        troll.classList.add('troll');

        // Tilfeldig startposisjon
        const startPosY = Math.random() * 100;
        troll.style.top = `${startPosY}%`;
        troll.style.left = '-100px'; // Start utenfor skjermen til venstre

        // Tilfeldig størrelse
        const size = 50 + Math.random() * 100; // Størrelse mellom 50px og 150px
        troll.style.width = `${size}px`;

        // Tilfeldig varighet
        const duration = 5 + Math.random() * 10; // Varighet mellom 5s og 15s
        troll.style.animationDuration = `${duration}s`;

        // Tilfeldig forsinkelse
        const delay = Math.random() * 5; // Forsinkelse mellom 0s og 5s
        troll.style.animationDelay = `${delay}s`;

        // Tilfeldig bevegelse
        const translateX = window.innerWidth + 200; // Beveger seg over hele skjermbredden og litt til
        const translateY = (Math.random() - 0.5) * window.innerHeight; // Tilfeldig vertikal bevegelse
        const rotateDeg = (Math.random() - 0.5) * 360; // Tilfeldig rotasjon mellom -180deg og 180deg

        // Sett CSS-variabler for animasjonen
        troll.style.setProperty('--translateX', `${translateX}px`);
        troll.style.setProperty('--translateY', `${translateY}px`);
        troll.style.setProperty('--rotateDeg', `${rotateDeg}deg`);

        // Legg til troll i containeren
        trollContainer.appendChild(troll);
    }
}

// Quiz-data
const quizQuestions = [
    {
        question: "Hva betyr ordet 'bok' på norsk?",
        options: ["Båt", "Hus", "Tre", "Bok"],
        answer: 3
    },
    {
        question: "Hva er hovedstaden i Norge?",
        options: ["Oslo", "Bergen", "Trondheim", "Stavanger"],
        answer: 0
    },
    {
        question: "Hvordan sier man 'takk' på norsk?",
        options: ["Hei", "Takk", "Vær så god", "Unnskyld"],
        answer: 1
    },
    {
        question: "Hvilket av disse er et norsk fjell?",
        options: ["Himalaya", "Galdhøpiggen", "Alpene", "Rocky Mountains"],
        answer: 1
    },
    {
        question: "Hva heter Norges lengste elv?",
        options: ["Nilen", "Amazonas", "Glomma", "Donau"],
        answer: 2
    }
];

// Variabler for quiz-timer
let timeLeft = 60;
let timerInterval;

// Funksjon for å laste inn quiz
// Funksjon for å laste inn quiz
function loadQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Tøm tidligere quiz

    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-block');
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.options.forEach((option, i) => {
            const optionId = `question${index}-option${i}`;
            questionDiv.innerHTML += `
                <label for="${optionId}">
                    <input type="radio" id="${optionId}" name="question${index}" value="${i}">
                    ${option}
                </label><br>
            `;
        });

        quizDiv.appendChild(questionDiv);
    });

    // Legg til event listeners for alle spørsmål
    quizQuestions.forEach((q, index) => {
        const radios = document.getElementsByName(`question${index}`);
        radios.forEach(radio => {
            radio.addEventListener('change', () => handleAnswer(index, radio));
        });
    });
}
// Funksjon for å håndtere svaret umiddelbart når brukeren velger et alternativ
function handleAnswer(questionIndex, selectedRadio) {
    const answer = quizQuestions[questionIndex].answer;
    const parent = selectedRadio.parentElement;

    if (parseInt(selectedRadio.value) === answer) {
        // Riktig svar
        parent.style.color = 'green';
        correctSound.play();
    } else {
        // Feil svar
        parent.style.color = 'red';
        wrongSound.play();
    }

    // Gjør alle alternativer ikke-klikkbare etter at brukeren har svart
    const radios = document.getElementsByName(`question${questionIndex}`);
    radios.forEach(radio => {
        radio.disabled = true;
    });
}


// Funksjon for å starte quiz-timeren
function startTimer() {
    document.getElementById('time').innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkQuiz(); // Sjekk quiz når tiden er ute
        }
    }, 1000);
}


// Funksjon for å sjekke alle svar når tiden går ut eller brukeren er ferdig
function checkQuiz() {
    clearInterval(timerInterval); // Stopp timeren

    let score = 0;

    quizQuestions.forEach((q, index) => {
        const radios = document.getElementsByName(`question${index}`);
        radios.forEach(radio => {
            if (radio.checked && parseInt(radio.value) === q.answer) {
                score++; // Riktig svar øker poengsummen
            }
        });
    });

    document.getElementById('quiz-result').innerText = `Du fikk ${score} av ${quizQuestions.length} riktige!`;
    document.getElementById('submit-quiz').disabled = false;
    document.getElementById('submit-quiz').innerText = 'Prøv igjen';
}


// Event Listener for quiz-knappen
document.getElementById('submit-quiz').addEventListener('click', () => {
    loadQuiz();
    timeLeft = 60;
    startTimer();
    document.getElementById('submit-quiz').disabled = true;
    document.getElementById('submit-quiz').innerText = 'Quiz pågår...';
    document.getElementById('quiz-result').innerText = '';
});

const crosswordData = {
    gridSize: 10,
    words: [
        // 1. NORGE (Vannrett) starter på (0,0)
        { word: 'NORGE', row: 0, col: 0, direction: 'across', clue: 'Landet vi bor i' },

        // 2. BERGEN (Vannrett) starter på (1,0)
        { word: 'BERGEN', row: 1, col: 0, direction: 'across', clue: 'En kjent norsk by' },

        // 3. EIDSVOLL (Vannrett) starter på (2,0)
        { word: 'EIDSVOLL', row: 2, col: 0, direction: 'across', clue: 'Stedet for grunnlovssigneringen' },

        // 4. TROMSØ (Vannrett) starter på (3,0)
        { word: 'TROMSØ', row: 3, col: 0, direction: 'across', clue: 'En by langt nord i Norge' },

        // 5. GJØVIK (Vannrett) starter på (4,0)
        { word: 'GJØVIK', row: 4, col: 0, direction: 'across', clue: 'En by ved Mjøsa' },

        // 6. GEIRANGER (Vannrett) starter på (5,0)
        { word: 'GEIRANGER', row: 5, col: 0, direction: 'across', clue: 'En kjent norsk fjord' },

        // 7. OSLO (Vannrett) starter på (6,0)
        { word: 'OSLO', row: 6, col: 0, direction: 'across', clue: 'Hovedstaden i Norge' },

        // 8. ELG (Vannrett) starter på (7,0)
        { word: 'ELG', row: 7, col: 0, direction: 'across', clue: 'Et stort norsk skogsdyr' },

        // 9. SKI (Vannrett) starter på (8,0)
        { word: 'SKI', row: 8, col: 0, direction: 'across', clue: 'En populær vintersport i Norge' }
    ]
};













// Funksjon for å laste inn kryssord
function loadCrossword() {
    const table = document.getElementById('crossword-table');
    table.innerHTML = '';
    const gridSize = crosswordData.gridSize;
    const words = crosswordData.words;

    // Opprett grid
    for (let i = 0; i < gridSize; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < gridSize; j++) {
            const td = document.createElement('td');
            td.setAttribute('data-row', i);
            td.setAttribute('data-col', j);
            td.style.visibility = 'hidden'; // Skjul celler som standard
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    // Samle ledetråder
    const acrossCluesArray = [];
    const downCluesArray = [];

    // Bruk dette objektet for å holde styr på hvilke celler som allerede har et nummer
    const cellNumbers = {};
    let clueNumber = 1; // Start nummereringen fra 1

    words.forEach((wordObj) => {
        const { word, row, col, direction, clue } = wordObj;

        // Sjekk om startcellen allerede har et nummer
        const cellKey = `${row},${col}`;
        let currentClueNumber;
        if (cellNumbers[cellKey]) {
            currentClueNumber = cellNumbers[cellKey];
        } else {
            currentClueNumber = clueNumber++;
            cellNumbers[cellKey] = currentClueNumber;
        }

        // Samle ledetråden sammen med nummeret
        const clueData = { number: currentClueNumber, clue };

        if (direction === 'across') {
            acrossCluesArray.push(clueData);
        } else {
            downCluesArray.push(clueData);
        }

        // Legg til nummer og input-felt i grid
        for (let i = 0; i < word.length; i++) {
            let currentRow = row;
            let currentCol = col;
            if (direction === 'across') {
                currentCol += i;
            } else {
                currentRow += i;
            }
            const cell = table.rows[currentRow].cells[currentCol];
            cell.style.visibility = 'visible'; // Vis cellen

            // Hvis cellen allerede har et input-felt, oppdater det istedenfor å lage et nytt
            let input = cell.querySelector('input');
            if (!input) {
                cell.innerHTML = `<input type="text" maxlength="1">`;
                input = cell.querySelector('input');
            }

            // Hvis input allerede er fylt, sjekk at det stemmer overens
            const currentAnswer = input.getAttribute('data-answer');
            const correctLetter = word[i];
            if (currentAnswer && currentAnswer !== correctLetter) {
                console.error(`Overlapper ikke riktig på (${currentRow}, ${currentCol})`);
            }
            
            input.setAttribute('data-answer', correctLetter);

            // Legg til tall i startcellen
            if (i === 0) {
                let numberSpan = cell.querySelector('.number');
                if (!numberSpan) {
                    numberSpan = document.createElement('span');
                    numberSpan.classList.add('number');
                    cell.appendChild(numberSpan);
                    cell.setAttribute('data-number', currentClueNumber);
                }
                // Oppdater tallene i cellen
                numberSpan.innerText = cellNumbers[cellKey];
            }
        }
    });

    // Sorter ledetrådene etter nummer
    acrossCluesArray.sort((a, b) => a.number - b.number);
    downCluesArray.sort((a, b) => a.number - b.number);

    // Vis ledetrådene med tall foran
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');
    acrossClues.innerHTML = '';
    downClues.innerHTML = '';

    acrossCluesArray.forEach((clueData) => {
        const clueItem = document.createElement('li');
        clueItem.innerText = `${clueData.number}. ${clueData.clue}`;
        acrossClues.appendChild(clueItem);
    });

    downCluesArray.forEach((clueData) => {
        const clueItem = document.createElement('li');
        clueItem.innerText = `${clueData.number}. ${clueData.clue}`;
        downClues.appendChild(clueItem);
    });

    // Legg til event listeners for input-feltene
    const inputs = document.querySelectorAll('#crossword-table input');
    inputs.forEach(input => {
        input.addEventListener('input', handleInput);
    });
}

// Funksjon for å håndtere inndata i kryssordet
function handleInput(event) {
    const input = event.target;
    const maxLength = input.getAttribute('maxlength');

    if (input.value.length >= maxLength) {
        // Flytt fokus til neste input hvis mulig
        const nextInput = getNextInput(input);
        if (nextInput) {
            nextInput.focus();
        }
    }

    // Sjekk om hele ordet er fullført korrekt etter at en bokstav er skrevet
    checkWordCompletion();
}


// Funksjon for å finne neste input-felt
function getNextInput(currentInput) {
    const inputs = Array.from(document.querySelectorAll('#crossword-table input'));
    const index = inputs.indexOf(currentInput);
    if (index >= 0 && index < inputs.length - 1) {
        return inputs[index + 1];
    }
    return null;
}

// Funksjon for å sjekke om et ord er fullført korrekt
function checkWordCompletion() {
    const words = crosswordData.words;

    words.forEach(wordObj => {
        const { word, row, col, direction } = wordObj;
        let wordCorrect = true;

        for (let i = 0; i < word.length; i++) {
            let currentRow = row;
            let currentCol = col;
            if (direction === 'across') {
                currentCol += i;
            } else {
                currentRow += i;
            }
            const cell = document.querySelector(`#crossword-table td[data-row="${currentRow}"][data-col="${currentCol}"]`);
            const input = cell.querySelector('input');
            if (input) {
                const userInput = input.value.toUpperCase();
                const correctAnswer = word[i].toUpperCase();
                if (userInput !== correctAnswer) {
                    wordCorrect = false;
                    break;
                }
            } else {
                wordCorrect = false;
                break;
            }
        }

        if (wordCorrect && !wordObj.completed) {
            // Marker ordet som korrekt
            wordObj.completed = true;
            for (let i = 0; i < word.length; i++) {
                let currentRow = row;
                let currentCol = col;
                if (direction === 'across') {
                    currentCol += i;
                } else {
                    currentRow += i;
                }
                const cell = document.querySelector(`#crossword-table td[data-row="${currentRow}"][data-col="${currentCol}"]`);
                const input = cell.querySelector('input');
                if (input) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                }
            }
        }
    });
}



function checkCrossword() {
    const cells = document.querySelectorAll('#crossword-table td');
    let allCorrect = true;
    cells.forEach(cell => {
        if (cell.style.visibility === 'visible') {
            const input = cell.querySelector('input');
            if (input) {
                const userInput = input.value.toUpperCase();
                const correctAnswer = cell.getAttribute('data-answer').toUpperCase();
                if (userInput === correctAnswer) {
                    input.classList.add('correct');
                    input.classList.remove('incorrect');
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('correct');
                    allCorrect = false;
                }
            }
        }
    });
    if (allCorrect) {
        document.getElementById('crossword-result').innerText = 'Gratulerer! Du løste kryssordet riktig!';
        correctSound.play();
    } else {
        document.getElementById('crossword-result').innerText = 'Noen svar er feil eller mangler. Prøv igjen!';
        wrongSound.play();
    }
}

// Event Listener for kryssord-knappen
document.getElementById('check-crossword').addEventListener('click', checkCrossword);

// Kjør funksjoner ved lasting av siden
window.onload = () => {
    startTrollAnimation();
    loadQuiz();
    loadCrossword();
};
