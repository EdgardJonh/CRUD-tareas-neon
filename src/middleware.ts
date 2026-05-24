import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/tasks")) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }
  return NextResponse.next()
})

export const config = {
  matcher: ["/tasks/:path*"],
}
