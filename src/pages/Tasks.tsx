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
  const tasks = useTaskStore((s) => s.tasks);
  const openModal = useModalStore((s) => s.openModal);

  const dateTasks = tasks[selectedDate] || [];
  const todoCount = dateTasks.filter(t => t.status === 'todo').length;
  const inProgressCount = dateTasks.filter(t => t.status === 'inprogress').length;
  const doneCount = dateTasks.filter(t => t.status === 'done').length;
  const totalTasks = dateTasks.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section with Centered Date and Add Button */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              Tasks Overview
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-medium">
              {formatDate(selectedDate)}
            </p>
            
            {/* Centered Date Selector and Add Button */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="relative">
                <div className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <DateSelector />
                </div>
              </div>
              
              <button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center font-bold text-lg transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                Add New Task
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 overflow-hidden">
          {/* Total Tasks Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 shadow-xl border border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-blue-100 uppercase tracking-wider">Total Tasks</p>
                <p className="text-4xl font-black text-white mt-2">{totalTasks}</p>
                <p className="text-xs text-blue-200 mt-1">All tasks for today</p>
              </div>
              <div className="p-4 bg-white bg-opacity-20 rounded-2xl shadow-lg backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* To Do Card */}
          <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-3xl p-6 shadow-xl border border-slate-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-200 uppercase tracking-wider">To Do</p>
                <p className="text-4xl font-black text-white mt-2">{todoCount}</p>
                <p className="text-xs text-slate-300 mt-1">Pending tasks</p>
              </div>
              <div className="p-4 bg-white bg-opacity-20 rounded-2xl shadow-lg backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* In Progress Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-xl border border-amber-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-amber-100 uppercase tracking-wider">In Progress</p>
                <p className="text-4xl font-black text-white mt-2">{inProgressCount}</p>
                <p className="text-xs text-amber-200 mt-1">Active tasks</p>
              </div>
              <div className="p-4 bg-white bg-opacity-20 rounded-2xl shadow-lg backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-6 shadow-xl border border-emerald-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-emerald-100 uppercase tracking-wider">Completed</p>
                <p className="text-4xl font-black text-white mt-2">{doneCount}</p>
                <p className="text-xs text-emerald-200 mt-1">Finished tasks</p>
              </div>
              <div className="p-4 bg-white bg-opacity-20 rounded-2xl shadow-lg backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <div className="bg-gradient-to-r from-white via-slate-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-slate-200 mb-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Daily Progress</h3>
              <span className="text-lg font-black text-slate-700 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full shadow-lg border border-blue-200">
                {Math.round((doneCount / totalTasks) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 h-6 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                style={{ width: `${(doneCount / totalTasks) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mt-3 font-semibold">
              <span>{doneCount} completed</span>
              <span>{totalTasks - doneCount} remaining</span>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
          <Board />
        </div>

        <TaskModal />
      </div>
    </div>
  );
};

export default Tasks;