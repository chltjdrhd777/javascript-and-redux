import React from "react";

export default () => {
  //? Prerequisite
  //1. <Parks | Streets>
  //2. Common = name, the build year
  //3. parks' = the number of trees, area
  //4. streets' = the length of streets
  //5. method = park density, average age, average size

  //every result should be consoled.

  //! common()
  class Common {
    constructor(readonly name: string, readonly buildYear: number) {}
  }

  //! Subclass
  //? note "implements vs extends"
  //? extends = inherit only "one class"
  //? implements = refer to interfaces (why plural. it means class can implements several interface)
  class Park extends Common {
    constructor(
      name: string,
      buildYear: number,
      readonly area: number,
      readonly numberTress: number
    ) {
      super(name, buildYear); //inherited part
    }

    //-Proto-
    treedensity() {
      const density = this.numberTress / this.area;
      console.log(`park name : ${this.name}, tree density : ${density}`);
    }
  }

  class Street extends Common {
    constructor(
      name: string,
      buildYear: number,
      readonly length: number,
      readonly size: number
    ) {
      super(name, buildYear);
    }

    classification() {
      const classfyData = new Map();
      classfyData.set(1, "tiny");
      classfyData.set(2, "small");
      classfyData.set(3, "normal");
      classfyData.set(4, "big");
      classfyData.set(5, "huge");
      console.log(
        `street name : ${this.name}, size:${classfyData.get(this.size)}`
      );
    }
  }

  //? three parks
  const parks = [
    new Park("park1", 1991, 0.2, 100),
    new Park("park2", 1992, 0.3, 1100),
    new Park("park3", 1993, 0.5, 1500),
  ];

  const streets = [
    new Street("street1", 2000, 1.1, 3),
    new Street("street2", 2012, 2.1, 2),
    new Street("street3", 2010, 3.1, 1),
    new Street("street4", 2020, 5, 5),
  ];

  //! reduce()
  //? reducer((pre,cur,index)=>{executing part}, default);
  //pre : accumulated result
  //cur : current data which should be dealt with
  //index : cur's index in the target array
  //default : initial value = first pre's value (if there isn,t , then the first value in the target array is pre's value)

  //? example///////////////////////////
  const parking = parks.reduce((pre: any, cur: any, index: number) => {
    pre[index] = cur.name;
    return pre;
  }, {});
  console.log(parking); // {0:'park1', 1:'park2', 2:'parks3'}

  //////////////////////////////////////////////

  function averageCal(arr: number[]) {
    const sum = arr.reduce((pre: number, cur: number) => pre + cur);
    return [sum, sum / arr.length]; // to practice destructing. const[a,b] = [c,d]
  }

  //? Report
  console.log("----------Park report-----------------");
  function reportParks(parks: Park[]) {
    //1. density
    parks.forEach((el: Park) => el.treedensity());

    //2. average age
    const ages = parks.map((every: Park) => {
      const today = new Date();
      return today.getFullYear() - every.buildYear;
    }); // [age,age,age.....]
    const [totalAge, aveAge] = averageCal(ages);
    console.log(`totalAge: ${totalAge}, averageAge : ${aveAge}`);

    //3. parks which possess more than 1000 trees
    for (let park of parks) {
      if (park.numberTress > 1000) {
        console.log(`${park.name} has ${park.numberTress} trees`);
      }
    }
  }
  reportParks(parks);

  function reportStreets(streets: Street[]) {
    console.log("==============Street report==============");
    const [totalLength, avgLength] = averageCal(streets.map((el) => el.length));
    console.log(`totalLength:${totalLength}, avLength:${avgLength}`);

    ///classify
    streets.forEach((el) => el.classification());
  }

  reportStreets(streets);
  return <div></div>;
};
