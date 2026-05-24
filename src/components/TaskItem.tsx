"use client"

import { useTransition } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Task } from "@/types/task"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [togglePending, startToggle] = useTransition()
  const [deletePending, startDelete] = useTransition()

  function handleToggle() {
    startToggle(async () => {
      try {
        await onToggle(task.id)
      } catch {
        toast.error("No se pudo actualizar la tarea")
      }
    })
  }

  function handleDelete() {
    startDelete(async () => {
      try {
        await onDelete(task.id)
      } catch {
        toast.error("No se pudo eliminar la tarea")
      }
    })
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border p-4">
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleToggle}
        disabled={togglePending || deletePending}
        className="mt-1"
      />

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3
            className={`font-medium ${
              task.completed ? "text-muted-foreground line-through" : ""
            }`}
          >
            {task.title}
          </h3>
          <span className="text-xs text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        {task.description && (
          <p
            className={`text-sm text-muted-foreground ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.description}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <Link href={`/tasks/${task.id}/edit`}>
            <Button variant="outline" size="sm" type="button">
              Editar
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger render={<Button variant="destructive" size="sm" />}>
              Eliminar
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Eliminar tarea</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro de eliminar &ldquo;{task.title}&rdquo;? Esta
                  acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancelar
                </DialogClose>
                <Button
                  variant="destructive"
                  disabled={deletePending || togglePending}
                  onClick={handleDelete}
                >
                  {deletePending ? "Eliminando..." : "Eliminar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
