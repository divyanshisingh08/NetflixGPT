import React from "react";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import {changeLanguage} from "../utils/configSlice";
import {showGptSearch} from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  //beacause we want to call it once as it is kind of event listener so useEffect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoUrl: photoURL,
          })
        );
        // after sign in , take user to browse page by using navigate {error beacusxe we are using navigate outside router provider therefore for now i will do navigate in login }
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unmounting -unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange=(e)=> {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2 justify-between">

        { showGptSearch && (<select
            className="bg-gray-900 text-white py-2 px-4 mx-4 mb-4 "
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        )}
          <button
            className="py-2 px-4 mx-4 mb-4 bg-red-700 rounded-lg text-white "
            onClick={handleGptSearchClick}
          >
           {showGptSearch ?"Homepage": "GPT Search"}
          </button>
          <img
            className="w-12 h-10 md:block"
            // src=""
            src={USER_AVATAR}
            alt="user-icon"
          />
          <button
            className="font-bold text-white px-2 pb-2"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
