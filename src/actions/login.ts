"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth"

export async function authenticate(_prev: unknown, formData: FormData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    })

    if (result?.error) return { error: "Credenciales inválidas" }
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Credenciales inválidas" }
    }
    throw error
  }
}
