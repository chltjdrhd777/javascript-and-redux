# I am going to learn Javascript basic

Updating in Js.tsx series in routes(Js1,Js2 ......)

src/routes

# legacy (1~6)

1. Js1 = loop
2. Js2 = GEC,EC,Hoisting,scope-chain, and This

3. Js3 = making a dice game

4. Js4 = object oriented development, prototype
5. Js5 = IIFE, Closure, Object.call(),bind(),apply()
6. Js6 = Practice the concept of Js5 (IIFE,Closure);

# from es6 (7~)

7. Js7 = the issue of "this"
8. Js8 = ES6 updates (1) /// destructing(const[a,b]=array), spread(...obj, ...array), rest parameter
9. Js9 = Es6 updates (2) Map(), class
10. Js10 = Practice coding challenge
11. Js 11 = Asynchronous, Promises, Async and await, axios

12. final project
    //BABEL(transcompiler)
    = allows our latest codes like ES 6~~~~ to be compatible with down versions
    //webpack(bundler)
    = by interacting BABEL, it gathers all other numerous types of files like png,sass,js.... => and return one bundle file
    it's structure is like

    <webpack.config.js>
    const path = require('path'); <--- for absolute route calling
    module.exports = {

    entry : './src/......' <--- where is the target js file comming from?

    output : {
    path: path.resolve(\_\_dirname, 'dist') <----- where is the target index.html to open on the local web server

    filename : 'filename.js' //if you use webpack-dev-server, don't have to set this. it is only for when you make the bunlder.js file by through webpack
    }

    devServer:{
    contentBase : './dist'
    }

    }

    <package.json>
    {
    .
    .
    .
    "script" :{

    "devname" : "webpack --mode development" <--- for development (npm devname)

    "buildname" : "webpack --mode production" <--- for production <---- version to compress and reduce the file memory

    "start" : "webpack-dev-server --mode development --open <--- start webpack server, and immediately open the page in the local web server
    }
    }

[^1] at first, I was gonna use SCSS, but in react project, my body styling affected other tsx files. So, I return to styled components again( for react, I think, it is the most useful way to style my project)
