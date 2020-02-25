import React from "react";

export default function IntroText(props) {
  const { isAuthenticated } = props;
  if (isAuthenticated) {
    return null;
  } else {
    return (
      <div className="intro-text">
        <p>Use it locally or sign up for an account</p>
        <hr />
      </div>
    );
  }
}
