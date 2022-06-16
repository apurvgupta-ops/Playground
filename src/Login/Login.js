import React from "react";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase/firebase";
const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    const data = await signInWithPopup(auth, provider);
    console.log("login with google ", data);
  };

  return (
    <div>
      <h1>Sign in with Google</h1>
      <button onClick={signInWithGoogle}>Login</button>
    </div>
  );
};

export default Login;
