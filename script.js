let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Matriz de patrones ganadores
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];
//El jugador'X' Juega primero
let xTurn = true;
let count = 0;

//Desactivar todos los botones
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //Activar popup
    popupRef.classList.remove("hide");
};

//Habilitar todos los botones (para juego nuevo y reiniciar)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //Deshabilitar popup
    popupRef.classList.add("hide");
};

//Esta función se ejecuta cuando un jugador gana.
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F60E;  jugador &#x274C; Ganador  &#x1F38A;";
    } else {
        msgRef.innerHTML = "&#x1F60E;  jugador &#x2B55; Ganador  &#x1F38A;";
    }
};

//Función for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F644;  Es un Empate  &#x1F921;";
};

//Nuevo juego
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

//Logica de partida ganada
const winChecker = () => {
    //Recorre todos los patrones ganadores
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Comprobar si los elementos están llenos
        //Si 3 elementos vacíos son iguales y ganarían como lo harían
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                //Si los 3 botones tienen los mismos valores, pase el valor a winFunction
                winFunction(element1);
            }
        }
    }
};

//Mostrar X/O al hacer clic
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //Mostrar X
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //Mostrar Y
            element.innerText = "O";
            element.disabled = true;
        }
        //Incrementar el recuento en cada clic
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        //Compruebe si gana con cada clic
        winChecker();
    });
});
//Habilitar botones y deshabilitar ventanas emergentes al cargar la página
window.onload = enableButtons;