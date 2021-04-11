import { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

import axios from "axios";
import { API } from "../../helper/main";

const SignIn = () => {
  const history = useHistory();

  const [formError, setFormError] = useState({});

  const handelFormError = field => {
    return !formError[field] ? "" : <li>{formError[field]}</li>
  }

  const submit = (e) => {
    e.preventDefault();

    const user = {
      username: e.target.elements.username.value.trim(),
      password: e.target.elements.password.value.trim(),
    }

    axios.post(`${API}/users/signin`, user)
      .then( res => {
        sessionStorage.removeItem("token")
        sessionStorage.setItem("token", res.data);
        history.push("/cinema")
      })
      .catch( err => {
        const error = {}
        err.response.data.forEach(err => {
          error[err.param] = err.msg
        })
        setFormError(error)
      })
  }

  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form onSubmit={submit}>
                <div className="sign__logo">
                  <Link to="/cinema" className="logo">
                    <span className="text-orange">BNN</span>CINEMA
                  </Link>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control bg-sub text-light rounded-lg"
                    name="username"
                    id="username"
                    placeholder="Username"
                  />
                  <ul className="form-error">{handelFormError("username")}</ul>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control bg-sub text-light rounded-lg"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                  <ul className="form-error">{handelFormError("password")}</ul>
                </div>
                <button type="submit" className="sign__btn">Sign In</button>
                <span className="sign__text">Or</span>
                <div className="sign__social">
                  <Link to="#" id="gg"><FaGoogle /></Link>
                  <Link to="#" id="fb"><FaFacebookF /></Link>
                </div>
                <span className="sign__text">
                  Don't have an account? <Link to="/signup">Sign up!</Link>
                </span>
                <span className="sign__text">
                  <Link to="#">Forgot password?</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
