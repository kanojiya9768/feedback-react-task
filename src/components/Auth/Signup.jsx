import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getLocalstorage,
    setLocalStorage,
} from "../../../utils/handleLocalstorage";

export const Signup = ({ setStep }) => {
  let usersTypes = ["user", "admin"];
  let [currentUserType, setCurrentUserType] = useState("user");

  let [SignUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    type: "user",
  });

  const handleChange = (e) => {
    setSignUpData(() => {
      return {
        ...SignUpData,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setSignUpData({ ...SignUpData, type: currentUserType });
  }, [currentUserType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let AllusersandAdmins =
      currentUserType === "user"
        ? getLocalstorage("all-user") || []
        : currentUserType === "admin"
        ? getLocalstorage("all-admin") || []
        : [];
    if (SignUpData?.password === SignUpData?.confirm_password) {
      if (
        AllusersandAdmins?.some(
          (data) => data?.username == SignUpData?.username
        )
      ) {
        toast.error("userName Already Exist");
      } else {
        AllusersandAdmins?.push(SignUpData);
        setLocalStorage(`all-${currentUserType}`, AllusersandAdmins);
        toast.success("Sign Up Success");
        setStep("login");
      }
    } else {
      toast.error("Both Password Must Be Same.!");
    }
  };

  console.log(SignUpData);

  return (
    <div className="form_container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form_heading">Register</p>
        <div className="role_switch_container">
          {usersTypes?.map((data, index) => {
            return (
              <div
                className="roles"
                key={index}
                onClick={() => setCurrentUserType(data)}
              >
                <input
                  type="checkbox"
                  checked={currentUserType === data}
                  name="userType"
                  id="userType"
                />
                <p>{data}</p>
              </div>
            );
          })}
        </div>
        <div className="form_inputs">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            required
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            placeholder="Password"
          />
          <input
            type="password"
            name="confirm_password"
            onChange={handleChange}
            required
            placeholder="Confirm Password"
          />
        </div>

        <input
          type="submit"
          value="Sign Up"
          onSubmit={handleSubmit}
          className="form_submit_btn"
        />

        <p className="form_end_message">
          Don't have an acount ?{" "}
          <span onClick={() => setStep("login")}>Log In</span>
        </p>
      </form>
    </div>
  );
};
