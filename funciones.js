/**
 * Created by Alumno on 05/06/2019.
 */

function crearGrilla(){
    var canvas = document.getElementById("grafico");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.lineWidth=0.2;
    ctx.fillStyle="#000";
    ctx.beginPath();
    for(var i=0;i<canvas.width;i+=10)
    {

        ctx.moveTo(i,0);
        ctx.lineTo(i,canvas.height);

    }

    for(var i=0;i<canvas.height;i+=10)
    {
        ctx.moveTo(0,i);
        ctx.lineTo(canvas.width,i);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.stroke();
    ctx.closePath();
}

function getSeleccion(id_elem)
{

    var txtarea = document.getElementById(id_elem);
    var start = txtarea.selectionStart;
    var finish = txtarea.selectionEnd;
    var sel = txtarea.value.substring(start, finish);

    return sel;

}

function interpretOp(){

}