import React from "react";

//all objects created have own "prototype property" which comes from "window.object"
//they store thier contents in prototype and object respectively can call the data in prototype which is "inheritance"
//if the request doesn' exist in the target object, request goes up to the "window.obejct" and then, there is no information that you inquire, return null

export default () => {
  //1. new = making a brand-new "empty" object
  //2. constructor(in this case, "Person") is called with arguments
  //3. calling a function cause making new "execution context" which contains all empty properties (name,yearOfBirth,job)
  //4. with arguments sent beforhand, it deploys these values into the empty propeties
  //5. finally, const "john" has the object {name:'John', yearOfBirth:1990, job:'teacher'}
  //6. The reason it's form is function expression is that "this" should be designating it's own father. if not, it calls window.....
  const Person = function (
    this: any,
    name: string,
    yearOfBirth: number,
    job: string
  ) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  };

  const john = new (Person as any)("John", 1990, "teacher");
  const marry = new (Person as any)("Marry", 1991, "police");
  console.log(john);
  console.log(marry);

  //? then, How does inheritance works?
  //As I saw, inheritance is realized by "prototype chain"
  //when object is created, "Window Object" attach "prototype" to object which acts as inheritance entrance
  //Prototype property contains all properties and
  //when other objects call inheritance, they copy prototype's information and stored it in their own prototype properties
  // like this

  Person.prototype.testFunction = () => {
    console.log("work?");
  }; // then, constructor "Person"'s prototype constines testFunction which is now transmitted by "prototype chain"
  const inheritanceTest = new (Person as any)();
  console.log(inheritanceTest); // this would containes method "testFunction" in a "prototype" property.

  console.log(inheritanceTest.hasOwnProperty("job")); //true
  console.log(inheritanceTest.hasOwnProperty("testFunction")); // false
  //in the prototype, there is intrinstir prototype property inheriting from Window.object
  //and this global object properties can be used directly like that above
  //as I can saw, job property is it's own property so that the answer is "true"
  //on the other hand, testFunction is stored in "prototype" property so that it is not a own property of inheritanceTest object. so "false"

  //! but, In my opinion, class is more useful to realize "Object based coding" and "Recycling"
  //! I just wrote this because of my understanding about the class structure below

  class Person2 {
    constructor(private name: string, private yearOfBirth: number) {}
  }
  //private means I won't allows other people to do kind of
  //(Person2.name = "vrrrrrrr")

  const john2 = new Person2("Jhon2", 1990);
  console.log(john2);

  //? it is the shorthand version of
  class Person2full {
    private name: string;
    private yearOfBirth: number;

    constructor(name: string, yearOfBirth: number) {
      this.name = name;
      this.yearOfBirth = yearOfBirth;
    }
  }
  const b = new Person2full("a", 2);
  console.log(b);
  // fucking redundancy

  //in class, prototype is realized by "extends"
  class InheritThis {
    constructor(private age: number) {}
  }
  class Person3 extends InheritThis {
    constructor(age: number, private name: string, private job: string) {
      super(age); //prototype part
    }
  }

  const check = new Person3(2, "Mike", "baby");
  console.log(check);

  return <div></div>;
};
