import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import TaskList from "@/components/TaskList"
import { toggleTask, deleteTask } from "@/actions/tasks"

export default async function TasksPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Tareas</h1>
        <Link href="/tasks/new">
          <Button>Nueva tarea</Button>
        </Link>
      </div>

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}
