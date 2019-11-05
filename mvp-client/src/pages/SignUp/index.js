import React from "react";
import SignUpForm from "./SignUpForm";
import SignUpLink from "./SignUpForm";

const SignUpPage = () => (
  <div>
    <h1>sign up to enter</h1>
    <SignUpForm />
    <SignUpLink />
  </div>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
