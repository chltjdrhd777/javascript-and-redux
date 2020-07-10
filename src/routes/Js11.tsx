import React from "react";
import axios from "axios";
import styled from "styled-components";

export default () => {
  //?javascript concept
  //! (1) all codes stored in "GEC"(global execution context) through "parser"
  //! (2) **variable definition's remain in GEC and called whenever needed**
  //! (3) execution codes(like console.log('hi'), a()) stored in "stack"
  //! (4) **if there is a process (like setTimeout()) which requires some time to be executed, stored in "webapis"
  //! (5) all stored in "stack" is comsumed, from top to bottom
  //! (6) all stored in "webapis" is sent to "task queue" and comsumed (it is called event loop)

  //? to sum up,      |sychronous|      |ascynhronous|
  //? codes => [GEC] => [stack] => [webapis] => [task queue]

  //? the example of asychronous parts = every action which require some information from other sources || there is timeing to be executed
  //? in other words,
  //? http request, setTimeout;

  const second = () => {
    console.log("second");
    setTimeout(() => {
      console.log(" last part : asychronous");
    }, 1000);
  };

  const first = () => {
    console.log("hey");
    second();
    console.log("the end");
  };
  first(); // "hey","second","the end", "last part: asychronous"
  //? 1. codes stored in GEC
  //? 2. execution function's stored in "stack" (first()); and consumed
  //? const first is retrieve from GEC => execution context of first is created and all execution functions( console,second(),console) is stored in an "individual stack" <---- all functions can make their own execution context and stack.
  //? so, console.log('hey') is consoled.
  //? const second is retrieve from GEC => again
  //? so, console.log('second') is consoled
  //? *** but, the next execution code is setTimeout <---- it is sent to "webapis" and consumed after stack is made empty.
  //? next, console.log("the end") is consoled
  //? *** now, stack is empty. so, setTimeout() goes to task queue, and consumed.

  //////////////! How I can handle the issue of asynchronous /////////////////

  ////////////////? traditional one ////////////////////////
  /*  function getInfo() {
    setTimeout(() => {
      // get ID
      const ID = [353, 812, 431, 221];
      console.log(ID);
      //after that,
      //? setTimeout(callback(argument),timing, callback's argument)
      setTimeout(
        (id: number) => {
          const city = { name: "Seoul", position: "Capital" };
          console.log(`${id}: ${city.name},${city.position}`);
          //after that 2,
          setTimeout(
            (illustration: string) => {
              const good = { yes: "great" };
              console.log(`yes. ${illustration} is ${good.yes}`);
            },
            1500,
            city.name
          );
        },
        1500,
        ID[2]
      );
    }, 1500);
  }
  getInfo(); //see? it is called "call back hell" */

  //////////////////? modern style : promise, async and await, AJAX //////////////////

  //1. new Promise(reoslve,reject)
  //resove(a) => when the request process is successful, return (a)
  //reject(b) => when fails, return warning
  const getID = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([523, 883, 432, 941, 212]);
    }, 1000);
    //in this case, setTimeout cannot be unsuccessful, so there is no reject
    //but imagine that if we call information from web server and makes some errors, like resolve, it returns the object inside reject
  });

  const city = function (cityId: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cityName = { name: "Seoul", position: "Capital" };
        resolve(`${cityId[0]} : ${cityName.name} and ${cityName.position}`);
      }, 1000);
    });
  };

  const cityEvaluation = function (cityIllu: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const value = { a: "good", b: "bad" };
        resolve(`${cityIllu} + ${value.a}`);
      }, 1000);
    });
  };

  //Promise has a method to get and use the resolve's return value.
  //1. then(function) = when successful, use the rusult value as agruments of arrow function then, execute specefic function.
  //2. catch() = when successful, the way to get the value in reject.
  getID.then(city).then(cityEvaluation);
  //? note. if you want to use this kind of "clear" form, define the Promise function as function() not arrow function.

  ////////////////////? await and sync/////////////////////
  //more easy way to handle asynchronous process
  //1. name the target aynchronous function "async" <--- it is like tagging "it is for webapis"
  //2. name the target Promise "await"

  const asynchronous1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5]);
    }, 1000);
  });

  const asynchronous2 = function (arr1: number[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const arr2 = arr1.map((e) => e * 2);
        resolve(arr2);
      }, 1000);
    });
  };

  const asynchronous3 = function (arr2: number[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const arr3 = arr2.map((e) => e * 3);
        resolve(arr3);
      }, 1000);
    });
  };

  async function asynchronousChain() {
    // async = "it is for webapis"
    // await = like then()
    const IDs1 = await asynchronous1;
    console.log(IDs1);
    const IDs2 = await asynchronous2(IDs1 as number[]);
    console.log(IDs2);
    const IDs3 = await asynchronous3(IDs2 as number[]);
    console.log(IDs3);
  }
  //And, remember
  // if you don't want to use even "async", "await" to get the API json information,
  // just use "axios" more convenient way which do the works like that for me beforehand.

  asynchronousChain();

  //////////////////! AJAX ////////////////////////
  //? AJAX = asynchronous javascript and xml <---- the way calling and receiving API information
  //? API = application programming interface <----- stored information in the remote server
  function getWeather(ID: number) {
    try {
      axios
        .get(
          //"https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/2487956/"
          `/api/location/${ID}/` //? by using the way "proxy" in react server
        )
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }

    //! axios = it is more shorthand way than write like
    //! async function getWeather(ID){const result = await fetch('url').then(re=>re.json())...... }
    //to avoid policy conflicts about orign matter
    //handlining CORS(cross origin resource sharing) is needed //? use proxy
  }

  getWeather(2487956); //correct case
  getWeather(121000001023); //false case

  ////////////////! by using async and await

  const Hey = styled.div`
    background: blue;
  `;
  return (
    <div>
      <Hey>hi</Hey>
    </div>
  );
};
