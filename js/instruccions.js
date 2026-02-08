const closeBtn = document.getElementById("closeInstructions");
const txtInstruccionsObj = document.getElementById("txt");


// function

const updateInfoByLanguage = async function () {

    const idioma = navigator.language
    const idiomaBase = idioma.split("-")[0];
    const resposta = await fetch(`http://127.0.0.1:8000/api/instruction/${idiomaBase}`);
    const objJson = await resposta.json();
    txtInstruccionsObj.textContent = objJson.description;


}
//addEventListener

closeBtn.addEventListener("click", function () {
    window.close();
});


document.addEventListener("DOMContentLoaded", function () {

    updateInfoByLanguage();

});





