"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth"

export async function authenticate(_prev: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/tasks",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Credenciales inválidas" }
    }
    throw error
  }
}
