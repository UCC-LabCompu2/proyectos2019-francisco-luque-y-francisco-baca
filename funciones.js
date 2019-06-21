/**
 * Created by Alumno on 05/06/2019.
 * Por Francisco Luque y Francisco Baca
 */

/**
 * Inicializado de Variables Globales
 */
var canvas;
var ctx;
var funcL;
var funcP;
var aux;
var prev;
var auxX;
var result;
var id;
var iAux;

/**
 * Creador de la Grilla del canvas, llena el canvas con una grilla de 10x10 unidades separadas con lineas de longitud
 * igual a 0.2, luego crea los ejes principales mediante lineas de grosor 2 en el medio horizontal y vertical del canvas.
 * @method crearGrilla
 */
function crearGrilla() {
    canvas = document.getElementById("grafico");
    ctx = canvas.getContext("2d");
    funcL = document.getElementById("formulario").elements;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 0.2;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    for (var i = 0; i < canvas.width; i += 10) {

        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);

    }

    for (var i = 0; i < canvas.height; i += 10) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.closePath();
}

/**
 * Graficador de la funcion, crea la grilla nuevamente para limpiarla, luego compone una funcion tomando los valores que da el usuario
 * en funcion, trigF y argX, si el usuario indico que esta en grados los pasa a radianes y posteriormente utiliza math.evaluate para
 * evaluar el valor de Y en cada punto de la funcion en el eje X a lo largo de todo el eje x.
 * Ademas para mayor entendimiento, imprime el texto de la funcion ya compuesta en la esquina superior izquierda.
 * @method graficarFuncion
 */


function graficarFuncion() {
    crearGrilla();


    if (document.getElementById("formulario").elements.valFuncInt.value == "grados") {
        funcP = String(funcL.funcion.value) + "*" + String(funcL.trigF.value) + "((" + String(funcL.argX.value) + ")*pi/180)";
    } else {
        funcP = String(funcL.funcion.value) + "*" + String(funcL.trigF.value) + "(" + String(funcL.argX.value) + ")";
    }
    func = funcP.split('').join('');
    iAux = 0;
    aux = math.compile(func);
    prev = aux.evaluate({x: (0 - canvas.width / 2)});
    prev += canvas.height / 2;
    prev *= 10;
    ctx.lineWidth = 0.2;
    ctx.fillStyle = "green";
    ctx.font = "15px Arial";
    ctx.fillText(func, 0, 30);
    ctx.fillStyle = "red";
    ctx.lineWidth = 0.4;

    ctx.moveTo(0, prev);

    id = setInterval(graficarFuncionAnimada, 1);


}

/**
 * Funcion utilizada en graficarFuncion() para poder graficar a lo largo de un tiempo corto la Funcion dada por el usuario. Para explicacion mas en detalle de el grafico ver graficarFuncion().
 * @method graficarFuncionAnimada
 *
 */
function graficarFuncionAnimada() {
    ctx.beginPath();
    if (iAux == canvas.width) {
        clearInterval(id);
    } else {
        try {
            auxX = iAux - canvas.width / 2;
            result = aux.evaluate({x: auxX});
            result *= 10;
            result += canvas.height / 2;
            ctx.moveTo(iAux - 1, prev);
            ctx.lineTo(iAux, result);
            prev = result;
        } catch (a) {

        }

        iAux++;
        ctx.stroke();
        ctx.closePath();
    }
}


/**
 * Cambiador de funcion trigonometrica, cambia el tipo de funcion trigonometrica segun el radiobutton presionado por el usuario.
 * @method updateVal
 */
function updateVal() {
    var el = document.getElementById("formulario").elements;
    var radios = el.trigF;
    var cons = el.tipoFuncion;
    cons.value = radios.value;
}

/**
 * Funcion maestra, llamada cuando el usuario aprieta el boton de graficar. Busca si el termino dentro de la funcion trigonometrica es un numero cuando se reemplazan
 * las x por 1 llamando a EC(). De serlo grafica la funcion y calcula su paridad. De no serlo muestra mensaje de error y lo reemplaza por X.
 * @method botongraficar
 */
function botongraficar() {
    var i = EC();
    if (i == 1) {
        encontrarParidad();
        graficarFuncion();
    } else {
        alert("Se ingreso un valor invalido en el termino de adentro de la funcion, asegurese de que los términos esten multiplicados u operados entre sí, y de no usar letras que no sean x.");
        document.getElementById("Input2").value = "x";
    }
}

/**
 * Descripción
 * @method Nombre de la función
 * @param Signo_a_añadir sign
 */
function anadiraString(sign) {
    var funcL = document.getElementById("formulario").elements.argX;
    funcL.value += sign;
}

/**
 * Validador del Input del usuario. Toma el valor dado en argX y prueba si es un numero compilandolo mediante math.compile y math.evaluate.
 * Si el usuario ingreso valores extraños (x se reemplaza por 1 al calcular), el evaluate falla, se sale del try y se retorna 0 (error).
 * @method EC
 * @return 1 si es compilable, 0 si no.
 */
function EC() {
    var i = document.getElementById("formulario").elements.argX.value;
    var aux = math.compile(i);
    try {
        var prev = aux.evaluate({x: (1)});
        return 1;
    } catch (a) {
        return 0;
    }
}

/**
 * Calcula si la funcion es par, impar o ninguna de las dos y muestra el resultado de esto por outputParidad
 * @method encontrarParidad
 */
function encontrarParidad() {
    var funcL = document.getElementById("formulario").elements;
    if (document.getElementById("formulario").elements.valFuncInt.value == "grados") {
        var funcP = String(funcL.funcion.value) + "*" + String(funcL.trigF.value) + "((" + String(funcL.argX.value) + ")*pi/180)";
    } else {
        var funcP = String(funcL.funcion.value) + "*" + String(funcL.trigF.value) + "(" + String(funcL.argX.value) + ")";
    }
    var func = funcP.split('').join('');
    var i = 0;
    var aux = math.compile(func);
    if (aux.evaluate({x: 1}) == aux.evaluate({x: -1})) {
        document.getElementById("outputParidad").value = "Funcion Par";
    } else if (aux.evaluate({x: 1}) == aux.evaluate({x: -1}) * -1) {
        document.getElementById("outputParidad").value = "Funcion Impar";

    } else {
        document.getElementById("outputParidad").value = "Funcion No Impar ni Par";
    }

}