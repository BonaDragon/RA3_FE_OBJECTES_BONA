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


//VARIABLES DEL JOC

let hiddenWord = [];
let shownWord = [];
let plays = 0;

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




const init = function () {

    const config = JSON.parse(sessionStorage.getItem("config"));
    spanIdiomaObj.textContent = `Idioma(${config.lang})`;
    scoreboardSpanObj.textContent = getValueCookies("name");
}

const loadMenu = function () {

    for (let i = 0; i < letters.length; i++) {

        const buttonCreated = document.createElement("button");
        buttonCreated.textContent = letters[i];
        buttonCreated.addEventListener("click", function () {

            for (let j = 0; j < hiddenWord.length; j++) {
                if (hiddenWord[j] === letters[i]) {
                    shownWord[j] = letters[i];

                     plays++
                }
            }

            title.textContent = shownWord.join(" ");
            buttonCreated.disabled = true;

        })

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

