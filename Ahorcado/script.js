const wordToGuessList = ["HOLA", "MUNDO", "PROGRAMACION", "COMPUTADORA", "DESARROLLO"];
let wordToGuess = getRandomWord();
let guessedLetters = [];
let attempts = 7;

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordToGuessList.length);
    return wordToGuessList[randomIndex];
}

function guessLetter(letter) {
    if (attempts > 0 && wordToGuess.includes(letter) && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();
        disableButton(letter); // Deshabilitar el botón
    } else {
        attempts--;
        updateAttemptsDisplay();
        drawHangman();
    }
}

function disableButton(letter) {
    const button = document.getElementById(letter);
    button.disabled = true;
}

function enableAllButtons() {
    const letterButtons = document.querySelectorAll(".letter");
    letterButtons.forEach(button => {
        button.disabled = false;
    });
}

function restartGame() {
    wordToGuess = getRandomWord();
    guessedLetters = [];
    attempts = 7;

    updateWordDisplay();
    updateAttemptsDisplay();
    resetHangmanCanvas();
    enableAllButtons();
}

function updateWordDisplay() {
    const wordDisplay = document.getElementById("wordDisplay");
    const displayedWord = wordToGuess.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    wordDisplay.textContent = displayedWord;

    if (!displayedWord.includes('_')) {
        // El jugador ha ganado
        alert("¡Has ganado!");
    }
}

function updateAttemptsDisplay() {
    const attemptsDisplay = document.getElementById("attempts");
    attemptsDisplay.textContent = attempts;

    if (attempts === 0) {
        // El jugador ha perdido
        alert("¡Has perdido! La palabra era: " + wordToGuess);
        restartGame(); // Reiniciar el juego automáticamente
    }
}

function drawHangman() {
    const canvas = document.getElementById("hangmanCanvas");
    const context = canvas.getContext("2d");

    // Limpiar el canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la base vertical
    context.beginPath();
    context.moveTo(20, 180);
    context.lineTo(20, 20);
    context.stroke();

    // Dibujar la base horizontal
    context.beginPath();
    context.moveTo(20, 20);
    context.lineTo(100, 20);
    context.stroke();

    // Dibujar la cuerda
    context.beginPath();
    context.moveTo(100, 20);
    context.lineTo(100, 40);
    context.stroke();

    // Determinar cuántos intentos restantes hay
    const remainingAttempts = 7 - attempts;

    if (remainingAttempts >= 1) {
        //Cabeza
        context.beginPath();
        context.arc(100, 70, 30, 0, Math.PI * 2);
        context.stroke();
    }

    if (remainingAttempts >= 2) {
        //Cuerpo
        context.beginPath();
        context.moveTo(100, 100);
        context.lineTo(100, 220);
        context.stroke();
    }

    if (remainingAttempts >= 3) {
        // Dibujar brazo derecho
        context.beginPath();
        context.moveTo(100, 120);
        context.lineTo(60, 80);
        context.stroke();
    }

    if (remainingAttempts >= 4) {
        // Dibujar brazo izquierdo
        context.beginPath();
        context.moveTo(100, 120);
        context.lineTo(140, 80);
        context.stroke();
    }

    if (remainingAttempts >= 5) {
        // Dibujar pierna derecha
        context.beginPath();
        context.moveTo(100, 220);
        context.lineTo(60, 260);
        context.stroke();
    }

    if (remainingAttempts >= 6) {
        // Dibujar pierna izquierda
        context.beginPath();
        context.moveTo(100, 220);
        context.lineTo(140, 260);
        context.stroke();
    }

    // Dibujar los números de intentos restantes
    context.font = "24px Arial";
    context.fillText(`Intentos: ${attempts}`, 10, 270);
}

// Resto del código...

// Llama a setupLetterButtons para crear los botones de letras en canvas
setupLetterButtons();

updateWordDisplay();
updateAttemptsDisplay();
