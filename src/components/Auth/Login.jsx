import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getLocalstorage,
    setLocalStorage,
} from "../../../utils/handleLocalstorage";

export const Login = ({ setStep }) => {
  let usersTypes = ["user", "admin"];
  let [currentUserType, setCurrentUserType] = useState("user");

  let [loginData, setloginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setloginData(() => {
      return {
        ...loginData,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setloginData({ ...loginData, type: currentUserType });
  }, [currentUserType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let AllusersandAdmins =
      currentUserType === "user"
        ? getLocalstorage("all-user")
        : currentUserType === "admin"
        ? getLocalstorage("all-admin")
        : [];

    let FoundedUser = AllusersandAdmins?.find(
      (data) =>
        data?.username == loginData?.username &&
        data?.password === loginData?.password
    );

    if (FoundedUser?.username) {
      setLocalStorage("LoggedInUser", FoundedUser);
      toast.loading("...Wait");
      toast.dismiss();
      toast.success(`Welcome Back ${FoundedUser?.username}`);
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      toast.error("Failed To Login , Wrong Credentials provided.!");
    }
  };

  return (
    <div className="form_container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form_heading">Login</p>
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
            placeholder="Username"
            required
          />
          <input
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <input type="submit" value="Log In" className="form_submit_btn" />

        <p className="form_end_message">
          Don't have an acount ?{" "}
          <span onClick={() => setStep("signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};
