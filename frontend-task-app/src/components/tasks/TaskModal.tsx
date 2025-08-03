// src/components/tasks/TaskModal.tsx
import { useModalStore } from '../../store/modalStore';
import { useTaskStore } from '../../store/taskStore';
import type { TaskType } from '../../store/taskStore';
import { useState, useEffect } from 'react';

const TaskModal = () => {
  const { isOpen, editingTask, closeModal } = useModalStore();
  const { selectedDate, addTask, updateTask, deleteTask } = useTaskStore();

  const [form, setForm] = useState<TaskType>({
    id: '',
    title: '',
    status: 'todo',
    priority: 'medium',
    tags: [],
    dueDate: selectedDate,
  });

  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    } else {
      setForm({
        id: crypto.randomUUID(),
        title: '',
        status: 'todo',
        priority: 'medium',
        tags: [],
        dueDate: selectedDate,
      });
    }
  }, [editingTask, selectedDate]);

  const handleSubmit = () => {
    if (editingTask) {
      updateTask(form);
    } else {
      addTask(form);
    }
    closeModal();
  };

  if (!isOpen) return null;

return (
 <div
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  }}
>
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
      <h2 className="text-xl font-bold mb-4">{editingTask ? 'Edit' : 'Add'} Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-2 mb-2 rounded"
      />

      <select
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value as TaskType['priority'] })}
        className="w-full border p-2 mb-2 rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={form.tags.join(',')}
        onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map((t) => t.trim()) })}
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        className="w-full border p-2 mb-4 rounded"
      />

      <div className="flex justify-between items-center">
        {editingTask && (
          <button
            onClick={() => {
              deleteTask(form.id);
              closeModal();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        )}
        <button
          onClick={closeModal}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTask ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  </div>
);

};

export default TaskModal;
