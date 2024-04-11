const HangmanGame = {
    wordDisp: document.querySelector(".word-display"),
    guessesCnt: document.querySelector(".guesses-text b"),
    keyboard: document.querySelector(".keyboard"),
    hangmanImg: document.querySelector(".hangman-box img"),
    gameDlg: document.querySelector(".game-modal"),
    playBtn: document.querySelector(".game-modal button"),
    maxAttempts: 6,
    curWord: "",
    correctChars: [],
    wrongAttempts: 0,

    resetGame() {
        this.correctChars = [];
        this.wrongAttempts = 0;
        this.hangmanImg.src = "images/hangman-0.svg";
        this.guessesCnt.innerText = `${this.wrongAttempts} / ${this.maxAttempts}`;
        this.wordDisp.innerHTML = this.curWord.split("").map(() => `<li class="letter"></li>`).join("");
        this.keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
        this.gameDlg.classList.remove("show");
    },

    getRndWord() {
        const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
        this.curWord = word;
        document.querySelector(".hint-text b").innerText = hint;
        this.resetGame();
    },

    gameOver(isVictory) {
        const dlgTxt = isVictory ? `You found the word:` : 'The correct word was:';
        this.gameDlg.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        this.gameDlg.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
        this.gameDlg.querySelector("p").innerHTML = `${dlgTxt} <b>${this.curWord}</b>`;
        this.gameDlg.classList.add("show");
    },

    handleBtnClick(clickedButton, clickedLetter) {
        if (this.curWord.includes(clickedLetter)) {
            [...this.curWord].forEach((letter, index) => {
                if (letter === clickedLetter) {
                    this.correctChars.push(letter);
                    this.wordDisp.querySelectorAll("li")[index].innerText = letter;
                    this.wordDisp.querySelectorAll("li")[index].classList.add("guessed");
                }
            });
        } else {
            this.wrongAttempts++;
            this.hangmanImg.src = `images/hangman-${this.wrongAttempts}.svg`;
        }
        clickedButton.disabled = true;
        this.guessesCnt.innerText = `${this.wrongAttempts} / ${this.maxAttempts}`;

        if (this.wrongAttempts === this.maxAttempts) return this.gameOver(false);
        if (this.correctChars.length === this.curWord.length) return this.gameOver(true);
    },

    init() {
        for (let i = 97; i <= 122; i++) {
            const button = document.createElement("button");
            button.innerText = String.fromCharCode(i);
            this.keyboard.appendChild(button);
            button.addEventListener("click", (event) => this.handleBtnClick(event.target, String.fromCharCode(i)));
        }

        this.getRndWord();
        this.playBtn.addEventListener("click", () => this.getRndWord());
    }
};

HangmanGame.init();
