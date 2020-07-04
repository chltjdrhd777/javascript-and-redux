import React from "react";

export default () => {
  //////////! Destructuring///////////////
  //legacy version
  /*   const anderson = ["Anderson", 28];
  const name = anderson[0];
  const age = anderson[1];
  console.log(name, age); //'Anderson',28 */

  ////////////?ES6//////////////////////
  //1. about the array
  const [who, howOld] = ["Mary", 28];
  console.log(who, howOld); // 'Mary',28
  //? const who = 'Mary'
  //? const howOld = 28

  //2. about the object
  const obj = {
    firstKey: "value1",
    secondKey: "value2",
  };

  const { firstKey, secondKey } = obj;
  console.log(firstKey, secondKey); // 'value1','value2'
  //? In other words, the result is
  //? const firstKey = 'value1'
  //? const secondKey = 'value2'

  ////////////////////! the issue of breaking, continuing in iteration//////////////////////
  //////////////? ES5 //////////////////////
  function returnName(name: string) {
    return { name };
  } //? about the name, "changed","Mary","changed" //? If, it was break;, the name "changed","Mary","Jhon" ////////////////////? ES6 //////////////////////

  /*const objects = [
    returnName("Anderson"),
    returnName("Mary"),
    returnName("John"),
  ];

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].name === "Mary") {
      continue; // execute except me
    }
    objects[i].name = "Changed";
  } */
  /* console.log(objects); */

  //////? ES6///////////////////
  const objects2 = [returnName("a"), returnName("b"), returnName("c")];
  for (let every of objects2) {
    if (every.name === "b") {
      break;
    }
    every.name = "changed";
  }
  console.log(objects2); // about the name "changed","b","c"

  //! the issue of finding index
  //? just use findIndex() rather than indexOf() because findIndex can set more sophisticated condition
  //? findIndex() and find() return the firt value which meets the condition.
  const ages = [1, 2, 3, 4, 5];
  console.log(ages.findIndex((every: number) => every > 1)); //1
  console.log(ages.findIndex((every: number) => every === 1)); //0
  console.log(ages.find((every: number) => every > 2)); // 3
  //? find() = when you are interested in the value itself
  //? findIndex() = interested in the index of the value

  //////!  spread(...) ////////////////////////////////
  //////?ES5//////////
  function addAllNumbers(a: number, b: number, c: number) {
    return a + b + c;
  }

  const materials: [number, number, number] = [1, 2, 3];
  const sum1 = addAllNumbers.apply(null, materials);
  console.log(sum1); //6

  ////////?ES6/////////////////////////////////////////
  const materials2: [number, number, number] = [5, 6, 7];
  const sum2 = addAllNumbers(...materials2); //? ...materials = {0:5, 1:6, 2:7}
  console.log(sum2); //18

  const family1 = ["man1", "woman1"];
  const family2 = ["man2", "woman2"];
  const join = [...family1, ...family2];
  console.log(join); // ['man1','woman1','man2','woman2'];
  //? just think that spread(...) is like discharging all information into the target container

  //////////////! Array.from(target array) ///////////////////////
  const family3 = [1, 2, 3, 4, 5];
  const answer = Array.from(family3).findIndex((every: number) => every === 3);
  console.log(answer); //2

  //!

  return <div></div>;
};
