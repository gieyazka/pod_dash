import "../styles/globals.css";

import Router, {useRouter} from "next/router";
import { app, database } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import App from "next/app";
import type { AppProps } from "next/app";
import Link from "next/link";
import LoginPage from "./login";

// import  '../styles/bg.css'

export const ProtectRoute = ( {children}: any) => {
  
  const auth = getAuth(app);
  // const router = useRouter();
  
  if (auth.currentUser=== null) {
    // Make sure we're in the browser
      // router.push('/login')
    // return <LoginPage />
  }
  return  children;
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ProtectRoute>
      <Component {...pageProps} />
    // </ProtectRoute>
  );
}

export default MyApp;
