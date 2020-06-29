import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./routes/Home";
import Js1 from "./routes/Js1";
import Js2 from "./routes/Js2";
import Js3 from "./routes/Js3";
import Js4 from "./routes/Js4";
import Js5 from "./routes/Js5";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/js1" component={Js1} />
      <Route exact path="/js2" component={Js2} />
      <Route exact path="/js3" component={Js3} />
      <Route exact path="/js4" component={Js4} />
      <Route exact path="/js5" component={Js5} />
    </Router>
  );
}

export default App;
