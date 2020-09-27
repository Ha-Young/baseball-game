const BaseBallMgmt = require("./BaseBallMgmt");

const gameStartViewElement = document.getElementById("start-page");
const gameStartBtnElement = gameStartViewElement.querySelector("h1");
const gamePlayViewElement = document.getElementById("play-page");
const inputAnswerElement = document.getElementById("play-input");
const scoreTextElement = document.getElementById("play-score");
const answerListElement = document.getElementById("answer-list");
const resultListElement = document.getElementById("result-list");

const baseBallMgmtInstance = new BaseBallMgmt();

function newGame() {
  baseBallMgmtInstance.init();
  setValueOnPage(10, [], []);
}

function removeAllChild(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

function setList(element, list) {
  removeAllChild(element);
  for (let i = 0; i < list.length; i++) {
    const newLi = document.createElement("li");
    newLi.innerHTML = list[i];
    element.appendChild(newLi);
  }
}

function gameStart() {
  gameStartViewElement.style.display = "none";
  gamePlayViewElement.style.display = "block";

  baseBallMgmtInstance.init();
}

function setAnswerList(answerList) {
  setList(answerListElement, answerList);
}

function setResultList(resultList) {
  setList(resultListElement, resultList);
}

function setValueOnPage(score, answerList, resultList) {
  scoreTextElement.innerHTML = score;
  if (parseInt(score) < 4) {
    scoreTextElement.style.color = "red";
  } else {
    scoreTextElement.style.color = "black";
  }

  setAnswerList(answerList);
  setResultList(resultList);
}

function inputAnswer(e) {
  if (e.keyCode == 13) {
    const inputValue = e.target.value;
    e.target.value = "";

    baseBallMgmtInstance.inputAnswer(
      inputValue,
      function (score, inputList, resultList) {
        if (score == 0) {
          alert("당신은 패배하였습니다.\n게임을 다시 시작합니다.");
          newGame();
        } else {
          setValueOnPage(score, inputList, resultList);
        }
      },
      function (score) {
        alert(
          `축하합니다. 정답을 맞추셨습니다.\n당신의 점수는 ${score}점 입니다.\n게임을 다시 시작합니다.`
        );
        newGame();
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
