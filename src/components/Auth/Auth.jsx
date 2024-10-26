import React, { useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";

export const Auth = () => {
  const [step, setStep] = useState("login");
  return <div>{step === "login" ? <Login setStep={setStep} /> : <Signup setStep={setStep} />}</div>;
};
