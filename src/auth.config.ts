import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub,
    Credentials({ credentials: {} }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnTasks = nextUrl.pathname.startsWith("/tasks")
      if (isOnTasks && !isLoggedIn) return false
      return true
    },
  },
}
