// Nem volt kedvem kommenteket írni

const clickableEventListener = () => {
    document.querySelectorAll(".clickable").forEach(item => {
        item.addEventListener("click", (e) => {
            gameStart(e.target.id)
        })
    })
}

clickableEventListener()

const checkWinner = (chosenWeapon, randomEnemyWeapon) => {
    if(chosenWeapon == randomEnemyWeapon){
        return null
    } else if(chosenWeapon == 'rock'){
        return randomEnemyWeapon == 'paper' ? false : true 
    } else if(chosenWeapon == 'scissors'){ 
        return randomEnemyWeapon == 'rock' ? false : true 
    } else if(chosenWeapon == 'paper'){
        return randomEnemyWeapon == 'scissors' ? false : true
    }
}

const outputWinner = (chosenWeapon, randomEnemyWeapon, isWinner) => {
    document.querySelector(".last-row").style.display = "none"
    const gameCodes = {
        paper: "&#128221;",
        rock: "&#128511;",
        scissors: "&#9986;"
    }
    let chosenCode = Object.keys(gameCodes).map(gameCode => gameCode == chosenWeapon ? gameCodes[gameCode] : "").filter(item => item !== "")
    let enemyCode = Object.keys(gameCodes).map(gameCode => gameCode == randomEnemyWeapon ? gameCodes[gameCode] : "").filter(item => item !== "")
    document.querySelector(".first-row").innerHTML = `
    <div class="item ${chosenWeapon}">
        <span>${chosenCode[0]}</span>
    </div>
    <div class="item ${randomEnemyWeapon}">
        <span>${enemyCode[0]}</span>
    </div>
    `
    const winnerDiv = document.querySelector(".winner")
    
    winnerDiv.style.display = "block"
    winnerDiv.innerHTML = `
    <h2>${isWinner == null ? "Tie!" : isWinner == true ? "You won!" : "You lost!"}</h2>
    <button onClick="gameRestart()">Restart</button>
    `
    /*
    Pontszámítás de nem működik
    if(isWinner == true){
        let scoreOutput = parseInt(document.querySelector("#score").innerHTML)
        document.querySelector("#score").innerHTML = scoreOutput + 1
    }
    */

}

const gameRestart = () => {
    const firstRow = document.querySelector(".first-row")
    const lastRow = document.querySelector(".last-row")
    const winnerDiv = document.querySelector(".winner")

    firstRow.innerHTML = `
    <div class="item clickable paper" id="paper">
        <span id="paper">&#128221;</span>
    </div>
    <div class="item clickable scissors" id="scissors">
        <span id="scissors">&#9986;</span>
    </div>
    `
    lastRow.style.display = "flex"
    winnerDiv.style.display = "none"
    clickableEventListener()
}

const gameStart = (chosenWeapon) => {
    const enemyWeapons = ["rock", "paper", "scissors"]
    const randomEnemyWeapon = enemyWeapons[Math.round(Math.random() * 2)]
    let isWinner = checkWinner(chosenWeapon, randomEnemyWeapon)
    console.log(`${chosenWeapon} ${randomEnemyWeapon} ${isWinner}`)
    outputWinner(chosenWeapon, randomEnemyWeapon, isWinner)
}