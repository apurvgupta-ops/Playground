import React, { useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase/firebase";
import { actionTypes } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const Login = () => {
  const [userInfo, setUserInfo] = useState();
  console.log("=============", userInfo);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{}, dispatch] = useStateValue();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        console.log("Login with Google");
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="border-2 border-black rounded-lg w-96 h-auto flex flex-col justify-start items-center">
        <h1 className="bg-blue-300 rounded-lg px-8 py-2 flex justify-start items-center m-2">
          Login
        </h1>
        <h1 className="mt-4 text-2xl text-teal-400">RealTime Code Sync</h1>
        <div className="bg-gradient-to-r to-indigo-100 via-purple-300 from-blue-500 p-2 px-10 mt-10  rounded-lg">
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
        {userInfo ? (
          <div className="flex flex-col mt-4 items-center justify-center">
            Welcome {userInfo?.user.displayName} <br />
            <span>loggin with : {userInfo?.user.email}</span>
            <h1 className="text-2xl flex items-center justify-center text-neutral-600 mt-5  mb-6">
              Enjoy the realTime coding
            </h1>
          </div>
        ) : (
          <h1 className="text-lg flex items-center justify-center text-neutral-600 mt-5 mb-6 ">
            "Enjoy realTime coding, but firstly do LOGIN"
          </h1>
        )}
      </div>
    </div>
  );
};

export default Login;
