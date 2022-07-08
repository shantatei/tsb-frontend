import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import zxcvbn from "zxcvbn";
import { themeFont } from "../../utils/theme";

const PasswordComplexity = ({ valueOfNewPassword }) => {
  const testResult = zxcvbn(valueOfNewPassword);
  const num = (testResult.score * 100) / 4;

  const [passwordValidity, setPasswordValidity] = useState({
    minLength: null,
    minLowerCase: null,
    minUpperCase: null,
    minNumbers: null,
    minSpecSymbols: null,
  });

  const isNumberRegex = /\d/;
  const oneLowerCase = /^(?=.*?[a-z])/;
  const oneUpperCase = /^(?=.*?[A-Z])/;
  const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  useEffect(() => {
    setPasswordValidity({
      minLength: valueOfNewPassword?.length >= 6,
      minLowerCase: !!oneLowerCase.test(valueOfNewPassword),
      minUpperCase: !!oneUpperCase.test(valueOfNewPassword),
      minNumbers: !!isNumberRegex.test(valueOfNewPassword),
      minSpecSymbols: !!specialCharacterRegex.test(valueOfNewPassword),
    })
  }, [valueOfNewPassword])
  

  const PasswordStrengthIndicatorItem = ({isValid, text}) =>{
    return <li style={{color: isValid ? "green" : "red"}}>{text}</li>
  }

  const funcProgressLabel = () => {
    switch (testResult.score) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "none";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "grey";
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "darkgreen";
      case 4:
        return "green";
      default:
        return "none";
    }
  };

  const changeProgressBarColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "10px",
  });

  return (
    <>
      <div>
        Password Strength:
        <span style={{ color: funcProgressColor() }}>
          {funcProgressLabel()}
        </span>
      </div>
      <div style={{ background: "grey" }}>
        <ProgressBar style={changeProgressBarColor()} />
      </div>
      <div
        style={{
          fontFamily:
            themeFont,
        }}
      >
        Password must contain:
      </div>
      <ul>
        <PasswordStrengthIndicatorItem
        text="Have at least 6 characters"
        isValid = {passwordValidity?.minLength}
        />
        <PasswordStrengthIndicatorItem
        text="Have at least 1 lowercase english character"
        isValid = {passwordValidity?.minLowerCase}
        />
        <PasswordStrengthIndicatorItem
        text="Have at least 1 uppercase english character"
        isValid = {passwordValidity?.minUpperCase}
        />
        <PasswordStrengthIndicatorItem
        text="Have at least one special symbol"
        isValid = {passwordValidity?.minSpecSymbols}
        />
        <PasswordStrengthIndicatorItem
        text="Have at least 1 number"
        isValid = {passwordValidity?.minNumbers}
        />
      </ul>
    </>
  );
};

export default PasswordComplexity;
