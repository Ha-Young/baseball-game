function BaseBallMgmt() {
  this.score = 10;
  this.correctAnswer = [];
  this.answerList = [];
  this.resultList = [];
}

BaseBallMgmt.prototype.makeRandomNum = function () {
  let randomNum;
  let overlapNum = "999";

  while (overlapNum) {
    randomNum = Math.floor(Math.random() * 9).toString();
    overlapNum = this.correctAnswer.find(function (num) {
      return num === randomNum;
    });
  }

  return randomNum;
};

BaseBallMgmt.prototype.makeCorrectAnswer = function () {
  for (let i = 0; i < 3; i++) {
    this.correctAnswer.push(this.makeRandomNum());
  }
  console.log("make correct answer", this.correctAnswer);
};

BaseBallMgmt.prototype.init = function () {
  console.log("claer", this.score, this.answerList, this.resultList);
  this.score = 10;
  this.answerList = [];
  this.resultList = [];
  this.makeCorrectAnswer();
};

BaseBallMgmt.prototype.inputAnswer = function (
  answer,
  nonCollectCallbackFunc,
  collectCallbackFunc,
  failCallbackFunc
) {
  if (this.checkAnswer(answer) === -1) {
    failCallbackFunc("inputErr");
    return;
  }

  const result = this.getResult(answer);

  this.score -= 1;
  this.answerList.push(answer);
  this.resultList.push(result);

  if (result === "3S") collectCallbackFunc(this.score);
  else nonCollectCallbackFunc(this.score, this.answerList, this.resultList);
};

BaseBallMgmt.prototype.getResult = function (answer) {
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
    result = `${strike}S ${ball}B`;
  }

  return result;
};

BaseBallMgmt.prototype.checkAnswer = function (answer) {
  return answer.search(/^[0-9]{3}$/);
};

module.exports = BaseBallMgmt;
