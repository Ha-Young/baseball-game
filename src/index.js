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
    const inputValue = e.target.value;

    baseBallMgmtInstance.inputAnswer(
      inputValue,
      function (score, inputList, resultList) {
        setValueOnPage(score, inputList, resultList);
      },
      function (score) {
        alert(
          `축하합니다. 정답을 맞추셨습니다.\n당신의 점수는 ${score}점 입니다.`
        );
      },
      function () {
        alert("입력값이 세자리가 아닙니다. 다시 입력해주세요.");
      }
    );
  }
}

function init() {
  gameStartBtnElement.addEventListener("click", gameStart);
  inputAnswerElement.addEventListener("keydown", inputAnswer);
}

init();
