//CONSTANTS IMMUTABLES 
const config = {
    lang: "",
    userAgent: "",
    url: "",
    bgColorClass: ""
}

const sUsrAg = navigator.userAgent;
const lan = navigator.language;
const href = location.href;
const points = localStorage.getItem("points");


// CONSTANTS DOM

const inputNameObj = document.getElementById("name");
const startButtonObj = document.getElementById("startGame");
const deleteButtonObj = document.getElementById("deletePoints");
const score = document.querySelector(".puntuacio p");
const navegador = document.querySelector(".navigator p");
const language = document.querySelector(".language p");
const info = document.querySelector(".info p");



//VARIABLES DEL JOC




//DEFINIR FUNCIONS

const saveName = function () {

    document.cookie = "name=" + inputNameObj.value;
}


const fillConfig = function () {

    config.lang = lan;
    config.userAgent = sUsrAg;
    config.href = href;
    sessionStorage.setItem("config", JSON.stringify(config));
}

const startGame = function () {

    window.location.assign("game.html");
}

const resetPoints = function () {

    localStorage.removeItem("points");
    score.textContent = points;

}

const init = function () {

    navigator.textContent = sUsrAg;
    language.textContent = lan;
    info.textContent = href;

    if (!points) {

        score.textContent = "No hi ha puntuacio actual";

    } else {

        score.textContent = points;
    }

}





//ADDEVENTLISTENERS

startButtonObj.addEventListener('click', function () {

    if (inputNameObj) {

        saveName();
        fillConfig();
        startGame();

    } else {

        alert("Has d’informar el nom d’un jugador.");
    }


});


deleteButtonObj.addEventListener('click', function () {


    resetPoints();


});


document.addEventListener("DOMContentLoaded", function () {

    init();
   
});



