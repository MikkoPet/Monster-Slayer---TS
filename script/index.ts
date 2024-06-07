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
        this.updateHealthDisplay();
        this.checkPlayerHealth();
    }

    playerAttack() {
        let playerPotency = this.defineDamage(8, 15);
        this.monsterHealth -= playerPotency;
        if (this.checkEnemyHealth()) {return;};
        this.monsterAttack();
    }

    playerSpecialAttack() {
        let playerPotency = this.defineDamage(10, 20);
        this.monsterHealth -= playerPotency;
        if (this.checkEnemyHealth()) {return;};
        this.monsterAttack();
    }

    playerHeal() {
        let playerPotency = this.defineDamage(8, 15);
        this.playerHealth += playerPotency;
        this.monsterAttack();
    }

    abandon() {
        alert("You flee!");
        this.restartGame();
    }

    checkEnemyHealth() {
        if (this.monsterHealth <= 0) {
            alert(`You have slain the monster!`);
            this.restartGame();
            return true;
        }
    }

    checkPlayerHealth() {
        if (this.playerHealth <= 0) {
            alert(`The monster has slain you!`);
            this.restartGame();
        }
    }

    updateHealthDisplay() {
        displayPlayerHealth.innerText = `Your health: ${this.playerHealth}`;
        displayMonsterHealth.innerText = `Monster's health: ${this.monsterHealth}`;
    }

    restartGame() {
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.updateHealthDisplay();
        return true;
    }
}

let game = new Arena;


attackBtn.addEventListener("click", () => game.playerAttack());
specialAttackBtn.addEventListener("click", () => game.playerSpecialAttack());
healBtn.addEventListener("click", () => game.playerHeal());
abandonBtn.addEventListener("click", () => game.abandon());

