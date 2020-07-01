import React from "react";

export default () => {
  //? IIFE = Immediately Invoked Function Expression
  //as can expect from the name, IIFE is a form to execute function immediately
  //! it is easy. just wrap the function literal with a round bracket
  (function (a: string) {
    console.log(a);
  })("hey");

  //it can be understood as the shorthand of this below
  const calling = function (a: string) {
    console.log(a);
  };
  calling("hey2");

  //if it is not an anonymous function, don't care. it works
  (function calle() {
    console.log("h");
  })(); // result = 'h'

  //if you want to use functional expression with IIFE, you can do this
  const calling2 = (function (a: string) {
    console.log(a);
  })("work");
  console.log(calling2);

  //! so, if you don't want to set any kind of calling action, like "a()"
  //! IIEF is a useful way to reduce the code lines

  //? what is closure?
  //simple, it is a function return anonymous function <--- which allows me to reuse them
  function interview(job: string) {
    if (job === "teacher") {
      return function (name: string) {
        console.log(name);
      };
    } else {
      return function () {
        console.log("sorry");
      };
    }
  } // this function return anonymous function with a name parameter

  const jobInquery = interview("teacher");
  //const jobInquery = function (name:string){console.log.....}
  jobInquery("Anderson"); // result = 'Anderson'
  //it can be exprest like that
  const jobInquery2 = interview("teacher")("jhon");
  console.log(jobInquery2);
  //this kind of expression is well used in styled-components
  //because, when we use styled components, const name = styled.div <--- this part return anonymous function
  // and `` <---this part is sent to the parameter of tha function.

  //! Ok, then, what is the benefit of using closure?
  //1. unlike prototype oriented object, I don't need to use fucking "this"
  //2. I can increase the security of properties inside objects

  //? case1. object oriented coding
  const objMaker = function (this: any, name: string) {
    this.name = name;
  };
  const obj = new (objMaker as any)("code1");
  console.log(obj); // name : code1
  //! the problem is I can modify the environment of inner space of obj from "outside" like that
  obj.name = "code1 is changed";
  console.log(obj); // name : code1 is changed

  //! but, if I use the concept of "closure", I can block the access from outside

  //? case2. closure
  const closureMaker = function () {
    let name = "can you change this?";
    return function () {
      return { name: name };
    };
  };
  console.log(closureMaker()()); //{name:can you change this?}
  closureMaker()().name = "it isn't possible";
  console.log(closureMaker()()); //{name:can you change this?}
  //! I couldn't change the value

  //but actually speaking, this concept is "private" in class
  class Closure {
    constructor(private name: string) {}
  }
  const cantChange = new Closure("you cant change this");
  console.log(cantChange); // {name:'you cant change this'}
  // cantChange.name = 'yes, can't change it' <----- this makes an error because "name" property is "private"

  //? function.call
  //it changed the direction of "this" in the Object and execute it.

  const defaultObj = function (this: any, name: string, age: number) {
    this.name = name;
    this.age = age;
    this.calculation = function (comment: string) {
      const answer = `${this.age} is young...${comment}`;
      return answer;
    }; //this = window
  };

  const anderson = new (defaultObj as any)("anderson", 2);
  console.log(anderson.calculation()); // '2' is young //"this" = anderson

  //! how to change and reuse "this" in the target object
  const maryIdentity = { name: "Mary", age: 3 };
  const mary = anderson.calculation.call(maryIdentity, "to work"); //first: target object, second~....: arguments in the method
  console.log(mary); // '3' is young //"this" = maryIdentity

  //? function.apply
  //similar to call()
  //the only difference is this accepts arguments as an array

  //? function.bind
  //similar to call()
  //the only difference is bind() doesn't call a function immediatly but copy it
  //it is replace "this" in the default object with "this" in the target object

  const defaultBind = { name: "practice" };
  const bindObject = function (this: any) {
    console.log(`${this.name} is great`);
  }; // "this" = window
  const binding = bindObject.bind(defaultBind); // "this" = defaultBind
  console.log(binding()); //"practice is great"

  return <div></div>;
};
