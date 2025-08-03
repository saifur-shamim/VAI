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
      <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingTask ? 'Edit' : 'Add'} Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as TaskType['priority'] })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {editingTask && (
            <button
              onClick={() => {
                deleteTask(form.id);
                closeModal();
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            >
              Delete
            </button>
          )}
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            {editingTask ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;