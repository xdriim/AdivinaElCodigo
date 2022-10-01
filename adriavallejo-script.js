const check = document.getElementById("check");
const player = document.getElementById("numero");
const boxInfo = document.querySelector(".info");
const info = document.getElementById("info");
const result = document.getElementById("Result");

let cellRow = [];

const remainingCells = `
<div class="rowResult w100 flex wrap">
  <div class="w20">
    <div class="celResult flex"></div>
  </div>
  <div class="w20">
    <div class="celResult flex"></div>
  </div>
  <div class="w20">
    <div class="celResult flex"></div>
  </div>
  <div class="w20">
    <div class="celResult flex"></div>
  </div>
  <div class="w20">
    <div class="celResult flex"></div>
  </div>
</div>
`;

const maxIteracion = 5;
let secret_code = [];
let iteracion = 0;
let playerCode = "";

while (secret_code.length < 5) {
  let random_digit = parseInt(Math.random(0, 1) * 10);
  let exist = false;
  for (let i = 0; i < secret_code.length; i++) {
    if (secret_code[i] == random_digit) {
      exist = true;
      break;
    }
  }
  if (!exist) {
    secret_code.push(random_digit);
  }
}

secret_code = secret_code.map((digit) => `${digit}`).join("");
console.log(secret_code);

function infoStyle(data) {
  switch (true) {
    case data === "win":
      boxInfo.classList.remove("info-repeat");
      boxInfo.classList.remove("info-lose");
      boxInfo.classList.remove("info-warning");
      boxInfo.classList.add("info-win");
      break;
    case data === "los":
      boxInfo.classList.remove("info-repeat");
      boxInfo.classList.remove("info-warning");
      boxInfo.classList.remove("info-win");
      boxInfo.classList.add("info-lose");
      break;
    case data === "repeat":
      boxInfo.classList.remove("info-warning");
      boxInfo.classList.remove("info-win");
      boxInfo.classList.remove("info-lose");
      boxInfo.classList.add("info-repeat");
      break;
    case data === "warning":
      boxInfo.classList.remove("info-win");
      boxInfo.classList.remove("info-lose");
      boxInfo.classList.remove("info-repeat");
      boxInfo.classList.add("info-warning");
      break;
  }
}

function addCodeCorrect() {
  document.getElementById("box1").innerHTML = secret_code[0];
  document.getElementById("box2").innerHTML = secret_code[1];
  document.getElementById("box3").innerHTML = secret_code[2];
  document.getElementById("box4").innerHTML = secret_code[3];
  document.getElementById("box5").innerHTML = secret_code[4];
}

function imWinner() {
  infoStyle("win");
  info.innerText = "Has acertado, enhorabuena!!";
  player.disabled = true;
  check.disabled = true;
}

function loser() {
  infoStyle("lose");
  info.innerText = "Has perdido";
  addCodeCorrect();
  player.disabled = true;
  check.disabled = true;
}

function nextRepeat() {
  iteracion = iteracion + 1;
  infoStyle("repeat");
  info.innerText = "Sigue intentandolo...";
}

function wrongPlayerCodeSize() {
  infoStyle("warning");
  info.innerText = `Debes introducir un numero de cinco cifras`;
}

function print() {
  playerCode = "";
  let code = "";

  player.value.split("").forEach((digit, index) => {
    if (digit === secret_code[index]) {
      code += `<span class="correct-position">${digit}</span>`;
    } else if (secret_code.includes(digit)) {
      code += `<span class="correct-number">${digit}</span>`;
    } else {
      code += `<span class="same-color">${digit}</span>`;
    }
  });
  playerCode += code;

  cellRow.push(`<div class="rowResult">${playerCode}</div>`);

  result.innerHTML = "";

  cellRow.forEach(function (cell) {
    result.innerHTML += cell;
  });

  for (let i = 1; i <= maxIteracion - cellRow.length; i++) {
    result.innerHTML += remainingCells;
  }
}

check.addEventListener("click", comprobar);
function comprobar() {
  if (player.value.length === 5) {
    if (player.value === secret_code) {
      imWinner();
      addCodeCorrect();
    } else {
      nextRepeat();
      if (iteracion >= maxIteracion) {
        loser();
      }
    }
    player.placeholder = player.value;

    print();
  } else {
    wrongPlayerCodeSize();
  }

  player.value = "";
}
