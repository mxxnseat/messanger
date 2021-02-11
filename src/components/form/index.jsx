import React from "react";
import {Switch, Route} from "react-router-dom";

import Autorization from "./FormAutorization";
import Register from "./FormRegister";
import Navigation from "./Navigation";

import "../../scss/form/index.scss";

export default () => {
  return (
    <React.Fragment>

      <Navigation />
      <Switch>
        <Route path={["/", "/login"]} exact component={Autorization} />
        <Route path="/register" exact component={Register} />
      </Switch>

    </React.Fragment>
  );
};
