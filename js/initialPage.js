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



// CONSTANTS DOM

const inputNameObj = document.getElementById("name");
const startButtonObj = document.getElementById("startGame");
const deleteButtonObj = document.getElementById("deletePoints");
const score = document.querySelector(".puntuacio p");
const navegador = document.querySelector(".navegador p");
const language = document.querySelector(".language p");
const info = document.querySelector(".info p");
const body = document.body;


//VARIABLES DEL JOC

let backgroundColor = "";
let points = localStorage.getItem("points");

//DEFINIR FUNCIONS


const init = function () {

    language.textContent = lan;
    info.textContent = href;
    score.textContent = !points ? "No hi ha puntuacio actual" : points;

    if (navigator.userAgent.includes("Chrome")) {
        navegador.textContent = "Chrome";
        backgroundColor = "chrome-bg";
    } else if (navigator.userAgent.includes("Firefox")) {
        navegador.textContent = "Firefox";
         backgroundColor = "firefox-bg";
    } else if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
        navegador.textContent = "Safari";
         backgroundColor = "safari-bg";
    } else if (navigator.userAgent.includes("Edge")) {
        navegador.textContent = "Edge";
         backgroundColor = "edge-bg";
    }

   body.classList.add(backgroundColor);

}

const saveName = function () {

    document.cookie = "name=" + inputNameObj.value;
}


const fillConfig = function () {

    config.lang = lan;
    config.userAgent = sUsrAg;
    config.href = href;
    config.bgColorClass = backgroundColor;
    sessionStorage.setItem("config", JSON.stringify(config));
}

const startGame = function () {

    window.location.assign("game.html");
}

const resetPoints = function () {

    localStorage.removeItem("points");
    score.textContent = "0";

}





//ADDEVENTLISTENERS

startButtonObj.addEventListener('click', function () {

    if (inputNameObj.value) {

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



