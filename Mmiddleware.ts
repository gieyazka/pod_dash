import { NextRequest, NextResponse } from "next/server";

import { Router } from "next/router";

const { app, database } = require("./firebaseConfig");

const { getAuth } = require("firebase/auth");

export default async function middleware(
  req: { url: any; nextUrl: { pathname: any; clone: any } },
  ev: any
) {
  const auth = await getAuth(app);
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
  console.log( auth);
  
  if(!auth.currentUser && pathname === "/"){
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (!auth.currentUser && pathname === "/test") {
    

    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
// export const config = {
//   matcher: '/about/:path*',
// }
