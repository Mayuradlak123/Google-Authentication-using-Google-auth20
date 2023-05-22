import React from "react";
import swal from "sweetalert";
import { GOOGLE_CLIENT_ID } from "../API";
import axios from "axios";

function LoginwithGoogle() {
  const loginwithGoogle = async () => {
    const URL = "http://localhost:3000/auth/google";
    await axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("failed to fetch data");
      });
  };
  const successCallback = () => {
    console.log(res);
    swal({
      text: "Login Successfully with Google",
      icon: "success",
    });
  };
  const failedCallback = (err) => {
    swal({
      text: "Authentication Failed",
      icon: "warning",
    });
  };
  return (
    <div>
      <button onClick={loginwithGoogle}>Login with Google</button>
    </div>
  );
}

export default LoginwithGoogle;
