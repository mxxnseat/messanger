import React, { useState } from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import { setError } from "../../store/actions/errors";
import { login as loginAction } from "../../store/actions/authorization";
import { useDispatch, useSelector } from "react-redux";

const Form = ({history}) => {
  const id = useSelector(({ errors }) => errors.errors.length);
  const [inputValues, setInputValue] = useState({
    login: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();

  const { login, nickname, password, confirmPassword } = inputValues;

  const inputHandler = (e) => {
    setInputValue({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  }
  const submit = (e) => {
    e.preventDefault();
    const formData = inputValues;

    axios.post("/register", JSON.stringify(formData), {
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
      dispatch(loginAction(data.user));
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
            id="inputLogin"
            name="login"
            placeholder="Login"
            value={login}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="nickname"
            id="inputNickname"
            placeholder="Nickname"
            value={nickname}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            id="inputPassword"
            placeholder="Password"
            value={password}
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            id="inputConfirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={inputHandler}
          />
        </div>
        <button type="submit" className="btn btn-default">Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default withRouter(Form);