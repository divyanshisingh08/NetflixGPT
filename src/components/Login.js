import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [Errormessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //first validate the data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    //if there is a message ( i.e msg is not null) that means it is not valid (if message =null then no error)
    //we want to return from here if error occurs
    if (message) return;

    //Sign Up logic

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        // name.current.value,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoUrl: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">

        <img
        
          src={BACKGROUND_URL}
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-2/6 absolute p-12 bg-black my-28 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-85"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold py-2 text-lg">{Errormessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="font-bold text-l cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netfilx? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;



