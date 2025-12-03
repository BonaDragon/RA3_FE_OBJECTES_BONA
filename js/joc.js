//CONSTANTS IMMUTABLES 

const letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];




// CONSTANTS DOM
const butnTornarObj = document.querySelector(".tornar");
const btnInstruccionsObj = document.querySelector(".instruccions");
const scoreboardSpanObj = document.querySelector(".scoreboard span");
const alphabet = document.querySelector(".alphabet");
const spanIdiomaObj = document.querySelector("header span")
const input = document.querySelector(".input-container input");
const eyeBtn = document.querySelector(".input-container button");
const startGameBtnObj = document.getElementById("startGame");
const title = document.querySelector(".title");
const puntsPartidesActuals = document.querySelector('.partidesActuals');
const totalPartides = document.querySelector('.totalPartides');
const partidesGuanyades = document.querySelector('.partidesGuanyades');
const partidaMesPunts = document.querySelector('.partidaMesPunts');
const img = document.querySelector("img");



//VARIABLES DEL JOC

let hiddenWord = [];
let shownWord = [];
let times = 0;
let streak = 0;
let found = false;
let count = 1; //image

//DEFINIR FUNCIONS
const help = function () {

    window.open("instruccions.html", "Instruccions", "width=400,height=400");

}

const getBack = function () {

    window.location.assign("index.html");

}

const loadSecretWord = function () {

    shownWord = [];

    for (let i = 0; i < hiddenWord.length; i++) {

        shownWord.push("_");
    }


}

const showWord = function () {

    shownWord = [];

    for (let i = 0; i < hiddenWord.length; i++) {

        shownWord.push(hiddenWord[i]);
    }

    title.textContent = shownWord.join(" ");

}

const getValueCookies = function (clauSeleccio) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [clau, valor] = cookie.trim().split('=');
        if (clau === clauSeleccio) {
            return valor;
        }
    }
    return null;
}




const init = function () {

    const config = JSON.parse(sessionStorage.getItem("config"));
    spanIdiomaObj.textContent = `Idioma(${config.lang})`;
    scoreboardSpanObj.textContent = getValueCookies("name");

}

const enableAllLetters = function () {

    const buttonsObj = document.querySelectorAll('.alphabet button');

    for (var i = 0; i < buttonsObj.length; i++) {
        buttonsObj[i].disabled = false;
    }



}

const disableAllLetters = function () {

    const buttonsObj = document.querySelectorAll('.alphabet button');

    for (var i = 0; i < buttonsObj.length; i++) {
        buttonsObj[i].disabled = true;
    }

}

const enableInputGameButton = function () {

    input.disabled = false;
    startGameBtnObj.disabled = false;
}

const disableButtonInput = function () {

    input.disabled = true;
    startGameBtnObj.disabled = true;
}

const changeImage = function () {

    count++;
    img.src = `images/img_${count}.png`;


}

const setLocalInfo = function() {

    const localInfo = {

        name: player.name,
        bestScore: player.bestScore
    }

    localStorage.setItem("localInfo", JSON.stringify(localInfo));
}

const resetTitleColor = function() {

     title.style.backgroundColor = "#c3c9f5";
}

const addSubtractPoints = function (letter) {

    found = false;
    times = 0;

    for (let i = 0; i < hiddenWord.length; i++) {
        if (hiddenWord[i] === letter) {
            shownWord[i] = letter;
            found = true;
            times++;
        }
    }

    if (found) {
        streak++;

        if (times === 1) {
            player.points += streak;
        } else if (times > 1) {
           player.points *= 2;
        }
    } else {
        changeImage();
        streak = 0;
        if (player.points > 0) player.points -= 1;
    }

    puntsPartidesActuals.textContent = player.points;

}

const resetPoints = function() {

    player.points = 0;
    puntsPartidesActuals.textContent = player.points;
    streak = 0;
}

const winGame = function () {

    totalPartides.textContent = ++player.games;
    partidesGuanyades.textContent = ++player.wonGames;
    title.style.backgroundColor = "#70b578";


    if (player.points > player.bestScore || player.bestScore == "No hi a puntuacio") {

        partidaMesPunts.textContent = player.points;
        player.bestScore = player.points;

    }


    disableAllLetters();
    enableInputGameButton();

}


const loseGame = function () {

    title.style.backgroundColor = "#ff0000ff";
    count = 1;
    showWord();
    disableAllLetters();
    enableInputGameButton();
    
}

const jugada = function (letter, obj) {
    obj.disabled = true;
    addSubtractPoints(letter);
    title.textContent = shownWord.join(" ");

    if (!shownWord.includes('_')) {

        winGame();
        setLocalInfo();

    }

    if (count === 9) {

        loseGame();
        setLocalInfo();
    }

    

}



const loadMenu = function () {

    for (let i = 0; i < letters.length; i++) {

        const buttonCreated = document.createElement("button");
        buttonCreated.textContent = letters[i];
        buttonCreated.disabled = true;
        buttonCreated.addEventListener("click", function () {

            jugada(letters[i], buttonCreated);
        });

        alphabet.appendChild(buttonCreated);
    }
}



const checkWord = function () {

    for (let i = 0; i < input.value.length; i++) {

        if (!isNaN(input.value[i])) {


            alert("La paraula no pot contenir números.")
            return;
        }

    }

    if (!input.value) {

        alert("Has d’afegir una paraula per poder començar a jugar.");


    } else if (input.value.length <= 3) {


        alert("La paraula ha de contenir més de 3 caràcters.");


    } else {

        hiddenWord = input.value.toUpperCase();
        loadSecretWord();
        title.textContent = shownWord.join(" ");
        disableButtonInput();
    }



}

// OBJ PLAYER
const player = {
    name: getValueCookies("name") ,
    points: 0,
    games: 0,
    wonGames: 0,
    bestScore: "No hi a puntuacio"
}



//ADDEVENTLISTENERS
butnTornarObj.addEventListener("click", function () {

    getBack();


});


btnInstruccionsObj.addEventListener("click", function () {

    help();

});


document.addEventListener("DOMContentLoaded", function () {

    init();
    loadMenu();

});

eyeBtn.addEventListener("click", function () {
    if (input.type === "password") {
        input.type = "text";
        eyeBtn.textContent = "🙈";
    } else {
        input.type = "password";
        eyeBtn.textContent = "👁️";
    }
});

startGameBtnObj.addEventListener("click", function () {

    enableAllLetters();
    checkWord();
    resetPoints();
    resetTitleColor();

});

