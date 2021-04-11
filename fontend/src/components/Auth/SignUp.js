import { Link, useHistory } from "react-router-dom";
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import axios from "axios";
import { useState } from "react";
import { API } from "../../helper/main";

const SignUp = () => {
  const history = useHistory()

  const [formError, setFormError] = useState({})

  const handelFormError = field => {
    return !formError[field] ? "" : <li>{formError[field]}</li>
  }

  const submit = (e) => {
    e.preventDefault();

    const user = {
      username: e.target.elements.username.value.trim(),
      password: e.target.elements.password.value.trim(),
      mail: e.target.elements.mail.value.trim()
    }
    axios.post(`${API}/users/signup`, user)
      .then( res => {
        history.push("/cinema")
        alert(res.data);
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
                    type="email"
                    className="form-control bg-sub text-light rounded-lg"
                    name="mail"
                    id="mail"
                    placeholder="example@example.com"
                  />
                  <ul className="form-error">{handelFormError("mail")}</ul>
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
                <button type="submit" className="sign__btn">Sign Up</button>
                <span className="sign__text">Or</span>
                <div className="sign__social">
                  <Link to="#" id="gg"><FaGoogle /></Link>
                  <Link to="#" id="fb"><FaFacebookF /></Link>
                </div>
                <span className="sign__text">
                  You have an account? <Link to="/signin">Sign Ip!</Link>
                </span>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
