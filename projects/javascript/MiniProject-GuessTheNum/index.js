'use strict'
let num, attempts;

function startGame() {
    num = Math.ceil(Math.random() * 10)
    attempts = 5
    console.log(num);
    document.getElementById("results").innerHTML = ""
    document.getElementById("guess").value = ""
    document.getElementById("checkBtn").disabled = false
    document.getElementById("guess").readOnly = false

}

startGame()

function check() {
    let guess = +document.getElementById("guess").value
    // בדיקת תקינות הקלט
    if (guess < 1 || guess > 10) {
        document.getElementById("results").innerHTML += `<p>Please enter number between 1 and 10 </p>`
    }
    else {
        attempts--;
        if (guess < num) {
            document.getElementById("results").innerHTML += `<p>${guess} is too small </p>`
        }
        else if (guess > num) {
            document.getElementById("results").innerHTML += `<p>${guess} is too big </p>`
        }
        else {
            document.getElementById("results").innerHTML += `<p>You won the game! The number was ${num}. </p> <button class="btn btn-primary" onclick="startGame()">Start again</button>`
            document.getElementById("checkBtn").disabled = true
            document.getElementById("guess").readOnly = true

        }
    }
    if (attempts == 0 && num != guess) {
        document.getElementById("results").innerHTML += `<p>You lost the game. The number was ${num} </p>  <button class="btn btn-primary" onclick="startGame()">Start again</button>`
        document.getElementById("checkBtn").disabled = true
        document.getElementById("guess").readOnly = true
    }


}
