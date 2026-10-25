const passwordInput = document.querySelector(".password-input");
const genBtn = document.getElementById("gen-btn");

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~|}{[]></-=";
const allChars = upper + lower + numbers + symbols;

const length = 7;

function generatePassword() {
  let password = "";

  // hubi in ugu yaraan hal nooc oo kasta uu ku jiro
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // buuxi inta harsan
  while (password.length < length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  passwordInput.value = password;
}

genBtn.addEventListener("click", generatePassword);


// quize app
const quizData = [
    {
        question: "What is the capital city of Somalia?",
        a: "Hargeisa",
        b: "Mogadishu",
        c: "Kismayo",
        d: "Garowe",
        correct: "b"
    },
    {
        question: "How many days are there in a week?",
        a: "5 days",
        b: "6 days",
        c: "7 days",
        d: "8 days",
        correct: "c"
    },
    {
    question: "What is the presedent of somali",
    a: "xasan dalxureye",
    b: "xasan dalxaraashe",
    c: "sheikh shariif sh-ahmed",
    d: "wadanku wabila madax wayen",
    correct: "d"
  },
    {
        question: "Which is the largest ocean in the world?",
        a: "Atlantic Ocean",
        b: "Indian Ocean",
        c: "Pacific Ocean",
        d: "Arctic Ocean",
        correct: "c"
    },
    {
        question: "How many months are there in a year?",
        a: "10 months",
        b: "11 months",
        c: "12 months",
        d: "13 months",
        correct: "c"
    }
];

const quiz = document.getElementById("quize");
const question = document.getElementById("question");
const answers = document.querySelectorAll(".answer");

const a_text = document.getElementById("a-text");
const b_text = document.getElementById("b-text");
const c_text = document.getElementById("c-text");
const d_text = document.getElementById("d-text");

const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    deselectAnswers();

    const currentData = quizData[currentQuiz];

    question.textContent = currentData.question;
    a_text.textContent = currentData.a;
    b_text.textContent = currentData.b;
    c_text.textContent = currentData.c;
    d_text.textContent = currentData.d;

    answers.forEach((answer) => {
        const label = document.querySelector(
            `label[for="${answer.id}"]`
        );

        label.classList.remove("correct", "wrong");
        answer.disabled = false;
    });

    submitBtn.disabled = false;
}

function deselectAnswers() {
    answers.forEach((answer) => {
        answer.checked = false;
    });
}

function getSelected() {
    let answer;

    answers.forEach((item) => {
        if (item.checked) {
            answer = item.id;
        }
    });

    return answer;
}

submitBtn.addEventListener("click", () => {
    const answer = getSelected();

    if (!answer) {
        alert("Please select an answer!");
        return;
    }

    const correctAnswer = quizData[currentQuiz].correct;

    answers.forEach((item) => {
        const label = document.querySelector(
            `label[for="${item.id}"]`
        );

        if (item.id === correctAnswer) {
            label.classList.add("correct");
        } else if (item.id === answer) {
            label.classList.add("wrong");
        }

        item.disabled = true;
    });

    if (answer === correctAnswer) {
        score++;
    }

    submitBtn.disabled = true;

    setTimeout(() => {
        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly!</h2>
                <button onclick="location.reload()">Play Again</button>
            `;
        }
    }, 1000);
});

loadQuiz();


//  pomodoro

 const number = document.querySelector(".number");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".rset-btn");

let timeLeft = 5 * 60;
let timer = null;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    number.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
    if (timer !== null) return;

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(timer);
            timer = null;
            alert("Waqtigii Pomodoro-ga wuu dhammaaday!");
        }
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    timeLeft = 1 * 60;
    updateTimer();
});

updateTimer();

 // EVC PLUS ELEMENTS
 const evcCode = document.getElementById("evc-code");
const evcSend = document.getElementById("evc-send");
const evcResult = document.getElementById("evc-result");

// DATA
let evcBalance = 100;
let recipient = "";
let amount = 0;

// SCREEN STATE:
// start, menu, info, recipient, amount, confirm, pin, done
let screen = "start";

// EVENTS
evcSend.addEventListener("click", handleInput);

evcCode.addEventListener("keydown", function (e) {
    if (e.key === "Enter") handleInput();
});

// HELPERS
function setInput(placeholder, type = "text") {
    evcCode.value = "";
    evcCode.type = type;
    evcCode.placeholder = placeholder;
    evcCode.focus();
}

function showError(msg) {
    evcResult.innerHTML += `<p style="color:red;">${msg}</p>`;
}

// MAIN HANDLER
function handleInput() {
    const value = evcCode.value.trim();

    switch (screen) {
        case "start":
            if (value === "*770#") {
                showMenu();
            } else {
                evcResult.innerHTML = "<p>Fadlan geli *770#</p>";
                evcCode.value = "";
            }
            break;

        case "menu":
            handleOption(value);
            break;

        case "info":
        case "done":
            showMenu();
            break;

        case "recipient":
            handleRecipient(value);
            break;

        case "amount":
            handleAmount(value);
            break;

        case "confirm":
            handleConfirm(value);
            break;

        case "pin":
            handlePin(value);
            break;
    }
}

// MAIN MENU
function showMenu() {
    screen = "menu";

    evcResult.innerHTML = `
        <h3>EVC-PLUS</h3>
        <p>1. Itus haraaga</p>
        <p>2. Kaarka hadalka</p>
        <p>3. Bixi biil</p>
        <p>4. U wareeji lacag</p>
        <p>5. Warbixinta kooban</p>
        <p>6. Salaam Bank</p>
        <p>7. Maareynta</p>
        <p>8. Taaj</p>
        <p>9. Bixinta biilasha</p>
        <p>0. Ka bax</p>
    `;

    setInput("Geli doorashada (1-9)");
}

// MENU OPTIONS
function handleOption(option) {
    if (option === "1") {
        screen = "info";
        evcResult.innerHTML = `
            <h3>Haraagaaga</h3>
            <p>Haraagaagu waa $${evcBalance.toFixed(2)}</p>
            <p>Riix Send si aad ugu noqoto menu-ga.</p>
        `;
        setInput("Riix Send");

    } else if (option === "4") {
        showRecipient();

    } else if (["2", "3", "5", "6", "7", "8", "9"].includes(option)) {
        screen = "info";
        evcResult.innerHTML = `
            <p>Adeeggan wali lama dhamaystirin.</p>
            <p>Riix Send si aad ugu noqoto menu-ga.</p>
        `;
        setInput("Riix Send");

    } else if (option === "0") {
        screen = "start";
        evcResult.innerHTML = "";
        setInput("*770#");

    } else {
        showError("Fadlan dooro lambar u dhexeeya 1 iyo 9.");
        evcCode.value = "";
    }
}

// TRANSFER: RECIPIENT
function showRecipient() {
    screen = "recipient";
    evcResult.innerHTML = `
        <h3>Lacag Dirid</h3>
        <p>Geli lambarka qofka aad u dirayso.</p>
        <p>(Geli 0 si aad ugu noqoto menu-ga)</p>
    `;
    setInput("Lambarka qofka", "tel");
}

function handleRecipient(value) {
    if (value === "0") {
        showMenu();
        return;
    }

    if (!/^[0-9]{6,15}$/.test(value)) {
        showRecipient();
        showError("Lambar sax ah geli.");
        return;
    }

    recipient = value;
    showAmount();
}

// TRANSFER: AMOUNT
function showAmount() {
    screen = "amount";
    evcResult.innerHTML = `
        <h3>Lacag Dirid</h3>
        <p>Lambarka: ${recipient}</p>
        <p>Geli lacagta aad dirayso.</p>
        <p>Haraagaaga: $${evcBalance.toFixed(2)}</p>
    `;
    setInput("Lacagta", "number");
}

function handleAmount(value) {
    amount = Number(value);

    if (value === "" || !Number.isFinite(amount) || amount <= 0) {
        showAmount();
        showError("Geli lacag sax ah.");
        return;
    }

    if (amount > evcBalance) {
        showAmount();
        showError("Haraagaagu kuma filna lacagtaas.");
        return;
    }

    showConfirm();
}

// TRANSFER: CONFIRM
function showConfirm() {
    screen = "confirm";
    evcResult.innerHTML = `
        <h3>Xaqiiji Lacag Dirista</h3>
        <p>Lambarka: ${recipient}</p>
        <p>Lacagta: $${amount.toFixed(2)}</p>
        <p>1. Haa</p>
        <p>2. Maya</p>
    `;
    setInput("Geli 1 ama 2", "number");
}

function handleConfirm(value) {
    if (value === "1") {
        showPin();
    } else if (value === "2") {
        showMenu();
    } else {
        showConfirm();
        showError("Dooro 1 ama 2.");
    }
}

// PIN SCREEN
function showPin() {
    screen = "pin";
    evcResult.innerHTML = `
        <h3>Geli PIN-ka</h3>
        <p>Geli PIN-kaaga 4 lambar ah.</p>
    `;
    setInput("PIN-ka", "password");
    evcCode.maxLength = 4;
}

function handlePin(value) {
    if (!/^[0-9]{4}$/.test(value)) {
        showPin();
        showError("PIN-ku waa inuu ka koobnaadaa 4 lambar.");
        return;
    }

    finishTransfer();
}

// COMPLETE TRANSFER
function finishTransfer() {
    evcBalance -= amount;
    screen = "done";
    evcCode.maxLength = 524288; // default

    evcResult.innerHTML = `
        <h3>Hawlgalka waa dhammaaday</h3>
        <p>Lacagta: $${amount.toFixed(2)}</p>
        <p>Lambarka: ${recipient}</p>
        <p>Haraaga cusub: $${evcBalance.toFixed(2)}</p>
        <p>Riix Send si aad ugu noqoto menu-ga.</p>
    `;

    setInput("Riix Send");
}