import { NextResponse } from "next/server";

export function  middleware (req: { cookies: { jwtToken: any; }; headers: { jwtToken: any; }; }  ,  event: any ) {
   //way of getting the token totally depends on your preference
   let token = req.cookies.jwtToken || req.headers.jwtToken
   if (!token ) {
     return NextResponse.redirect('/login');
   }
   
    return NextResponse.next();
}