import Router, { useRouter } from 'next/router';
import { app, database } from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import style from "../styles/bg.module.css";

const TestPage: NextPage = () => {
  const router = useRouter()
  // if (typeof window !== 'undefined') {
  //   router.push('/')
  // }

    const auth = getAuth(app);
  
    
  return (
    <div >
 1234
      </div>
    // </div>
  );
};
// TestPage.getInitialProps = ctx => {
//   // We check for ctx.res to make sure we're on the server.
//   if (ctx.res) {
 
    
//     ctx.res.writeHead(302, { Location: '/' });
//     ctx.res.end();
//   }
//   return { };
// }
export default TestPage;
