import React from "react";

//! the things that I have to take into account when I want to use "this"
//? 1. function(){this <---"global"}
//? 2. method(){this <---what calls it}
//? 3. method(){function(){this <---"global"}}
//? 4. when the method is called from the global area. this<--- "global"
//? 5. when the method is defined by arrow function. this<--- what calls it
//! suck

export default () => {
  const buttonEvent = {
    color: "green",
    position: 1,
    whenClicked: function (this: any) {
      const illustration = `${this.color} ${this.position}`;
      console.log(illustration);
    },
    //? it makes error because in this case, "this" is global and there is no "color" property
    //? to solve this problem, I attach "bind(buttonEvent)" after the onClick function
  };

  const byArrowFunction = {
    color: "yellow",
    position: 2,
    whenClicked: function () {
      return () => {
        const illustration = `${this.color}${this.position}`;
        console.log(illustration);
      };
    },
    //? "this" in the arrow function refers to the container (in this case, byArrowFunction)
    //? it is simple to think about bind() or closure or ...etc
  };

  //! so, In my opinion, I have to be familiar with arrow function more.
  //! if I use arrow function in the function, it doesn't worry about the whereabout of "this". more convenient right?
  return (
    <>
      <h1>this issue in an arrow function</h1>
      <button
        onClick={buttonEvent.whenClicked.bind(buttonEvent)}
        style={{ background: "green" }}
      >
        green
      </button>

      <button
        onClick={byArrowFunction.whenClicked()}
        style={{ background: "yellow" }}
      >
        yellow
      </button>
    </>
  );
};
