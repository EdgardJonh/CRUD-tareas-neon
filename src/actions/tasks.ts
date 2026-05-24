"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function createTask(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("No autorizado")

  const title = formData.get("title") as string
  const description = formData.get("description") as string

  if (!title || title.trim().length === 0) throw new Error("El título es requerido")

  await prisma.task.create({
    data: {
      title: title.trim(),
      description: description?.trim() || "",
      userId: session.user.id,
    },
  })

  revalidatePath("/tasks")
}

export async function updateTask(taskId: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("No autorizado")

  const task = await prisma.task.findUnique({ where: { id: taskId } })
  if (!task || task.userId !== session.user.id) throw new Error("No autorizado")

  const title = formData.get("title") as string
  const description = formData.get("description") as string

  if (!title || title.trim().length === 0) throw new Error("El título es requerido")

  await prisma.task.update({
    where: { id: taskId },
    data: {
      title: title.trim(),
      description: description?.trim() || "",
    },
  })

  revalidatePath("/tasks")
}

export async function toggleTask(taskId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("No autorizado")

  const task = await prisma.task.findUnique({ where: { id: taskId } })
  if (!task || task.userId !== session.user.id) throw new Error("No autorizado")

  await prisma.task.update({
    where: { id: taskId },
    data: { completed: !task.completed },
  })

  revalidatePath("/tasks")
}

export async function deleteTask(taskId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("No autorizado")

  const task = await prisma.task.findUnique({ where: { id: taskId } })
  if (!task || task.userId !== session.user.id) throw new Error("No autorizado")

  await prisma.task.delete({ where: { id: taskId } })

  revalidatePath("/tasks")
}
