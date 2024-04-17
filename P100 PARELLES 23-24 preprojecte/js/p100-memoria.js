var ampladaCarta, alcadaCarta;
var separacioH = 20, separacioV = 20;
var nFiles = 10, nColumnes = 10;
let primer = true;
var files, columnes, amplada, altura;
var clicsRestants;
var numCartes;

var jocCartes = [
    'carta1', 'carta2', 'carta3', 'carta4', 'carta5','carta6','carta7','carta8','carta9','carta10','carta11','carta12','carta13','carta14', 'carta15', 'carta16', 'carta24', 'carta25', 'carta26',
]; 
var cartesEmparellades = [];
var aux = [];

function iniciJoc() { //cooking
    let j = 0;
    $("#tauler").css({ //mida tauler
        "width": amplada + "px",
        "height": altura + "px"
    });
    $("#comptador").append("<p>Clics restants: "+clicsRestants+"</p>");
    crearCartes(quantesCartes);
    for (let f = 1; f <= files; f++) {
        for (let c = 1; c <= columnes; c++) {
            var carta;

            $("#tauler").append("<div class=" + "'carta'" + " id='" + "f" + f + "c" + c + "'> <div class=" + "'cara darrera'" + "></div><div class=" + "'cara davant'" + "></div></div>");
            ampladaCarta = $(".carta").width();
            alcadaCarta = $(".carta").height();
            carta = $("#f" + f + "c" + c);
            carta.css({
                "left": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
                "top": ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
            });
            carta.find(".davant").addClass(cartesEmparellades[j]);
            j++;
        }
    }
    $(".carta").on("click", function () {
        var select = $(this);
        var p = document.querySelector("#comptador p");
        clicsRestants--;
        p.innerHTML = "Clics restants: "+clicsRestants;
        
        if (select.hasClass("carta-girada")) {
            return;
        }
        select.toggleClass("carta-girada");
        if (primer) {
            cartesSeleccionades.push($(this));
            primer = false;
        } else {
            cartesSeleccionades.push($(this));
            checkParella();
            checkWin();
            checkLoss();
            primer = true;
        }
    });
};

var cartesSeleccionades = [];

function checkParella() { //func para ver si es parell o no //luego compararlo con joan
    var primeraCarta = cartesSeleccionades[0];
    var segonaCarta = cartesSeleccionades[1];
    var primeraClasse = primeraCarta.find(".davant").attr("class");
    var segonaClasse = segonaCarta.find(".davant").attr("class");

    if (primeraClasse === segonaClasse) {
        numCartes = numCartes - 2;
        setTimeout(function () {
            primeraCarta.remove();
            segonaCarta.remove();
        }, 500);
    } else {
        setTimeout(function () {
            primeraCarta.toggleClass("carta-girada");
            segonaCarta.toggleClass("carta-girada");
        }, 500);
    }
    cartesSeleccionades = [];
}

function accionImagen(id) {
    var imagen = document.getElementById(id);
    if (imagen.classList.contains("expandida")) {
        imagen.classList.remove("expandida");
    } else {
        // Remueve la clase "expandida" de todas las imágenes antes de expandir la actual
        var imagenes = document.querySelectorAll(".contenedor-imagen");
        imagenes.forEach(function(img) {
            img.classList.remove("expandida");
        });
        imagen.classList.add("expandida");
    }
}
function barrejarArray(array){
    let len = array.length,
        idx;
    for (idx = len - 1; idx > 0; idx--) {
        let idxRand = Math.floor(Math.random() * (idx + 1) );
        var temp = array[idx];
        array[idx] = array[idxRand];
        array[idxRand] = temp;
    }
}

function crearCartes(quantesCartes){ //tocar esto despues
    barrejarArray(jocCartes);
    for(let i = 0; i<quantesCartes/2; i++){
        cartesEmparellades[i] = jocCartes.pop();
    }
    copy(cartesEmparellades, aux);
    barrejarArray(aux);
    for(let i = quantesCartes/2; i<quantesCartes; i++){
        cartesEmparellades[i] = aux.pop();
    }
    barrejarArray(cartesEmparellades);
    
}

function copy(arrayCopiat, arrayCopia){
    for(let i=0; i<arrayCopiat.length; i++){
        arrayCopia[i] = arrayCopiat[i];
    }
}

function checkWin(){
    if(numCartes == 0){
        $("#comptador").append("<p>Has guanyat!!!</p>");
    }
}

function checkLoss(){
    if(clicsRestants == 0){
        $("#comptador").append("<p>Has perdut!</p>");
    }
}

function checkParam(){ //ver como cambiar entre decks
    var deck, pokemon;
    deck = document.getElementById("imagen1");
    pokemon = document.getElementById("imagen2");

    if(deck.classList.contains("expandida")){ //si deck seleccionada

    } else if (pokemon.classList.contains("expandida")){ //si pokemon seleccionada

    } else { //si cap seleccionada, ensenyar error

    }
    
}

function jugar(){
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".juego").style.display = "block";
    iniciJoc();
}
function activarHover1(boton) {
    removerHover();
    boton.classList.add("hover-activado1");
    files = 2;
    columnes = 2;
    numCartes = 4;
    quantesCartes = 4;
    clicsRestants = 12;
    altura = 300;
    amplada = 220;
}

function activarHover2(boton) {
    removerHover();
    boton.classList.add("hover-activado2");
    files = 2;
    columnes = 4;
    numCartes = 8;
    quantesCartes = 8;
    clicsRestants = 24;
    altura = 300;
    amplada = 420;
}

function activarHover3(boton) {
    removerHover();
    boton.classList.add("hover-activado3");
    files = 4;
    columnes = 4;
    numCartes = 16;
    quantesCartes = 16;
    clicsRestants = 48;
    altura = 580;
    amplada = 420;
}

function activarHover4(boton) {
    removerHover();
    boton.classList.add("hover-activado4");
}

function removerHover() {
    var botones = document.querySelectorAll(".botonFacil, .botonMedio, .botonDificil, .botonJugar");
    botones.forEach(function(boton) {
        boton.classList.remove("hover-activado1", "hover-activado2", "hover-activado3", "hover-activado4");
    });
}
