import { redirect, notFound } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import TaskForm from "@/components/TaskForm"
import { updateTask } from "@/actions/tasks"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { id } = await params

  const task = await prisma.task.findUnique({ where: { id } })
  if (!task || task.userId !== session.user.id) notFound()

  return (
    <div className="mx-auto mt-8 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Editar tarea</CardTitle>
          <CardDescription>Modifica los detalles de la tarea</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm
            initialData={{ title: task.title, description: task.description }}
            action={async (prev, formData) => {
              "use server"
              try {
                await updateTask(id, formData)
                return { success: true }
              } catch (e) {
                return { error: (e as Error).message }
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
