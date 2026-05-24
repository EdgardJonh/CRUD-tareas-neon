"use client"

import { useState } from "react"
import TaskItem from "./TaskItem"
import type { Task } from "@/types/task"

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["all", "pending", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {f === "all" ? "Todas" : f === "pending" ? "Pendientes" : "Completadas"}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="py-8 text-center text-muted-foreground">
          {tasks.length === 0
            ? "No tienes tareas aún. Crea una para empezar."
            : "No hay tareas con este filtro."}
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
