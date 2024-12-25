import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const signInWithEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signUpWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  //Observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (acc) => {
      setUser(acc);
      const user = { email: acc?.email };
      if (acc) {
        axios.post("http://localhost:5000/login", user, {
          withCredentials: true,
        });
      } else {
        axios.post(
          "http://localhost:5000/logout",
          {},
          {
            withCredentials: true,
          }
        );
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  //context values

  const values = {
    user,
    loading,
    setLoading,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signInWithGoogle,
    signOutUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
