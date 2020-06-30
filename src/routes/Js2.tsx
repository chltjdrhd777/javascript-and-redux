import React from "react";

//?Hoisting
// in javascript, looking into their process, there are three steps
// 1. GEC(global execution context) is formed which read and store our global variables or functions
// 2. Each function can make its own EC. making each EC(executin context) which containes variables or functions ready to be activated, javascript stacks them on top of GEC
// 3. reading and activating each EC from top to bottom, it runs javascript codes

//in the process of structuring EC object, there are three components
/* EC {variable
       scope chain
       This} 
*/

//in a varibale object, it has two phases
//creating phase, and executing phase
//in the creating phase,

//1. it makes "argument object{} to send that information stored to functions"
//2. scaning codes, it defines functions => //! in this phase, function is defined itself
//3. scaning codes, it sets variables => //! in this phase, variables are defined as undefined   "const store = undefined" <-- this one is defined only in the executing phase

//these two things are called "hoisting"

//I could check this concept by them as follows

export default () => {
  calculator(2019); // 1 because function calculator is already defined in EC so that javascript already understand what it is referring to it's stack
  function calculator(year: number) {
    console.log(2020 - year);
  }
  calculator(2018); // 2

  //functionExpression(2019) it makes an error = because, in EC, "function expression" is a variable so that it's value is stored as undefined unless executing phase is started
  const functionExpression = (year: number) => {
    console.log(2020 - year);
  };
  functionExpression(2018); // this works because in a EC priority "function expression" is read beforehand and javascript understand what it is

  return <div>Hoisting</div>;
};

//?scope chain
/* EC {variable
       scope chain
       This} 
*/

// it means that where javascript code can refer to
// for example,

/* 
const a = "hello"
first(); 

function first() {
    const b ="hi"
    second();
    
    function second(){
        const c ="bye"
        console.log(a+b+c);
    }

}
*/

//! in short, it is easy to understand.
//! just remember that children can use variables and  functions stored in parents EC

//? This
//"this" is a variable stored in EC
//its role is to point out the target

//1. regular function call : "this" means "window object"
//! function callWindowThis(){ console.log(this)} <--- it returns "window" object

//2. a method : "this" means "the object" which is calling the method
//! const container = {callContainer:()=>{console.log(this)}} <--- in this case, this meanse "container"

//3. function in a method : although it is in the method, this function is now a regular function call
//so, answer is "calling window object"
const container = {
  returnWindow: () => {
    function callWindow(this: any) {
      console.log(this); //<---- returns window object
    }
  },
};
