// src/components/tasks/Column.tsx
import { Droppable } from '@hello-pangea/dnd';
import type { TaskType } from '../../store/taskStore';
import TaskCard from './TaskCard';

type Props = {
  status: TaskType['status'];
  tasks: TaskType[];
};

const Column = ({ status, tasks }: Props) => {
  const statusConfig = {
    todo: {
      label: 'To Do',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100',
      borderColor: 'border-blue-300',
      headerColor: 'text-blue-800',
      iconBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      countBg: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    inprogress: {
      label: 'In Progress',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100',
      borderColor: 'border-amber-300',
      headerColor: 'text-amber-800',
      iconBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
      countBg: 'bg-gradient-to-r from-amber-500 to-orange-500'
    },
    done: {
      label: 'Done',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-gradient-to-br from-emerald-100 via-green-50 to-emerald-100',
      borderColor: 'border-emerald-300',
      headerColor: 'text-emerald-800',
      iconBg: 'bg-gradient-to-r from-emerald-500 to-green-500',
      countBg: 'bg-gradient-to-r from-emerald-500 to-green-500'
    }
  };

  const config = statusConfig[status];

  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${config.bgColor} ${config.borderColor} border-2 p-6 rounded-3xl shadow-xl min-h-[500px] transition-all duration-300 ${
            snapshot.isDraggingOver ? 'shadow-2xl scale-[1.02] border-blue-400 bg-gradient-to-br from-blue-100 via-slate-50 to-blue-100 transform -translate-y-1' : 'hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 ${config.iconBg} rounded-2xl shadow-lg backdrop-blur-sm`}>
                <div className="text-white">
                  {config.icon}
                </div>
              </div>
              <h2 className={`text-xl font-black ${config.headerColor}`}>
                {config.label}
              </h2>
            </div>
            <span className={`inline-flex items-center justify-center w-10 h-10 text-lg font-black text-white ${config.countBg} rounded-2xl shadow-lg`}>
              {tasks.length}
            </span>
          </div>
          
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-4 shadow-lg">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-gray-600 mb-2">No tasks yet</p>
                <p className="text-sm text-gray-500">Drag tasks here or add new ones</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;