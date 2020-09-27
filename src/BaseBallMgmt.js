function BaseBallMgmt() {
  this.count = 10;
  this.inputList = [];
  this.resultList = [];
}

BaseBallMgmt.prototype.makeCorrectAnswer = function () {
  this.correctAnswer = [
    Math.floor(Math.random() * 9).toString(),
    Math.floor(Math.random() * 9).toString(),
    Math.floor(Math.random() * 9).toString(),
  ];
  console.log("make correct answer", this.correctAnswer);
  // this.num1 = Math.floor(Math.random() * 9);
  // this.num2 = Math.floor(Math.random() * 9);
  // this.num3 = Math.floor(Math.random() * 9);

  // this.answerSet = new Set([this.num1, this.num2, this.num3]);
};

BaseBallMgmt.prototype.init = function () {
  console.log("claer", this.count, this.inputList, this.resultList);
  this.count = 10;
  this.inputList = [];
  this.resultList = [];
  this.makeCorrectAnswer();
};

BaseBallMgmt.prototype.inputAnswer = function (answer, failCallbackFunc) {
  if (this.checkAnswer(answer) === -1) {
    failCallbackFunc();
    return;
  }

  const result = getResult(answer);

  this.count -= 1;
  this.inputList.push(answer);
  this.resultList.push(result);
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
  return /^[0-9]{3}$/g.search(answer);
};

module.exports = BaseBallMgmt;
