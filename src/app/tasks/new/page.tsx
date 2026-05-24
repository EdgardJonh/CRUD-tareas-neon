import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import TaskForm from "@/components/TaskForm"
import { createTask } from "@/actions/tasks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function NewTaskPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  return (
    <div className="mx-auto mt-8 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nueva tarea</CardTitle>
          <CardDescription>Crea una nueva tarea para tu lista</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm
            action={async (prev, formData) => {
              "use server"
              try {
                await createTask(formData)
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
