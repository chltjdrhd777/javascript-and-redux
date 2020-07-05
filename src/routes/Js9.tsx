import React from "react";

export default () => {
  ////////! Map() ///////////
  //? upgrade version of array which can get a key and a value

  //benefit
  //1. a key can be any type (string,number,boolean,object,array)
  //2. easily check the total number of items (by using .size() )
  //!3. I can labbel the numerous objects

  //? form : const name = new Map()
  //? add : name.set(key, value)
  //? check(boolean) : name.has(key)
  //? identify value : name.get(key)
  //? how many(number) : name.size;
  //? delete all : name.clear();
  //? delete specific : name.delete(key : number)
  const u1 = { name: "1" };
  const usingMap = new Map(); // Map {}
  usingMap.set(u1, "value1"); // Map {0: {u1 : "value1"}}
  usingMap.has(u1); //true
  usingMap.get(u1); // "value1"
  usingMap.set(u1, "value_changed"); // Map {0:{u1 : "value_changed"}}
  console.log(usingMap.size); // 1
  usingMap.set(["what is the first number"], 1);
  usingMap.set(2, "2");
  usingMap.set(true, "correct");
  usingMap.set(false, "you are wrong");
  for (let [key, value] of usingMap) {
    console.log(key, value);
  }
  usingMap.delete(2); //! "delete" can delete only "number" type key
  usingMap.clear(); // Map {}
  console.log(usingMap);

  //////////! Class ////////////////////
  //? as I already expected, class could be used the substitute of object oriented prototype form

  class Suger {
    constructor(private name: string) {}
    //? private = only can be used in this "Suger" class
    //? protected = can be used by class itself and the class inheriting this Suger class
    //? public = can be used globally
    //? readonly = can't change this variable

    //static = just attached
    static publicFunction() {
      console.log("static allows me to use this function outside");
    }

    //-Proto-
    //! if I set the function outside the constructor,
    //! then it stored in -proto-
    //! but, not variables
    storedInProto() {
      console.log("wow");
    }
  }
  const sugerSuger = new Suger("suger, right?");
  console.log(sugerSuger);

  Suger.publicFunction(); //! it works because, class is basically an object, and what I did is just adding a method to a "Suger" object

  return <div></div>;
};
