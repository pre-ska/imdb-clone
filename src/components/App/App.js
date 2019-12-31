import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "../elements/Header/Header";
import Home from "../Home/Home";
import NotFound from "../elements/NotFound.js/NotFound";
import Movie from "../Movie/Movie";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:movieId" component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
