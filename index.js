window.addEventListener("load", function(){
    creaMat();
    caricaMat();
});

function creaMat(){
    const wrapper = document.getElementById("wrapper");
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++)
        {
            const div = document.createElement("div");
            div.addEventListener("click", divClick);
            div.id = `div-${i}-${j}`;
            wrapper.appendChild(div);
        }
    }
}


function divClick(){
    const i = parseInt(this.id.split("-")[1]);
    const j = parseInt(this.id.split("-")[2]);
    //cella sopra
    if(i-1>=0){
        const sopra = document.getElementById(`div-${i-1}-${j}`);
        if(sopra.textContent ==""){ 
            scambiaDiv(this,sopra);
            return;
        }
    }
    //cella sotto
    if(i+1<4){
        const sotto = document.getElementById(`div-${i+1}-${j}`);
        if(sotto.textContent ==""){ 
            scambiaDiv(this,sotto);
            return;
        }
    }

    //cella destra
    if(j+1<4){
        const destra = document.getElementById(`div-${i}-${j+1}`);
        if(destra.textContent ==""){ 
            scambiaDiv(this,destra);
            return;
        }
    }
    //cella sinistra
    if(j-1>=0){
        const sinistra = document.getElementById(`div-${i}-${j-1}`);
        if(sinistra.textContent ==""){ 
            scambiaDiv(this,sinistra);
            return;
        }
    }
    
}
function scambiaDiv(pieno,vuoto){
    vuoto.textContent = pieno.textContent;
    vuoto.style.backgroundColor = "blue";
    pieno.textContent ="";
    pieno.style.backgroundColor = null;
}
function caricaMat(){
    for(let cont = 1; cont <= 15; cont++)
    {
        let divRnd;
        do{
            const i = Math.floor(Math.random()*4);
            const j = Math.floor(Math.random()*4);
            divRnd = document.getElementById(`div-${i}-${j}`);
        }while(divRnd.textContent != "");
        divRnd.style.backgroundColor = "blue";
        divRnd.textContent = cont;
    }
}

