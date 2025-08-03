// src/pages/Tasks.tsx
import React from 'react';
import { useTaskStore } from '../store/taskStore';
import type { TaskType } from '../store/taskStore';
import DateSelector from '../components/DateSelector';
import Board from '../components/tasks/Board';
import { useModalStore } from '../store/modalStore';
import TaskModal from '../components/tasks/TaskModal';

const Tasks = () => {
  const isOpen = useModalStore((s) => s.isOpen);
  console.log('Modal open?', isOpen); 
  const selectedDate = useTaskStore((s) => s.selectedDate);
  const openModal = useModalStore((s) => s.openModal);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Tasks for {selectedDate}</h1>
        <div className="flex justify-between items-center mb-8">
          <DateSelector />
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            </svg>
            Add Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Board />
        </div>
        <TaskModal />
      </div>
    </div>
  );
};

export default Tasks;