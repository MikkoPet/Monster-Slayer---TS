const attackBtn : any = document.querySelector(".attackButton");
const specialAttackBtn : any = document.querySelector(".specialAttackButton");
const healBtn : any = document.querySelector(".healButton");
const abandonBtn : any = document.querySelector(".abandonButton");
const displayPlayerHealth : any = document.querySelector(".playerHealth");
const displayMonsterHealth : any = document.querySelector(".ghoulHealth");

class Arena {
    playerHealth : number = 100;
    monsterHealth : number = 100;

    defineDamage(min : number, max : number) {
        return Math.floor((Math.random() * max) + min);
    }

    monsterAttack() {
        let monsterPotency = this.defineDamage(10, 15);
        this.playerHealth -= monsterPotency;
    }

    playerAttack() {
        let playerPotency = this.defineDamage(8, 15);
        this.monsterHealth -= playerPotency;
    }

    playerSpecialAttack() {
        let playerPotency = this.defineDamage(10, 20);
        this.monsterHealth -= playerPotency;
    }

    playerHeal() {
        let playerPotency = this.defineDamage(8, 15);
        this.playerHealth += playerPotency;
    }

    abandon() {
        alert("You flee!");
        this.restartGame();
    }

    restartGame() {
        this.playerHealth = 100;
        this.monsterHealth = 100;
    }
}

let game = new Arena;

function updateHealthDisplay() {
    displayPlayerHealth.innerText = `Your health: ${game.playerHealth}`;
    displayMonsterHealth.innerText = `Your health: ${game.monsterHealth}`;
}

function checkPlayerHealth() {
    if (game.playerHealth <= 0) {
        console.log(`The monster has slain you!`);
        game.restartGame();
    }
}

function checkEnemyHealth() {
    if (game.monsterHealth <= 0) {
        console.log(`You have slain the monster!`);
        game.restartGame();
    }
}

function perTurnRefresh() {
    updateHealthDisplay();
    checkEnemyHealth();
    checkPlayerHealth();
}


function playerAttack() {
    game.playerAttack();
    game.monsterAttack();
    perTurnRefresh();
}

function specialPlayerAttack() {
    game.playerSpecialAttack();
    game.monsterAttack();
    perTurnRefresh();
}

function playerHeal() {
    game.playerHeal();
    game.monsterAttack();
    perTurnRefresh();
}


attackBtn.addEventListener("onclick", playerAttack());
specialAttackBtn.addEventListener("onclick", specialPlayerAttack());
healBtn.addEventListener("onclick", playerHeal());
abandonBtn.addEventListener("onclick",game.abandon());

