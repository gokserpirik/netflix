import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { auth } from "./Provider/firebase";
import "./Style/LoginPage.css";

function LoginPage() {
  /* ! firebase */
  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  /*!  firebase */

  const [emailText, setEmailText] = useState("");

  const signMail = (e) => {
    e.preventDefault();
    SignInWithGoogle();
    /* there should be a mail sign in option,
        but I'll continue with Google sign-in for this project. */
  };

  return (
    <div className="login">
      <div className="loginHeader">
        <div className="loginHeader__logo">
          <img src="./Logo.png" alt="" />
        </div>
        <div className="loginHeader__buttons">
          <select
            className="loginHeader__buttons__lang"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option value="english">English</option>
            <option value="turkish">Türkçe</option>
          </select>
          <div onClick={signMail} className="loginHeader__buttons__login">
            Sign In
          </div>
        </div>
      </div>

      <div className="loginContent">
        <div className="loginContent__start">
          <div className="loginContent__start__title">
            <h1>
              Unlimited movies, TV
              <br />
              shows, and more.
            </h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
          </div>

          <div className="loginContent__start__form">
            <form id="start__form" onSubmit={signMail}>
              <input
                type="email"
                placeholder="Email address"
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
              />
              <div className="loginContent__start__form__btn">
                <button disabled={!emailText} id="login_form_btn" type="submit">
                  Get Started &#62;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
