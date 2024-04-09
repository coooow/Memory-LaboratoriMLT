var ampladaCarta, alcadaCarta;
var separacioH = 20, separacioV = 20;
var nFiles = 10, nColumnes = 10;
var f = 1, c = 1;

var jocCartes = [
    'carta14', 'carta1', 'carta2', 'carta3', 'carta4', 'carta5', 'carta15', 'carta16', 'carta24', 'carta25', 'carta26',
];


$(function () { //cooking
    for (let f = 1; f < 3; f++) {
        for (let c = 1; c < 5; c++) {
            var carta;

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
    });


});