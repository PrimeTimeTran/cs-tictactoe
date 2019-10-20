import React from "react";

import FacebookLogin from "react-facebook-login";

export default function SignInPage(props) {
  return (
    <div className="bg-secondary h-100 d-flex flex-column justify-content-center align-items-center">
      <FacebookLogin
        fields="name,email,picture"
        callback={props.responseFacebook}
        appId={process.env.REACT_APP_HELLO_WORLD}
      />
    </div>
  );
}
