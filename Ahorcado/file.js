window.onload = function () {
    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var word; //variable de la letra word
    var guess; //adivine
    var guesses = []; //palabra adivinada
    var lives; //vidas
    var counter; //contador de vidas
    var space; //escapacio de las letras

    // Obtener los elementos
    var showLives = document.getElementById("mylives");

    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    };

    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    };

    //VIDAS
    comments = function () {
        showLives.innerHTML = "Tienes " + lives + " intentos";
        if (lives < 1) {
            showLives.innerHTML = "PERDISTE - presiona el botón para volver a intentarlo";
        }
        for (var i = 0; i < guesses.length; i++) {
            if (counter + space === guesses.length) {
                showLives.innerHTML = "GANASTE!";
            }
        }
    };

    var animate = function () {
        var drawMe = lives;
        drawArray[drawMe]();
    };

    //cuerpo
    canvas = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    };

    frame1 = function () {
        draw(0, 150, 150, 150);
    };

    frame2 = function () {
        draw(10, 0, 10, 600);
    };

    frame3 = function () {
        draw(0, 5, 70, 5);
    };

    frame4 = function () {
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    rightArm = function () {
        draw(60, 46, 100, 50);
    };

    leftArm = function () {
        draw(60, 46, 20, 50);
    };

    rightLeg = function () {
        draw(60, 70, 100, 100);
    };

    leftLeg = function () {
        draw(60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

    //funcion de click
    check = function () {
        list.onclick = function () {
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === geuss) {
                    guesses[i].innerHTML = geuss;
                    counter += 1;
                }
            }
            var j = (word.indexOf(geuss));
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            } else {
                comments();
            }
        };
    };

    //juego
    juego = function () {
        words = ['JAVA', 'MYSQL', 'AHORCADO', 'CANVAS'];
        word = words[Math.floor(Math.random() * words.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        guesses = [];
        lives = 7; //vidas 10
        counter = 0;
        space = 0;
        result();
        comments();
        canvas();
    };

    juego();

    // Botón de pista
    var hints = {
        'JAVA': 'Un lenguaje de programación popular',
        'MYSQL': 'Un sistema de gestión de bases de datos',
        'AHORCADO': 'El nombre de este juego',
        'CANVAS': 'Una tecnología de HTML5 para dibujar gráficos en el navegador'
    };

    var hintButton = document.getElementById('hint');
    hintButton.addEventListener('click', function () {
        var currentWord = word.toUpperCase();
        if (hints.hasOwnProperty(currentWord)) {
            alert('Pista: ' + hints[currentWord]);
        } else {
            alert('Lo siento, no hay pista disponible para esta palabra.');
        }
    });

    //resetearlo con el boton
    document.getElementById('reset').onclick = function () {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        context.clearRect(0, 0, 400, 400);
        juego();
    };
};
