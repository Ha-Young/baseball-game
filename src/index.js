// KEN: 정말 긴 단어를 제외하곤, 약자는 사용을 자제하시고 항상 명확한 네이밍을 해주시면 좋을것 같습니다 :)
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
  const ENTER_KEY_CODE = 13;
  if (e.keyCode == ENTER_KEY_CODE) {
    const inputValue = e.target.value;
    e.target.value = "";
    console.log("inputAnswer", inputValue);

    baseBallMgmtInstance.inputAnswer(
      inputValue,
      function (score, inputList, resultList) {
        // KEN: == 의 사용은 자제하시고, === 혹은 !==의 사용을 권장합니다! 차이점은 조사해보시면 좋을것 같네요!
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
      function (err) {
        // KEN: 개인 취향이기는 하지만, 대부분의 경우 조건문은 중괄호를 명확하게 적어주는 편이 좋은것 같습니다.
        if (err === "inputErr")
          alert("입력값이 세자리가 아닙니다. 다시 입력해주세요.");
        else if (err === "overlapErr") alert("중복된 값을 입력하면 안됩니다.");
      }
    );
  }
}

function init() {
  gameStartBtnElement.addEventListener("click", gameStart);
  inputAnswerElement.addEventListener("keydown", inputAnswer);
}

init();
