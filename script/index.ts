const gameInterface: any = document.querySelector(".gameInterface");

const startBtn: any = document.querySelector('.startButton');
const gamePad : any = document.querySelector('.gamePad');

const attackBtn: any = document.querySelector(".attackButton");
const specialAttackBtn: any = document.querySelector(".specialAttackButton");
const healBtn: any = document.querySelector(".healButton");
const abandonBtn: any = document.querySelector(".abandonButton");

const displayPlayerHealth: any = document.querySelector(".playerHealth");
const displayMonsterHealth: any = document.querySelector(".ghoulHealth");
const healthZone : any = document.querySelector(".healthZone");
const playerHealthBar : any = healthZone.querySelector('div:first-child');
const monsterHealthBar : any = healthZone.querySelector('div:last-child');

class Arena {
    playerHealth: number = 100;
    monsterHealth: number = 100;

    defineDamage(min: number, max: number) {
        return Math.floor((Math.random() * max) + min);
    }

    monsterAttack() {
        let monsterPotency = this.defineDamage(5, 10);
        this.playerHealth -= monsterPotency;
        this.checkPlayerHealth();
        this.updateHealthDisplay();
    }

    playerAttack() {
        let playerPotency = this.defineDamage(3, 10);
        this.monsterHealth -= playerPotency;
        if (this.checkEnemyHealth()) { return; };
        this.monsterAttack();
    }

    playerSpecialAttack() {
        let playerPotency = this.defineDamage(10, 20);
        this.monsterHealth -= playerPotency;
        if (this.checkEnemyHealth()) { return; };
        this.monsterAttack();
    }

    playerHeal() {
        this.playerHealth += 10;
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

        playerHealthBar.style.background = `linear-gradient(to right, rgb(55, 0, 255) ${this.playerHealth}%, black ${this.playerHealth + 0.1}%) `;
        monsterHealthBar.style.background = `linear-gradient(to left, rgb(255, 0, 55) ${this.monsterHealth}%, black ${this.monsterHealth - 0.1}%)`;
    }

    startGame() {
        startBtn.style.display = "none"
        gamePad.style.display = "inline"
    }

    restartGame() {
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.updateHealthDisplay();
        startBtn.style.display = "inline"
        gamePad.style.display = "none"
        return true;
    }
}

let game = new Arena;

attackBtn.addEventListener("click", () => game.playerAttack());
specialAttackBtn.addEventListener("click", () => game.playerSpecialAttack());
healBtn.addEventListener("click", () => game.playerHeal());
abandonBtn.addEventListener("click", () => game.abandon());

gamePad.style.display = 'none';

startBtn.addEventListener("click", () => game.startGame());