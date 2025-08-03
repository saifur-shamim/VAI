// src/store/taskStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskType = {
  id: string;
  title: string;
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  dueDate: string;
};

type TaskState = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  tasks: Record<string, TaskType[]>;
  addTask: (task: TaskType) => void;
  updateTask: (task: TaskType) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, toStatus: TaskType['status']) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      selectedDate: new Date().toISOString().split('T')[0],
      setSelectedDate: (date) => set({ selectedDate: date }),
      tasks: {},
      addTask: (task) => {
        const date = get().selectedDate;
        const current = get().tasks[date] || [];
        set({ tasks: { ...get().tasks, [date]: [...current, task] } });
      },
      updateTask: (updated) => {
        const date = get().selectedDate;
        const filtered = (get().tasks[date] || []).map((t) =>
          t.id === updated.id ? updated : t
        );
        set({ tasks: { ...get().tasks, [date]: filtered } });
      },
      deleteTask: (id) => {
        const date = get().selectedDate;
        const filtered = (get().tasks[date] || []).filter((t) => t.id !== id);
        set({ tasks: { ...get().tasks, [date]: filtered } });
      },
      moveTask: (id, toStatus) => {
        const date = get().selectedDate;
        const updated = (get().tasks[date] || []).map((t) =>
          t.id === id ? { ...t, status: toStatus } : t
        );
        set({ tasks: { ...get().tasks, [date]: updated } });
      },
    }),
    { name: 'task-storage' }
  )
);
