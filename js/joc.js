//CONSTANTS IMMUTABLES 

const letters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];



// CONSTANTS DOM
const btnInstruccionsObj = document.getElementById("idk"); // adaptar al HTML cuando se haga 
const btnInstruccionsCloseObj = document.getElementById("idk");
const spanIdioma = document.getElementById("idk");
const letterSection = document.getElementById("idk");

//VARIABLES DEL JOC

let hiddenWord = []; 
let shownWord = [];

//DEFINIR FUNCIONS
const help = function () {

    window.open("instruccions.html", "Instruccions", "width=400", "heigth=400");

}

const loadSecretWord = function(){

for(let i = 0; i > hiddenWord.length; i++){

       shownWord.push("_");
}



}

const init = function () {

    const config = JSON.parse(sessionStorage.getItem("config"));
    spanIdioma.textContent = `Idioma(${config.lang})`;
}

const loadMenu = function(){ 

    for(let i = 0; i< letters.length; i++) { 

       const buttonCreated = document.createElement("button");
       buttonCreated.textContent = letters[i];
       buttonCreated.addEventListener("click", function(){

            letters[i] // access a la lletra, falta la "logic" per a fer la comparació amb la paraula secreta
       })

       letterSection.appendChild(buttonCreated);
    }
}



//ADDEVENTLISTENERS

btnInstruccionsObj.addEventListener("click", function () {

    help();

});


btnInstruccionsCloseObj.addEventListener("click", function () {

    window.close();
});

document.addEventListener("DOMContentLoaded", function () {

    init();
    loadMenu();
});