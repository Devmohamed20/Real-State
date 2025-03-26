export { default } from "next-auth/middleware";

export const config = {
    matcher: ['/properties/add', '/profile', '/properties/saved', "/messages"]
}


// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // If no token, return a JSON response with an error
//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
//   }

//   // If user is authenticated, continue request
//   return NextResponse.next();
// }