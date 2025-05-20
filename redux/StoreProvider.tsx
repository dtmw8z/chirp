"use client";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signInUser, signOutUser } from "./slices/userSlice";
import { CircularProgress } from "@mui/material";
import { getDoc, doc } from "firebase/firestore";

interface StoreProviderProps {
  children: React.ReactNode;
}

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        dispatch(
          signInUser({
            name: user.displayName,
            email: user.email,
            username: user.email!.split("@")[0],
            uid: user.uid,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(signOutUser());
      }
      setInitialized(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="h-screen flex items-center justify-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return <>{children}</>;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
