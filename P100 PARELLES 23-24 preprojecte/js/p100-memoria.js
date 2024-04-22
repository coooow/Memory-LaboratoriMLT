var ampladaCarta, alcadaCarta;
var separacioH = 20, separacioV = 20;
var nFiles = 10, nColumnes = 10;
let primer = true;
var files, columnes, amplada, altura;
var clicsRestants, numCartes;
var cartesEmparellades = [], cartesSeleccionades = [];;
var timer;
var deckValue; //si es 1 == deck, 2 == pokemon
var tipusDeck;

//FUNCIONS SETUP/DURANT EL JOC

function iniciJoc() { //setup del joc, genera el tauler, cartes, timer i inclou tot el que pasa en el onclick
    var cardWidth, cardHeight;
    switch(deckValue){
        case 1: cardHeight = 120; cardWidth = 80; break;
        case 2: cardHeight = 111; cardWidth = 111; break;
    }
    setBackground(deckValue);
    fonsContenidor(deckValue);
    amplada = separacioH*(columnes+1) + cardWidth*columnes;
    altura = separacioV*(files+1) + cardHeight*files;
    $("#tauler").css({ //mida tauler
        "width": amplada + "px",
        "height": altura + "px"
    });
    $("#comptador").append("<p>Clics restants: " + clicsRestants + "</p>");
    $("#timer").append("<p>Temps restant: " + timer + "</p>");
    crearCartes(quantesCartes);
    tiempo();
    repartirCartes();
    $(".carta").on("click", function () {
        var select = $(this);
        var p = document.querySelector("#comptador p");
        clicsRestants--;
        p.innerHTML = "Clics restants: " + clicsRestants;

        if (select.hasClass("carta-girada")) {
            return;
        }
        playFlip();
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

function checkParella() { //func para ver si es parell o no 
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

function checkWin() { //mira si has guanyat
    if (numCartes == 0) {
        $("#comptador").append("<p>Has guanyat!!!</p>");
    }
}

function checkLoss() { //mira si has perdut
    if (clicsRestants == 0) {
        $("#comptador").append("<p>Has perdut!</p>");
    }
}

function jugar() { //funcio del boto jugar al menu, prepara el joc i veu si el jugador ha triat la baralla i dificultat
    var deck, pokemon;
    let check = true;
    deck = document.getElementById("imagen1");
    pokemon = document.getElementById("imagen2");
    btnFacil = document.querySelector(".botonFacil");
    btnNormal = document.querySelector(".botonMedio");
    btnDificil = document.querySelector(".botonDificil");

    if (deck.classList.contains("expandida")) { //si deck seleccionada
        deckValue = 1;
        tipusDeck = 'deck';

    } else if (pokemon.classList.contains("expandida")) { //si pokemon seleccionada
        deckValue = 2;
        tipusDeck = 'pokemon';
    } else { //si cap seleccionada, ensenyar error
        check = false;
    }

    if (!(btnFacil.classList.contains("hover-activado1") || btnNormal.classList.contains("hover-activado2") || btnDificil.classList.contains("hover-activado3"))) {
        //si cap boto seleccionat, mostra un error
        //afegir error
        check = false;
    }

    if (check) {
        document.querySelector(".menu").style.display = "none";
        document.querySelector(".juego").style.display = "block";
        iniciJoc();
    }
}

function tiempo() { //funcio del timer
    var temps = document.querySelector("#timer p");
    interval = setInterval(function () {
        timer--;
        temps.innerHTML = "Temps restant: " + timer;
        if (timer == 0) {
            clearInterval(interval);
            $(".carta").off("click");
            $("#timer").append("<p>Has perdut!</p>");
        }
    }, 1000);
}

function setBackground(deck){ //defineix el fons de la pantalla depenent de la baralla
    var body = document.getElementById("fons");
    if(deck == 1){
        body.classList.add("fondojocpoker");
    } else if (deck == 2){
        body.classList.add("fondojocpokemon");
    }
}

function playFlip(){ //posa el so de girar carta
    const so = document.getElementById("audioGirar");
    so.play();
}

function fonsContenidor(deck){
    var contenidor = document.getElementById("contenidor-info");
    if(deck == 1){
        contenidor.classList.add("fichapoker");
    } else if (deck == 2){
        contenidor.classList.add("bolapokemon");
    }
}

//FUNCIONS MENU

function accionImagen(id) { //funció per seleccionar la baralla en el menu
    var imagen = document.getElementById(id);
    if (imagen.classList.contains("expandida")) {
        imagen.classList.remove("expandida");
    } else {
        // Remueve la clase "expandida" de todas las imágenes antes de expandir la actual
        var imagenes = document.querySelectorAll(".contenedor-imagen");
        imagenes.forEach(function (img) {
            img.classList.remove("expandida");
        });
        imagen.classList.add("expandida");
    }
}

function activarHover1(boton) { //funcions pels botons del menu
    removerHover();
    boton.classList.add("hover-activado1");
    files = 2;
    columnes = 2;
    numCartes = 4;
    quantesCartes = 4;
    clicsRestants = 12;
    timer = numCartes*3;
}

function activarHover2(boton) {
    removerHover();
    boton.classList.add("hover-activado2");
    files = 2;
    columnes = 4;
    numCartes = 8;
    quantesCartes = 8;
    clicsRestants = 24;
    timer = numCartes*3;
}

function activarHover3(boton) {
    removerHover();
    boton.classList.add("hover-activado3");
    files = 4;
    columnes = 4;
    numCartes = 16;
    quantesCartes = 16;
    clicsRestants = 48;
    timer = numCartes*3;
}

function activarHover4(boton) {
    removerHover();
    boton.classList.add("hover-activado4");
}

function removerHover() {
    var botones = document.querySelectorAll(".botonFacil, .botonMedio, .botonDificil, .botonJugar");
    botones.forEach(function (boton) {
        boton.classList.remove("hover-activado1", "hover-activado2", "hover-activado3", "hover-activado4");
    });
}

//FUNCIONS CREACIO CARTES

function barrejarArray(array) { //funcio per barrejar l'array
    let len = array.length,
        idx;
    for (idx = len - 1; idx > 0; idx--) {
        let idxRand = Math.floor(Math.random() * (idx + 1));
        var temp = array[idx];
        array[idx] = array[idxRand];
        array[idxRand] = temp;
    }
}

function crearCartes(quantesCartes) { //funcio de creacio de cartes
    let j;
    var aux = [];
    var pairList = [];
    pairList.fill(0, 0, 16);
    for (let i = 0; i < quantesCartes / 2; i++) {
        do {
            j = Math.floor(Math.random() * 23);
        } while (pairList[j] === 1);
        pairList[j] = 1;
        cartesEmparellades[i] = 'carta' + j;
    }
    barrejarArray(cartesEmparellades);
    copy(cartesEmparellades, aux);
    barrejarArray(aux);
    for (let i = quantesCartes / 2; i < quantesCartes; i++) {
        cartesEmparellades[i] = aux.pop();
    }
    barrejarArray(cartesEmparellades);

}

function copy(arrayCopiat, arrayCopia) { //copia un array
    for (let i = 0; i < arrayCopiat.length; i++) {
        arrayCopia[i] = arrayCopiat[i];
    }
}

function repartirCartes(){ //reparteix les cartes creades 
    let j = 0;
    for (let f = 1; f <= files; f++) {
        for (let c = 1; c <= columnes; c++) {
            var carta;

            $("#tauler").append("<div class='" + "carta " + tipusDeck + "' id='" + "f" + f + "c" + c + "'> <div class=" + "'cara darrera'" + "></div><div class=" + "'cara davant'" + "></div></div>");
            carta = $("#f" + f + "c" + c);
            ampladaCarta = $(".carta").width();
            alcadaCarta = $(".carta").height();
            carta.css({
                "left": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
                "top": ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
            });
            carta.find(".davant").addClass(cartesEmparellades[j]);
            j++;
        }
    }
}