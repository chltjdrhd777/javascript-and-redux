import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./routes/Home";
import Js1 from "./routes/Js1";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/javascript" component={Js1} />
    </Router>
  );
}

export default App;
