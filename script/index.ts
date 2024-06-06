const attackBtn : any = document.querySelector(".attackButton");
const specialAttackBtn : any = document.querySelector(".specialAttackButton");
const healBtn : any = document.querySelector(".healButton");
const abandonBtn : any = document.querySelector(".abandonButton");
const displayPlayerHealth : any = document.querySelector("playerHealth");
const displayGhoulHealth : any = document.querySelector("ghoulHealth");

let currentPlayer : any;
let ghoul : any;


class Monster {
    name: string;
    health: number = 100;
    attackPotency: any = [10 - 15];

    opponent: any = currentPlayer;

        constructor(name: string) {
            this.name = name;
        }
    
    attack() {
        const currentAttack = Math.random() * (this.attackPotency[1] - this.attackPotency[0]) + this.attackPotency[0];
        this.opponent.health -= currentAttack;
    }
}

class Player extends Monster {

    opponent = ghoul;
    attackPotency: any = [8, 13];

    specialAttack() {
        const currentAttack = Math.random() * 1.2 * (this.attackPotency[1] - this.attackPotency[0]) + this.attackPotency[0];
        this.opponent.health -= currentAttack;
    }

    heal() {
        const currentHeal = Math.random() * (this.attackPotency[1] - this.attackPotency[0]) + this.attackPotency[0];
        this.health += currentHeal;
    }

    abandon() {
        console.log("You run away.");
        restartGame();
    }
}

ghoul = new Monster("Ghoul");
currentPlayer = new Player("Knight");

function updateHealthDisplay() {
    displayPlayerHealth.innerText = `Your health: ${currentPlayer.health}`;
    displayGhoulHealth.innerText = `Your health: ${ghoul.health}`;
}

function restartGame() {
    currentPlayer.health = 100;
    ghoul.health = 100;
}


function checkPlayerHealth() {
    if (currentPlayer.health <= 0) {
        console.log(`${ghoul.name} has slain ${currentPlayer.name}`);
        restartGame();
    }
}

function checkEnemyHealth() {
    if (ghoul.health <= 0) {
        console.log(`${currentPlayer.name} has slain ${ghoul.name}`);
        restartGame();
    }
}

function perTurnRefresh() {
    updateHealthDisplay();
    checkEnemyHealth();
    checkPlayerHealth();
}

function playerAttack() {
    currentPlayer.attack();
    ghoul.attack();
    perTurnRefresh();
}

function specialPlayerAttack() {
    currentPlayer.specialAttack();
    ghoul.attack();
    perTurnRefresh();
}

function playerHeal() {
    currentPlayer.heal();
    ghoul.attack();
    perTurnRefresh();
}

function playerFlees() {
    currentPlayer.specialAttack();
    ghoul.attack();
    perTurnRefresh();
}


attackBtn.addEventListener("onclick", playerAttack());
specialAttackBtn.addEventListener("onclick", specialPlayerAttack());
healBtn.addEventListener("onclick", playerHeal());
abandonBtn.addEventListener("onclick", playerFlees());