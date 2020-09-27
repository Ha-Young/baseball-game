const BaseBallMgmt = require("./BaseBallMgmt");

const gameStartViewElement = document.getElementById("start-page");
const gameStartBtnElement = gameStartViewElement.querySelector("h1");
const gamePlayViewElement = document.getElementById("play-page");
const inputAnswerElement = document.getElementById("play-input");

const baseBallMgmtInstance = new BaseBallMgmt();

function gameStart() {
  gameStartViewElement.style.display = "none";
  gamePlayViewElement.style.display = "block";

  baseBallMgmtInstance.init();
}

function inputAnswer(e) {
  if (e.keyCode == 13) {
    console.log("enter", e.target.value);
  }
}

function init() {
  gameStartBtnElement.addEventListener("click", gameStart);
  inputAnswerElement.addEventListener("keydown", inputAnswer);
}

init();
