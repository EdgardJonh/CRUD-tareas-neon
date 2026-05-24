import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Task Manager</h1>
      <p className="max-w-md text-muted-foreground">
        Gestiona tus tareas de forma sencilla. Crea, edita, completa y elimina
        tareas al instante.
      </p>
      <Link href={session ? "/tasks" : "/login"}>
        <Button size="lg">{session ? "Ir a mis tareas" : "Comenzar"}</Button>
      </Link>
    </div>
  )
}
