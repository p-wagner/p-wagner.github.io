
var currentPlayer = "X";
var gameOver = false;

function fieldClick(x, y) {
    if (gameOver == true) {
        return;
    }
    var field = document.getElementById(x + "x" + y);

    if (field.innerText !== "X" && field.innerText !== "O") {
        field.innerText = currentPlayer;
    } else {
        return;
    }

    var won = checkIfWon(currentPlayer);
    if (won == true) {
        console.log("Player " + currentPlayer + " has won!!");
        gameOver = true;
        return;
    }

    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X"
    }
}

function checkIfWon(player) {
    for (let x = 0; x < 3; x++) {
        if (document.getElementById(x + "x0").innerText === player
            && document.getElementById(x + "x1").innerText === player
            && document.getElementById(x + "x2").innerText === player) {
                document.getElementById("row" + x).style.visibility = "visible";
            return true;
        }
    }
    for (let y = 0; y < 3; y++) {
        if (document.getElementById("0x" + y).innerText === player
            && document.getElementById("1x" + y).innerText === player
            && document.getElementById("2x" + y).innerText === player) {
                document.getElementById("column" + x).style.visibility = "visible";
            return true;
        }
    }
    if (document.getElementById("0x0").innerText === player
        && document.getElementById("1x1").innerText === player
        && document.getElementById("2x2").innerText === player) {
            document.getElementById("diagonal1").style.visibility = "visible";
        return true;
    }
    if (document.getElementById("0x2").innerText === player
        && document.getElementById("1x1").innerText === player
        && document.getElementById("2x0").innerText === player) {
            document.getElementById("diagonal2").style.visibility = "visible";
        return true;
    }

   
    return false;
}