/**
 * pintar un cuadro a color -> canvas.fillRect(x,y,alto,ancho)
 * limpiar -> canvas.clearRect(x,y,alto,ancho)
 * 
 * 
 * Funciones de tiempo
 * setInterval(funcion, ms) -- Repite cada ms la funcion
 * setInterval( () => console.log('1'), 1000) -- 1000ms = 1 seg
 * clearInterval(variableIntervalo) -- para detener
 * 
 * setTimeout(funcion, ms) -- Ejecuta la funcion despues del lapso ms
 * setTimeout( () => console.log('1'), 1000) -- 1000ms = 1 seg
 * 
 * Date.now() -- nos da la hora actual en ms
 */

const canvas = document.querySelector('#campo');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#button-arriba');
const btnDown = document.querySelector('#button-abajo');
const btnLeft = document.querySelector('#button-izq');
const btnRight = document.querySelector('#button-der');

const etiqueta = document.querySelector('#canvasSize');
const posiociones = document.querySelector('#posiciones');
const vidasP = document.querySelector('#vida');

var canvasSize;
var elementsSize;
var level = 0;
var vidas = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined
}

const regaloPosition = {
    x: undefined,
    y: undefined
}

var arregloMuros = [];

const muroPosition = {
    x: undefined,
    y: undefined
}

window.addEventListener('load', asignarDimension); // Apenas cargue la pagina ejecutamos el siguiente codigo
window.addEventListener('resize', asignarDimension); // Apenas cambie deimensiones la pagina ejecutamos el siguiente codigo

function asignarDimension(){
    if (window.innerHeight > window.innerWidth) { // innerHeight e innerWidth es el tamanio real de html
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = Number(canvasSize.toFixed(2)) / 10;

    console.log(canvasSize);

    startGame();
}

function ganaste(){
    console.log('win');
    alert('win');
}

function startGame(){
    game.font = elementsSize+'px Verdana';
    game.textAlign = 'end';
    
    var mapa = mapas2[level];

    if(!mapa){
        ganaste()
        return;
    }

    // Si timeStart no tiene ningun valor
    if (!timeStart) {
        timeStart = Date.now();
    }

    var filas = mapa.trim().split('\n');
    var filasxcolumnas = filas.map(row => row.trim().split('')); // Con .map creamos un nuevo arreglo

    game.clearRect(0, 0, canvasSize, canvasSize);
    filasxcolumnas.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const element = iconos[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == 'I') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log(playerPosition);
                    
                    console.log('aqui debe ir el jugador');   
                }
            }else if (col == 'O'){
                if (!regaloPosition.x && !regaloPosition.y) {
                    regaloPosition.x = posX;
                    regaloPosition.y = posY;
                    console.log(regaloPosition);
                    
                    console.log('aqui debe ir el regalo');   
                }
            }else if(col == 'X'){
                    muroPosition.x = posX;
                    muroPosition.y = posY;
                    console.log(muroPosition);
                    
                    console.log('aqui debe ir el muro');   
                    arregloMuros.push(muroPosition);
            }
            etiqueta.innerHTML = `${canvasSize}`;
            game.fillText(element, posX, posY);   
        });
    });
    // for (let i = 0; i < nivel1.length; i++) {
    //     for (let j = 1; j <= nivel1[i].length; j++) {
    //         const element = nivel1[i][j-1];
    //         const posX = elementsSize * i;
    //         const posY = elementsSize * j;

    //         if (element == 'I') {
    //             if (!playerPosition.x && !playerPosition.y) {
    //                 playerPosition.x = posX;
    //                 playerPosition.y = posY;
    //                 console.group('inicio');
    //                 console.log('aqui debe ir el jugador');   
    //                 console.log(playerPosition);
    //                 console.log(elementsSize);
    //                 console.log(canvasSize);
    //                 console.groupEnd()
    //             }
    //         }

    //         game.fillText(iconos[element], posX, posY);   
    //     }
    // }
    movePlayer();

}

window.addEventListener('keydown', reconocerTecla);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function reconocerTecla(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if(event.key == 'ArrowDown') moveDown();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if(event.key == 'ArrowRight') moveRight();
}

function levelWin(){
    console.log('Subiendo nivel');
    level ++;
}


function showTime() {
    
}
function movePlayer(){
    if(vidas > 0){
        const colisionX = playerPosition.x.toFixed(2) == regaloPosition.x.toFixed(2);
        const colisionY = playerPosition.y.toFixed(2) == regaloPosition.y.toFixed(2);
    
        const hayColision = colisionX && colisionY;
    
        if(hayColision){
            console.log('encontraste regalo');    
            levelWin();
        }
        
        const muroColision = arregloMuros.find(enemy => {
            const muroX = enemy.x == playerPosition.x;
            const muroY = enemy.y == playerPosition.y;
            return muroX && muroY;
        });
    
        if(muroColision){
            console.log('muro');  
            vidas --;
            vidasP.innerHTML = `${vidas}`;
        }else{
            console.log('no hay muro');
        }
    
        game.fillText(iconos['PLAYER'], playerPosition.x, playerPosition.y);
    }else{
        alert('perdiste');
    }
}

function moveUp(){
    console.group('arriba');
    var mov = playerPosition.y - elementsSize;
    console.log(playerPosition);
    posiociones.innerHTML = `x: ${playerPosition.x} y: ${playerPosition.y}` 
    console.groupEnd()
    if(mov > 0){
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveDown(){
    console.group('abajo');
    var mov = playerPosition.y + elementsSize;
    console.log(playerPosition);
    posiociones.innerHTML = `x: ${playerPosition.x} y: ${playerPosition.y}` 
    console.groupEnd()
    if(mov > canvasSize){
        console.log('ph oh');
    }else{
        playerPosition.y += elementsSize;
        startGame();
    }
}

function moveLeft(){
    console.group('izquierda');
    var mov = playerPosition.x - elementsSize;
    console.log(playerPosition);
    posiociones.innerHTML = `x: ${playerPosition.x} y: ${playerPosition.y}` 
    console.groupEnd()
    if(mov >= 0){
        playerPosition.x -= elementsSize;
        startGame(); 
    }
}

function moveRight(){
    console.log('derecha');
    var mov = playerPosition.x + elementsSize;
    posiociones.innerHTML = `x: ${playerPosition.x} y: ${playerPosition.y}` 
    console.log(mov);
    if(mov >= canvasSize){
        console.log('ph oh');
    }else{
        playerPosition.x += elementsSize;
        startGame();
    }
}