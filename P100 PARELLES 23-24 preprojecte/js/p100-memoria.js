var ampladaCarta, alcadaCarta;
var separacioH = 20, separacioV = 20;
var nFiles = 10, nColumnes = 10;
let primer = true;
var files = 4, columnes = 4;

var jocCartes = [
    'carta14', 'carta1', 'carta2', 'carta3', 'carta4', 'carta5', 'carta15', 'carta16', 'carta24', 'carta25', 'carta26',
];
var cops = [];

$(function () { //cooking
    $("#tauler").css({ //mida tauler
        "width": 120 + 75 * columnes + "px",
        "height": 160 + 105 * files + "px"
    });
    for (let f = 1; f <= files; f++) {
        for (let c = 1; c <= columnes; c++) {
            var carta;
            var num;
            num = Math.floor(Math.random() * 11);
            $("#tauler").append("<div class=" + "'carta'" + " id='" + "f" + f + "c" + c + "'> <div class=" + "'cara darrera'" + "></div><div class=" + "'cara davant'" + "></div></div>");
            ampladaCarta = $(".carta").width();
            alcadaCarta = $(".carta").height();
            carta = $("#f" + f + "c" + c);
            carta.css({
                "left": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
                "top": ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
            });
            carta.find(".davant").addClass(jocCartes[num]);
            jocCartes.slice(num); //AYUDA

        }
    }
    $(".carta").on("click", function () {
        var select = $(this);

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
            primer = true;
        }
    });
});

var cartesSeleccionades = [];

function checkParella() { //func para ver si es parell o no //luego compararlo con joan
    var primeraCarta = cartesSeleccionades[0];
    var segonaCarta = cartesSeleccionades[1];
    var primeraClasse = primeraCarta.find(".davant").attr("class");
    var segonaClasse = segonaCarta.find(".davant").attr("class");

    if (primeraClasse === segonaClasse) {
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
