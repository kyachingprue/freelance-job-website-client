import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import AuthContext from "../context/AuthContext";
import auth from "../firebase/firebase.config";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // 🔴 cookie enable
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();


  const registerUser = async (email, password) => {
    setLoading(true);
     await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } finally {
      setLoading(false);
    }
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
    await api.post("/logout");
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };


  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("user data-->", currentUser);

      if (currentUser?.email) {
        await api.post("/jwt", { email: currentUser.email });
      } else {
        await api.post("/logout");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    googleLogin,
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
