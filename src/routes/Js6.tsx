import React from "react";

export default () => {
  //by attaching all codes into the "(function(){})()" = "IIFE",
  //I can make sure that if other programmers use this code, they don't have to be interfered with my variabl definitions
  (function () {
    function Question(
      this: any,
      question: string,
      answers: [],
      correct: number
    ) {
      this.question = question;
      this.answers = answers;
      this.correct = correct;
    }

    Question.prototype.displayQuestion = function (this: any) {
      console.log(this.question);

      for (let i = 0; i < this.answers.length; i++) {
        console.log(`${i} : ${this.answers[i]}`);
      }
    };

    Question.prototype.checkAnswer = function (this: any, answer: number) {
      if (answer === this.correct) {
        console.log("correct answer");
      } else {
        console.log("wrong answer");
      }
    };

    const q1 = new (Question as any)("1+1=2?", ["yes", "no"], 1);
    const q2 = new (Question as any)(
      "is he handsome?",
      ["maybe?", "absolutely not"],
      0
    );
    const q3 = new (Question as any)(
      "do you want to go for a walk or swimming",
      ["walk", "swimming"],
      1
    );
    let questions = [q1, q2, q3];
    let n = Math.floor(Math.random() * questions.length);
    let answer = parseInt(prompt(questions[n].question)!);
    questions[n].checkAnswer(answer);
  })();

  return <div></div>;
};
