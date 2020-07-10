import React from "react";
//loop

export default () => {
  const anderson: any = {
    name: "Anderson",
    bills: [124, 48, 268, 180, 42],
    calculation: function () {
      this.tips = [];
      this.finalValues = [];
      for (let i = 0; i < this.bills.length; i++) {
        let percentage = 0.1;
        let checkList = this.bills[i];
        if (checkList < 50) {
          percentage = 0.2;
        } else if (checkList >= 50 && checkList < 200) {
          percentage = 0.15;
        } else {
          percentage = 0.1;
        }
        this.tips[i] = checkList * percentage;
        this.finalValues[i] = checkList + checkList * percentage;
      }
    },
  };
  anderson.calculation();
  console.log(anderson);

  const mark: any = {
    name: "Mark",
    bills: [150, 25, 65, 85, 100],
    calculation: function () {
      this.finalValues = [];

      const pushList = this.bills.map((every: number) => {
        if (every < 50) {
          return every * 0.2;
        } else if (every >= 50 && every < 200) {
          return every * 0.15;
        } else {
          return every * 0.1;
        }
      });
      this.tips = pushList;
    },
  };
  mark.calculation();
  console.log(mark);

  return <div>JsPractice</div>;
};
