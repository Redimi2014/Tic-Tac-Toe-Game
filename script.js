// Variables globales
let currentPlayer = "X";
let player1Name = "Jugador 1";
let player2Name = "Jugador 2";
let player1Color = "#FF0000";
let player2Color = "#0000FF";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

// Función para mostrar la ventana modal de reinicio
function showConfirmation() {
    if (gameActive) {
        document.getElementById("confirmationModal").style.display = "block";
    }
}

// Función para ocultar la ventana modal de reinicio
function hideConfirmation() {
    document.getElementById("confirmationModal").style.display = "none";
}

// Función para reiniciar el juego
// Función para reiniciar el juego
function resetBoard() {
    const confirmationModal = document.getElementById("confirmationModal");
    confirmationModal.style.display = "block"; // Mostrar el modal

    const confirmResetButton = document.getElementById("confirmReset");
    const cancelResetButton = document.getElementById("cancelReset");

    confirmResetButton.addEventListener("click", () => {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = false;
        document.getElementById("message").innerText = "";
        const cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = "";
            cells[i].style.backgroundColor = "";
        }
        //document.getElementById("resetButton").style.display = "none";
  
        document.getElementById("startButton").style.display = "block";
        confirmationModal.style.display = "none"; // Ocultar el modal
        initializeBoard();
    });

    cancelResetButton.addEventListener("click", () => {
        confirmationModal.style.display = "none"; // Ocultar el modal

   
    });
}


// Función para comenzar el juego
document.getElementById("startButton").addEventListener("click", startCountdown);

// Función para comenzar el conteo regresivo
function startCountdown() {
    document.getElementById("menu").style.display = "none"; // Ocultar el menú de opciones
    document.getElementById("countdown").style.display = "block"; // Mostrar el conteo regresivo
    let countdownTime = 3; // Tiempo en segundos para el conteo regresivo

    const countdownTimer = document.getElementById("countdownTimer");
    countdownTimer.innerText = countdownTime;

    const countdownInterval = setInterval(() => {
        countdownTime--;
        countdownTimer.innerText = countdownTime;

        if (countdownTime === 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").style.display = "none"; // Ocultar el conteo regresivo
            document.getElementById("resetButton").style.display = "block"; // Mostrar el botón "Reiniciar"
            document.querySelector('.board').style.display = "grid"; // Mostrar el tablero
            document.getElementById("irinicio").style.display = "block";
            initializeBoard(); // Inicializar el tablero
        }
    }, 1000);
}

// Función para mostrar el nombre del jugador ganador
function showWinner(player) {
    document.getElementById("message").innerText = `¡El jugador ${player} (${player === "X" ? player1Name : player2Name}) ha ganado!`;
}

// Función para hacer un movimiento
function makeMove(cell) {
    if (gameActive && board[cell] === "") {
        board[cell] = currentPlayer;
        const cellElement = document.getElementsByClassName("cell")[cell];
        cellElement.innerText = currentPlayer === "X" ? player1Name : player2Name;
        cellElement.style.backgroundColor = currentPlayer === "X" ? player1Color : player2Color;
        
        if (checkWin()) {
            showWinner(currentPlayer); // Mostrar al jugador ganador
            gameActive = false;
        } else if (board.indexOf("") === -1) {
            document.getElementById("message").innerText = "¡Es un empate!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

// Función para verificar si hay un ganador
function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winCombos) {
        if (board[combo[0]] === currentPlayer &&
            board[combo[1]] === currentPlayer &&
            board[combo[2]] === currentPlayer) {
            return true;
        }
    }
    return false;
}

// Inicializar el tablero
function initializeBoard() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.getElementById("message").innerText = "";
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.backgroundColor = "";
    }
  //  document.getElementById("resetButton").style.display = "none"; // Ocultar el botón "Reiniciar"
}

// Agregar eventos para reiniciar el juego
document.getElementById("resetButton").addEventListener("click", showConfirmation);
document.getElementById("confirmReset").addEventListener("click", resetBoard);
document.getElementById("cancelReset").addEventListener("click", hideConfirmation);



// Agregar eventos para volver al inicio
document.getElementById("irinicio").addEventListener("click", showInicioConfirmation);
document.getElementById("confirminicio").addEventListener("click", irInicio);
document.getElementById("cancelinicio").addEventListener("click", hideInicioConfirmation);



// Función para mostrar el cuadro modal de inicio
function showInicioConfirmation() {
    document.getElementById("confirmationinicio").style.display = "block";
}

// Función para ocultar el cuadro modal de inicio
function hideInicioConfirmation() {
    document.getElementById("confirmationinicio").style.display = "none";
}

// Función para volver al inicio (recargar la página)
function irInicio() {
    location.reload(); // Recargar la página
}