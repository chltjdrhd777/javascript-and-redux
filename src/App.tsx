import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./routes/past/Home";
import Js1 from "./routes/past/Js1";
import Js2 from "./routes/past/Js2";
import Js3 from "./routes/past/Js3";
import Js4 from "./routes/past/Js4";
import Js5 from "./routes/past/Js5";
import Js6 from "./routes/past/Js6";
import Js7 from "./routes/Js7";
import Js8 from "./routes/Js8";
import Js9 from "./routes/Js9";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/js1" component={Js1} />
      <Route exact path="/js2" component={Js2} />
      <Route exact path="/js3" component={Js3} />
      <Route exact path="/js4" component={Js4} />
      <Route exact path="/js5" component={Js5} />
      <Route exact path="/js6" component={Js6} />
      <Route exact path="/js7" component={Js7} />
      <Route exact path="/js8" component={Js8} />
      <Route exact path="/js9" component={Js9} />
    </Router>
  );
}

export default App;
