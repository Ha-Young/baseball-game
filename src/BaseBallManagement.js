function BaseBallManagement() {
  this.score = 10;
  this.correctAnswer = [];
  this.answerList = [];
  this.resultList = [];
}

BaseBallManagement.prototype.checkOverlapNum = function (inputValue) {
  const checkSet = new Set(inputValue);

  if (checkSet.size != 3) {
    return true;
  } else {
    return false;
  }
};

BaseBallManagement.prototype.makeRandomNum = function (correctAnswer) {
  let randomNum;
  let overlapNum = "999";

  while (overlapNum) {
    randomNum = Math.floor(Math.random() * 9).toString();
    overlapNum = correctAnswer.find(function (num) {
      return num === randomNum;
    });
  }

  return randomNum;
};

BaseBallManagement.prototype.makeCorrectAnswer = function () {
  const newCorrectAnswer = [];
  for (let i = 0; i < 3; i++) {
    newCorrectAnswer.push(this.makeRandomNum(newCorrectAnswer));
  }
  return newCorrectAnswer;
};

BaseBallManagement.prototype.init = function () {
  this.score = 10;
  this.answerList = [];
  this.resultList = [];
  this.correctAnswer = this.makeCorrectAnswer();
};

BaseBallManagement.prototype.inputAnswer = function (
  answer,
  nonCollectCallbackFunc,
  collectCallbackFunc,
  failCallbackFunc
) {
  if (this.checkAnswer(answer) === -1) {
    failCallbackFunc("inputErr");
    return;
  }

  if (this.checkOverlapNum(answer)) {
    failCallbackFunc("overlapErr");
    return;
  }

  const result = this.getResult(answer);

  this.score -= 1;
  this.answerList.push(answer);
  this.resultList.push(result);

  if (result === "3S") collectCallbackFunc(this.score);
  else nonCollectCallbackFunc(this.score, this.answerList, this.resultList);
};

BaseBallManagement.prototype.getResult = function (answer) {
  let result = "";
  let strike = 0;
  let ball = 0;
  correctAnswerSet = new Set(this.correctAnswer);

  // strike check
  for (let i = 0; i < 3; i++) {
    if (this.correctAnswer[i] === answer[i]) {
      strike += 1;
      correctAnswerSet.delete(answer[i]);
    }
  }

  // ball check
  for (let i = 0; i < 3; i++) {
    if (correctAnswerSet.has(answer[i])) {
      ball += 1;
    }
  }

  correctAnswerSet.clear();

  if (strike === 0 && ball === 0) {
    result = "OUT";
  } else {
    result += strike !== 0 ? `${strike}S` : "";
    result += ball !== 0 ? `${ball}B` : "";
  }

  return result;
};

BaseBallManagement.prototype.checkAnswer = function (answer) {
  return answer.search(/^[0-9]{3}$/);
};

module.exports = BaseBallManagement;
