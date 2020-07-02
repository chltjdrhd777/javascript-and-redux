//! Encapsulation and IIFE,Closure
//? variables inside IIEF is private information <--- can't access from outside
//? but, it returns function or method immediately
//? so
//? variables <---private
//? returend function() <--- public

//? it means I can do like that below

const test = (function () {
  let x = 23;
  let add = function (a: number) {
    return x + a;
  };
  return {
    publicTest: function (b: number) {
      console.log(add(b));
    },
  };
})();

//? test.x  <---- undefined
//? test.add(5) <--- syntax error
//! but, test.publicTest(5) <--- return "28"

/****************************************************************** */

let budgetController = (function () {})();
let UIcontroller = (function () {})();
let controller = (function () {})();

export default () => {};
