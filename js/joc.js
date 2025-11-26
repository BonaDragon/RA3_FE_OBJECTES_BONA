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


//VARIABLES DEL JOC

let hiddenWord = [];
let shownWord = [];
let points = 0;
let times = 0;
let streak = 0;
let games = 0;
let wonGames = 0;
let bestScore = 0;

//DEFINIR FUNCIONS
const help = function () {

    window.open("instruccions.html", "Instruccions", "width=400,height=400");

}

const getBack = function () {

    window.location.assign("index.html");

}

const loadSecretWord = function () {

    for (let i = 0; i < hiddenWord.length; i++) {

        shownWord.push("_");
    }


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

const enableAll = function (obj) {

    for (let i = 0; i < letters.length; i++) {

        obj.disabled = false;

    }

    input.disabled = false;
    startGameBtnObj.disabled = false;
}




const init = function () {

    const config = JSON.parse(sessionStorage.getItem("config"));
    spanIdiomaObj.textContent = `Idioma(${config.lang})`;
    scoreboardSpanObj.textContent = getValueCookies("name");
}

const jugada = function (letter, obj) {
    obj.disabled = true;
    let found = false;
    let times = 0;

    for (let j = 0; j < hiddenWord.length; j++) {
        if (hiddenWord[j] === letter) {
            shownWord[j] = letter;
            found = true;
            times++;
        }
    }

    if (found) {
        streak++;

        if (times === 1) {
            points += streak;
        } else if (times > 1) {
            points *= 2;
        }
    } else {
        streak = 0;
        if (points > 0) points -= 1;
    }

    puntsPartidesActuals.textContent = points;
    title.textContent = shownWord.join(" ");

    if (!shownWord.includes('_')) {

        totalPartides.textContent = ++games;
        partidesGuanyades.textContent = ++wonGames;
        title.style.backgroundColor = "#70b578";


        if (points > bestScore) {

            partidaMesPunts.textContent = points;

        }

        points = 0;
        enableAll(obj);



    }


}




const loadMenu = function () {

    for (let i = 0; i < letters.length; i++) {

        const buttonCreated = document.createElement("button");
        buttonCreated.textContent = letters[i];
        buttonCreated.addEventListener("click", function () {
            jugada(letters[i], buttonCreated);
        });

        alphabet.appendChild(buttonCreated);
    }
}

const disableButtonInput = function () {

    input.disabled = true;
    startGameBtnObj.disabled = true;
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

    checkWord();


});

