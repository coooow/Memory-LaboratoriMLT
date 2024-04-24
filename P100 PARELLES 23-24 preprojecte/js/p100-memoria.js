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
const flip = 1, parella = 2, perdre = 3, guanyar = 4, victory = 5;

function refreshPage() {// Reload de la pagina
    window.location.reload();
}

//FUNCIONS SETUP/DURANT EL JOC

function iniciJoc() { //setup del joc, genera el tauler, cartes, timer i inclou tot el que pasa en el onclick
    var cardWidth, cardHeight;
    switch (deckValue) {
        case 1: cardHeight = 120; cardWidth = 80; break;
        case 2: cardHeight = 111; cardWidth = 111; break;
    }
    setBackground(deckValue);
    fonsContenidor(deckValue);
    amplada = separacioH * (columnes + 1) + cardWidth * columnes;
    altura = separacioV * (files + 1) + cardHeight * files;
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

        if (select.hasClass("carta-girada")) {
            return;
        }
        clicsRestants--;
        p.innerHTML = "Clics restants: " + clicsRestants;

        playSound(flip);
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

function checkParella() { //func para ver si es parella o no 
    var primeraCarta = cartesSeleccionades[0];
    var segonaCarta = cartesSeleccionades[1];
    var primeraClasse = primeraCarta.find(".davant").attr("class");
    var segonaClasse = segonaCarta.find(".davant").attr("class");

    if (primeraClasse === segonaClasse) {
        numCartes = numCartes - 2;
        setTimeout(function () {
            primeraCarta.remove();
            segonaCarta.remove();
            playSound(parella);
        }, 500);
    } else {
        setTimeout(function () {
            primeraCarta.toggleClass("carta-girada");
            segonaCarta.toggleClass("carta-girada");
            playSound(flip);
        }, 500);
    }
    cartesSeleccionades = [];
}

function checkWin() { //mira si has guanyat
    if (numCartes == 0) {
        setTimeout(function () {
            document.getElementById("popup-win").style.display = "block";
            playSound(guanyar);
            clearInterval(interval);
        }, 1000)
        setTimeout(function() {
            var div = document.getElementById('tocho');
            div.classList.toggle('visible');
        }, 2500);
        setTimeout(function() {
            let tema = $('#musikote');
            tema[0].pause();
            $('#musikote').hide();
            playSound(victory);
        }, 2500);
    }
}

function checkLoss() { //mira si has perdut
    if (clicsRestants == 0) {
        setTimeout(function () {
            playSound(perdre);
            document.getElementById("popup-lose").style.display = "block";
            clearInterval(interval);
        }, 1000)
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

    if (!check){
        document.getElementById("popup").style.display = "block";
        setTimeout(function() {
            document.getElementById("popup").style.display = 'none';
          }, 3500);
    }

    if (check) {
        document.querySelector(".menu").style.display = "none";
        document.querySelector(".juego").style.display = "block";
        iniciJoc();

        if (btnFacil.classList.contains("hover-activado1")){
            musikon('../P100 PARELLES 23-24 preprojecte/so/zz_toisiloco.mp3');
        }else if (btnNormal.classList.contains("hover-activado2")) {
            musikon('../P100 PARELLES 23-24 preprojecte/so/zzz_midnotgonnalie.mp3');
        }else if (btnDificil.classList.contains("hover-activado3")) {
            musikon('../P100 PARELLES 23-24 preprojecte/so/zzzz_darksouls.mp3');
        }
    }
    
    //          ↓↓change de musikote↓↓

    function musikon(temazo){
        $(document).ready(function() {
            var audio = $('#musikote');
            audio.find('source').attr('src', temazo);
            audio[0].load();
    });
    }

    //          ↑↑change de musikote↑↑
}

function tiempo() { //funcio del timer
    var temps = document.querySelector("#timer p");
    interval = setInterval(function () {
        timer--;
        temps.innerHTML = "Temps restant: " + timer;
        if (timer == 0) {
            clearInterval(interval);
            $(".carta").off("click");
            playSound(perdre);
        }
    }, 1000);
}

function setBackground(deck) { //defineix el fons de la pantalla depenent de la baralla
    var body = document.getElementById("fons");
    if (deck == 1) {
        body.classList.add("fondojocpoker");
    } else if (deck == 2) {
        body.classList.add("fondojocpokemon");
    }
}

function playSound(input) { //executa un so dependent del input
    let so;
    switch (input) {
        case flip: so = document.getElementById("audioGirar"); break;
        case parella: so = document.getElementById("audioParella"); break;
        case perdre: so = document.getElementById("audioPerdre"); break;
        case guanyar: so = document.getElementById("audioGuanyar"); break;
        case victory: so = document.getElementById("sanAndres"); break;
    }
    so.play();
}

function fonsContenidor(deck) { //afegeix el fons al contenidor del timer & clics restants
    var contenidor = document.getElementById("contenidor-info");
    if (deck == 1) {
        contenidor.classList.add("fichapoker");
    } else if (deck == 2) {
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
    timer = numCartes * 3;
}

function activarHover2(boton) {
    removerHover();
    boton.classList.add("hover-activado2");
    files = 2;
    columnes = 4;
    numCartes = 8;
    quantesCartes = 8;
    clicsRestants = 24;
    timer = numCartes * 3;
}

function activarHover3(boton) {
    removerHover();
    boton.classList.add("hover-activado3");
    files = 4;
    columnes = 4;
    numCartes = 16;
    quantesCartes = 16;
    clicsRestants = 48;
    timer = numCartes * 3;
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

function repartirCartes() { //reparteix les cartes creades 
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