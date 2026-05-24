import Link from "next/link"
import { auth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="border-b bg-white dark:bg-black">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/tasks" className="text-lg font-semibold">
          Task Manager
        </Link>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {session.user.name || session.user.email}
              </span>
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  Cerrar sesión
                </Button>
              </form>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm">
                Iniciar sesión
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
