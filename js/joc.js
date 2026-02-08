//CONSTANTS IMMUTABLES 



// CONSTANTS DOM
const butnTornarObj = document.querySelector(".tornar");
const btnInstruccionsObj = document.querySelector(".instruccions");
const scoreboardSpanObj = document.querySelector(".scoreboard span");
const alphabet = document.querySelector(".alphabet");

const input = document.querySelector(".input-container input");
const eyeBtn = document.querySelector(".input-container button");
const startGameBtnObj = document.getElementById("startGame");
const title = document.querySelector(".title");
const puntsPartidesActuals = document.querySelector('.partidesActuals');
const totalPartides = document.querySelector('.totalPartides');
const partidesGuanyades = document.querySelector('.partidesGuanyades');
const partidaMesPunts = document.querySelector('.partidaMesPunts');
const img = document.querySelector("img");
const contador = document.querySelector(".contador");
const bodyGame = document.body;



//VARIABLES DEL JOC

let hiddenWord = [];
let shownWord = [];
let times = 0;
let streak = 0;
let found = false;
let count = 1; //image
let oldGame = false;
let tiempo = 30;
let intervalo = null;

//DEFINIR FUNCIONS
const help = async function () {


    window.open("instruccions.html", "Instruccions", "width=400,height=400");

}



const stopCountDown = function () {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
}


const countDown = function () {


    tiempo = 30;
    stopCountDown();


    intervalo = setInterval(() => {
        let minutos = Math.floor(tiempo / 60);
        let segundos = tiempo % 60;

        contador.textContent =
            `${minutos}:${segundos.toString().padStart(2, "0")}`;

        tiempo--;

        if (tiempo < 0) {
            clearInterval(intervalo);
            contador.textContent = "00:00";
            loseGame();
        }
    }, 1000);
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

const updateRecord = async function (finished) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/record", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                totalGames: player.games,
                wins: player.wonGames,
                maxPoints: typeof player.bestScore === "number" ? player.bestScore : 0,
                finished: finished
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error backend:", errorText);
            return;
        }

        const data = await response.json();
        console.log("Record actualizado:", data);

    } catch (error) {
        console.error("PUT fallido:", error);
    }
};

const createRecord = async function () {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/record", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                totalPoints: player.points,
                totalGames: player.games,
                wins: player.wonGames,
                maxPoints: player.bestScore,
                language: navigator.language.split("-")[0],
                finished: false
            })
        });

        if (!response.ok) throw new Error("Error al crear record");

        const data = await response.json();
        console.log("Record creado:", data);

        oldGame = true; // 🔥 Muy importante
    } catch (error) {
        console.error("POST fallido:", error);
    }
};



const init = async function () {
    try {
        const config = JSON.parse(sessionStorage.getItem("config"));
        spanIdiomaObj.textContent = `Idioma(${config.lang})`;
        scoreboardSpanObj.textContent = getValueCookies("name");

        const resposta = await fetch("http://127.0.0.1:8000/api/record");
        if (!resposta.ok) {
            console.log("No hay record, creando partida nueva...");
            await createRecord(); // esperar a que se cree
            player.games = 0;
            player.wonGames = 0;
            player.bestScore = 0;
            totalPartides.textContent = 0;
            partidesGuanyades.textContent = 0;
            partidaMesPunts.textContent = 0;
            return;
        }

        const objJson = await resposta.json();
        player.games = objJson.totalGames;
        player.wonGames = objJson.wins;
        player.bestScore = objJson.maxPoints;

        totalPartides.textContent = player.games;
        partidesGuanyades.textContent = player.wonGames;
        partidaMesPunts.textContent = player.bestScore;

        oldGame = objJson.finished === false;

    } catch (error) {
        console.log("Error al cargar record, creando partida nueva...");
        await createRecord();
        player.games = 0;
        player.wonGames = 0;
        player.bestScore = 0;
        totalPartides.textContent = 0;
        partidesGuanyades.textContent = 0;
        partidaMesPunts.textContent = 0;
    }
};

const changeBackgroundColor = function () {

    bodyGame.classList.add(config.bgColorClass);
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

const setLocalInfo = function () {

    const localInfo = {

        name: player.name,
        bestScore: player.bestScore
    }

    localStorage.setItem("localInfo", JSON.stringify(localInfo));
}

const resetTitleColor = function () {

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
            player.points += 3;
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

const resetPoints = function () {

    player.points = 0;
    puntsPartidesActuals.textContent = player.points;
    streak = 0;
}

const winGame = function () {

    stopCountDown();
    count = 1;
    totalPartides.textContent = ++player.games;
    partidesGuanyades.textContent = ++player.wonGames;
    title.style.backgroundColor = "#70b578";


    if (player.points > player.bestScore || player.bestScore == "No hi a puntuacio") {

        partidaMesPunts.textContent = player.points;
        player.bestScore = player.points;


    }


    disableAllLetters();
    enableInputGameButton();

    if (oldGame) {

        updateRecord(true);
    } else {

        createRecord();
    }



}


const loseGame = function () {

    stopCountDown();

    totalPartides.textContent = ++player.games;
    title.style.backgroundColor = "#ff0000ff";
    count = 1;
    showWord();
    disableAllLetters();
    enableInputGameButton();



    if (!oldGame) {

        createRecord();
    } else {

        updateRecord(true);
    }





}

const jugada = function (letter, obj) {
    obj.disabled = true;
    addSubtractPoints(letter);
    title.textContent = shownWord.join(" ");

    if (!shownWord.includes('_')) {

        winGame();
        setLocalInfo();

    }

    if (count === 6) {

        loseGame();
        setLocalInfo();
    }



}

const createButtonsByLanguage = function (data) {


    const buttonCreated = document.createElement("button");
    buttonCreated.textContent = data;
    buttonCreated.disabled = true;
    buttonCreated.addEventListener("click", function () {

        jugada(data, buttonCreated);
    });

    alphabet.appendChild(buttonCreated);
}



const loadMenu = async function () {

    try {

        const idioma = navigator.language
        const idiomaBase = idioma.split("-")[0];
        const resposta = await fetch(`http://127.0.0.1:8000/api/alphabet/${idiomaBase}`);
        const objJson = await resposta.json();

        for (let i = 0; i < objJson.length; i++) {

            createButtonsByLanguage(objJson[i].letter);


        }


    } catch (error) {

    }

}



const getRandomWord = async function () {

    try {
        const idioma = navigator.language
        const idiomaBase = idioma.split("-")[0];
        const resposta = await fetch(`http://127.0.0.1:8000/api/random/word/${idiomaBase}`);
        const objJson = await resposta.json();
        hiddenWord = objJson.name.toUpperCase();
        console.log(hiddenWord);
        loadSecretWord();
        title.textContent = shownWord.join(" ");
        disableButtonInput();


    } catch (error) {

    }




}

// OBJ PLAYER
const player = {
    name: getValueCookies("name"),
    points: 0,
    games: 0,
    wonGames: 0,
    bestScore: 0
}



//ADDEVENTLISTENERS
butnTornarObj.addEventListener("click", function () {

    updateRecord(false);
    getBack();


});


btnInstruccionsObj.addEventListener("click", function () {

    help();

});


document.addEventListener("DOMContentLoaded", function () {

    init();
    loadMenu();

});



startGameBtnObj.addEventListener("click", function () {


    enableAllLetters();
    getRandomWord();
    resetPoints();
    resetTitleColor();
    countDown();

});



