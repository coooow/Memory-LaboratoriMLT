var ampladaCarta, alcadaCarta;
var separacioH = 20, separacioV = 20;
var nFiles = 10, nColumnes = 10;
var f = 1, c = 1;
let primer = true;

var jocCartes = [
    'carta14', 'carta1', 'carta2', 'carta3', 'carta4', 'carta5', 'carta15', 'carta16', 'carta24', 'carta25', 'carta26',
];


$(function () { //cooking
    for (let f = 1; f < 3; f++) {
        for (let c = 1; c < 5; c++) {
            var carta;
            $("#tauler").append("<div class=" + "'carta'" + " id='" + "f" + f + "c" + c + "'> <div class=" + "'cara darrera'" + "></div><div class=" + "'cara davant'" + "></div></div>");
            ampladaCarta = $(".carta").width();
            alcadaCarta = $(".carta").height();
            // mida del tauler
            $("#tauler").css({
                "width": "420px", //subir de 100 en 100, 1r col = 120
                "height": "300px" //subir de 140 en 140, 1r fila = 160
            });

            carta = $("#f" + f + "c" + c);
            carta.css({
                "left": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
                "top": ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
            });
            carta.find(".davant").addClass(jocCartes.pop());

        }
    }
    $(".carta").on("click", function () {
        $(this).toggleClass("carta-girada");
        if (primer) {
            var primeraCarta = this;
            primer = false;
        } else {
            var segonaCarta = this;
            checkParella();
            primer = true;
        }
    });
});

function checkParella() { //func para ver si es parell o no //luego compararlo con joan
    if (primeraCarta.find(".davant").attr(".class") == segonaCarta.find(".davant").attr(".class")) {
        primeraCarta.style.opacity = 0;
        segonaCarta.style.opacity = 0;
    } else {
        primeraCarta.toggleClass("carta-girada");
        segonaCarta.toggleClass("carta-girada");
    }
}