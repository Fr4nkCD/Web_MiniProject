import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/loginUser";

export async function middleware(request: NextRequest) {
    console.log("Middleware invoked")
    const res = await updateSession(request)
    if (res) {
        return null
    } else
        return NextResponse.redirect(new URL("/login", request.url))

    // === Short coing style
    // return (await updateSession(request)) || NextResponse.redirect(new URL("/blog/login", request.url));
}

// if path matches with matcher config, then it invoke middleware(request)
export const config = {
    matcher: ['/account/:path*', '/forum/newPost', '/forum/post/edit', '/forum/post/editReply'],
}

// export const config = {
//   matcher: ['/blog/new/:path*', '/blog/:path*'],
// }