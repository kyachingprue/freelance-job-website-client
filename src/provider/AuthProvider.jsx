import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import AuthContext from "../context/AuthContext";
import auth from "../firebase/firebase.config";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const registerUser = async (email, password) => {
    setLoading(true);
     await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  };

  const profileUpdate = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  }
 
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };


  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("user data-->", currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    profileUpdate,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
