"use client"

import { useEffect, useActionState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface TaskFormProps {
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<{ error?: string; success?: boolean } | undefined>
  initialData?: { title: string; description: string }
}

export default function TaskForm({ action, initialData }: TaskFormProps) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(action, undefined)

  useEffect(() => {
    if (state?.success) {
      toast.success("Tarea guardada con éxito")
      router.push("/tasks")
    }
  }, [state, router])

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          placeholder="Ingresa el título de la tarea"
          defaultValue={initialData?.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe la tarea (opcional)"
          rows={4}
          defaultValue={initialData?.description}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  )
}
