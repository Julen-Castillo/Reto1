/* Declaración de variables globales ------------------------------------------------------------------------ */
var tasaDeRefresco = 1500;

/**
 * Inicio del javaScript de la base de datos
 */
refrescoDeLecturas();

/**
 * intervalo de refresco de lo que se quiera ejecutar en la función
 * Principalmente lectura de variables de la base de datos
 */
function refrescoDeLecturas() {
    // if pa porsi no hay conexion con el server no haga llamadas toodo el rato
    if (cogerVariable("./variables/current_speed.html")[2] != '"') {
        setInterval(function () {
            //lecturas de variables
            $('#infor1').val(cogerVariable("./variables/target_pos.html"));
            $('#infor2').val(cogerVariable("./variables/current_pos.html"));
            $('#infor3').val(cogerVariable("./variables/current_speed.html"));

            //leer variables imagenes normales
            leeVariableYPonImagen("./variables/busy.html", '#busy');
            leeVariableYPonImagen("./variables/ready.html", '#ready');
            leeVariableYPonImagen("./variables/in_pos.html", '#in_pos');

            // leer variable error
            let error = cogerVariable("./variables/error.html");
            if (error == 1) {
                $('#luz_error').attr("src", "./multimedia/alarma-roja.png");
            }
        }, tasaDeRefresco);
    } else {
        //alert("No hay conexion con el servidor");
    }
}

/**
 * Llama ajax para cogerVariable variables, leerlas y pasarlas
 * @param html
 * @returns {String con el valor de la variable de la base de datos}
 */
function cogerVariable(html) {
    var texto;
    $.ajax({
        async: false,
        type: 'GET',
        url: html,
        success: function (data) {
            texto = data.substring(1, (data.length - 2));
        }
    });
    return texto;
};

function leeVariableYPonImagen(html, etiqueta) {
    let resultado = cogerVariable(html);
    if (resultado == 1) {
        $(etiqueta).attr("src", "./multimedia/alarma-verde.png");
    } else {
        $(etiqueta).attr("src", "./multimedia/alarma-roja.png");
    }
};


/**
 * Lo primero que se debe ejecutar para el tema de los pulsadores de ARI y volver
 * a poner datos de cota y/o parada
 */
function leerSiPulsadoresActivados() {
    /**
     * Simular pulsador en intro_cotas
     */
    let b_i_c = cogerVariable("./variables/intro_cotas.html");
    if (b_i_c == 1) {
        //volver a poner el boton en false porque es un pulsador
        $("#boton_intro_cotas").val("0");
        $("#form_cotas").submit();
    }
    /**
     * Simular pulsador en intro_paradas
     */
    let b_i_p = cogerVariable("./variables/intro_paradas.html");
    if (b_i_p == 1) {
        //volver a poner el boton en false porque es un pulsador
        $("#boton_intro_paradas").val("0");
        $("#form_paradas").submit();
    }
}