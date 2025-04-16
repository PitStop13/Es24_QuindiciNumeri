window.addEventListener("load",function(){
    let wrapper = document.getElementById("wrapper");
    //Creo ora il gioco del 15 andando a creare una griglia di 4 * 4 con i numeri casuali e 1 spazio vuoto che servirà èoi per spostare i numeri 
    creaGriglia();
});

//Funzione crea griglia 4*4 con pos casuali
function creaGriglia(){
    let wrapper = document.getElementById("wrapper");
    let numeri;

    do {
        numeri = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""];
        numeri.sort(() => Math.random() - 0.5);
    } while (!isSolvable(numeri));

    wrapper.innerHTML = ""; 

    for(let i=0; i<16; i++){
        let div = document.createElement("div");
        div.className = "quadrato";
        div.innerHTML = numeri[i];
        div.setAttribute("id", numeri[i]);
        wrapper.appendChild(div);
    }

    let quadrati = document.getElementsByClassName("quadrato");
    for(let i=0; i<quadrati.length; i++){
        quadrati[i].addEventListener("click", function(){
            spostaQuadrato(quadrati[i]);
        });
    }
}

// Calcolo risolvibilità fatto con chatGpt
function isSolvable(puzzle) {
    let inversions = 0;
    let array = puzzle.filter(x => x !== ""); // escludi vuoto

    // Conta le inversioni
    for(let i = 0; i < array.length; i++) {
        for(let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) inversions++;
        }
    }

    // Trova riga (0-based) dove si trova il vuoto
    let indexVuoto = puzzle.indexOf("");
    let rigaVuoto = Math.floor(indexVuoto / 4);
    let rigaDalBasso = 3 - rigaVuoto; // 0-based, quindi 3-riga

    // Applica regola
    if ((rigaDalBasso % 2 === 0) === (inversions % 2 !== 0)) {
        return true;
    }

    return false;
}

// Funzione per spostare il quadrato
function spostaQuadrato(quadrato) {
    let quadrati = document.getElementsByClassName("quadrato");

    // Trova il quadrato vuoto
    let vuoto;
    for (let i = 0; i < quadrati.length; i++) {
        if (quadrati[i].innerHTML == "") {
            vuoto = quadrati[i];
            break;
        }
    }

    // Calcola le posizioni (da 0 a 15)
    let posQuadrato = -1;
    let posVuoto = -1;

    for (let i = 0; i < quadrati.length; i++) {
        if (quadrati[i] == quadrato) {
            posQuadrato = i;
        }
        if (quadrati[i] == vuoto) {
            posVuoto = i;
        }
    }

    if (
        posVuoto == posQuadrato - 1 && posQuadrato % 4 !== 0 || // sinistra
        posVuoto == posQuadrato + 1 && posVuoto % 4 !== 0 ||    // destra
        posVuoto == posQuadrato - 4 ||                          // sopra
        posVuoto == posQuadrato + 4                             // sotto
    ) {
        vuoto.innerHTML = quadrato.innerHTML;
        quadrato.innerHTML = "";
        controllaVittoria();
    }
}

//Funzione per controllare la vittoria scorrendo la griglia
function controllaVittoria() {
    let quadrati = document.getElementsByClassName("quadrato");
    let vittoria = true;

    for (let i = 0; i < 15; i++) {
        if (quadrati[i].innerHTML != (i + 1)) {
            vittoria = false;
            break;
        }
    }

    if (quadrati[15].innerHTML != "") {
        vittoria = false;
    }

    if (vittoria) {
        alert("Complimenti! Hai completato il puzzle!");
    }
}
