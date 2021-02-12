import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {withRouter} from "react-router-dom"

import { login } from "../../store/actions/authorization";
import { setError } from "../../store/actions/errors";


const Form = ({history}) => {
  const [inputValues, setInputValue] = useState({
    login: '',
    password: '',
  });

  const id = useSelector(({ errors }) => errors.errors.length);
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInputValue({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  }

  const submit = (e) => {
    e.preventDefault();
    const formData = inputValues;

    axios.post("/login", JSON.stringify(formData), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(({ data }) => {
      if (!data.status) {
        dispatch(setError({
          id,
          text: data.text
        }));
        return;
      }
      dispatch(login(data.user));
      history.push("/");
    })
  }



  return (
    <div className="col-md-12 form-wrapper">
      <form onSubmit={submit} className="form-horizontal">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="login"
            id="inputLogin"
            placeholder="Login"
            value={inputValues.login}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group help">
          <input
            type="password"
            className="form-control"
            name="password"
            id="inputPassword"
            placeholder="Password"
            value={inputValues.password}
            onChange={inputHandler}
          />
        </div>
        <button type="submit" className="btn btn-default">войти</button>
      </form>
    </div>
  )
}


export default withRouter(Form);