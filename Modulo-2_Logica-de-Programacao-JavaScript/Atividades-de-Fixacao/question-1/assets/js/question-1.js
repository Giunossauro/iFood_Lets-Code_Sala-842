/**
 * Escreva um algoritmo para ler as dimensões de um
 * retângulo (base e altura), calcular e escrever a área do retângulo.
 *
 * Obs: Utilize a interface html para receber os dados do usuário
 *
 */

const canvas = document.getElementById("drawing-board");
const ctx = canvas.getContext("2d");

let canvasOffSetY = canvas.offsetTop;

canvas.width = canvas.getBoundingClientRect().width;
canvas.height = window.innerHeight - document.
                                     getElementsByTagName("header")[0].
                                     getBoundingClientRect().height;

const resizeObserver = new ResizeObserver(entries => {
    console.log('Body height changed:', entries[0].target.clientHeight);
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = window.innerHeight - document.
                                         getElementsByTagName("header")[0].
                                         getBoundingClientRect().height;
    canvasOffSetY = canvas.offsetTop;
});

resizeObserver.observe(document.body);

let isPainting = false;

let startX;
let startY;

let rectWidth;
let rectHeight;

const draw = (e) => {
    if(!isPainting){
        return;
    }
    clearCanvas();
    ctx.strokeRect(
        startX,
        startY - canvasOffSetY,
        e.clientX - startX,
        e.clientY - startY
    );
};

canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
    clearCanvas();
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener("touchstart", (e) => {
    isPainting = true;
    clearCanvas();
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

canvas.addEventListener("mouseup", (e) => {
    isPainting = false;
    rectWidth = Math.abs(startX - e.clientX);
    rectHeight = Math.abs(startY - e.clientY);
    ctx.font = '48px serif';
    if((rectWidth == rectHeight) && rectWidth){
        ctx.font = '68px serif';
        ctx.fillText(
            "Você desenhou um quadrado! Desenhe um retângulo.", 10, 70
        );
    }
    else if(rectWidth != 0 && rectHeight != 0){
        ctx.fillText(
            "O retângulo tem: " + 
            rectWidth +
            "px de largura e " +
            rectHeight +
            "px de altura", 10, 50
        );
        ctx.font = '68px serif';
        ctx.fillText(
            "O retângulo tem: " +
            rectWidth * rectHeight +
            "px²", 10, 120
        );
    }
    else if(rectWidth == 0 && rectHeight == 0){
        ctx.font = '68px serif';
        ctx.fillText(
            "Você clicou e não arrastou! Tente novamente.", 10, 70
        );
    }
    else{
        ctx.font = '68px serif';
        ctx.fillText(
            "Você desenhou uma linha! Tente novamente.", 10, 70
        );
    }

});

canvas.addEventListener("touchend", (e) => {
    isPainting = false;
    rectWidth = Math.abs(startX - e.changedTouches[0].clientX);
    rectHeight = Math.abs(startY - e.changedTouches[0].clientY);
    ctx.font = '48px serif';
    if((rectWidth == rectHeight) && rectWidth){
        ctx.font = '68px serif';
        alert("Você desenhou um quadrado! Desenhe um retângulo.");
    }
    else if(rectWidth != 0 && rectHeight != 0){
        alert(
            "O retângulo tem: " + 
            rectWidth +
            "px de largura e " +
            rectHeight +
            "px de altura\n\nO retângulo tem: " +
            rectWidth * rectHeight +
            "px²"
        );
    }
    else if(rectWidth == 0 && rectHeight == 0){
        alert(
            "Você clicou e não arrastou! Tente novamente."
        );
    }
    else{
        ctx.font = '68px serif';
        alert(
            "Você desenhou uma linha! Tente novamente.", 10, 70
        );
    }

});

canvas.addEventListener("mousemove", (e) =>{
    draw(e);
});

canvas.addEventListener("touchmove", (e) =>{
    draw(e.touches[0]);
});

const clearCanvas = () => {
    ctx.clearRect(
        0,
        0,
        document.getElementsByTagName("body")[0].getBoundingClientRect().width,
        document.getElementsByTagName("body")[0].getBoundingClientRect().height
    );
};