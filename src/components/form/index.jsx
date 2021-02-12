import React from "react";
import {Switch, Route} from "react-router-dom";

import Autorization from "./FormAutorization";
import Register from "./FormRegister";
import Navigation from "./Navigation";

import "../../scss/form/index.scss";

export default () => {
  return (
    <div className="authorization">

      <Navigation />
      <Switch>
        <Route path={["/", "/login"]} exact component={Autorization} />
        <Route path="/register" exact component={Register} />
      </Switch>

    </div>
  );
};
