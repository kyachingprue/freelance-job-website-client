import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import AuthContext from "../context/AuthContext";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";


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
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Optional strict check
    if (!result.user.emailVerified) {
      await signOut(auth);
      setLoading(false);
      toast.error("Please verify your email before login.");
    }

    setLoading(false);
    return result;
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

  const resendVerificationEmail = () => {
    if (auth.currentUser) {
      return sendEmailVerification(auth.currentUser);
    }
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
    resendVerificationEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
