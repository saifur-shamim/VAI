// src/components/tasks/TaskCard.tsx
import { Draggable } from '@hello-pangea/dnd';
import type { TaskType } from '../../store/taskStore';
import { useModalStore } from '../../store/modalStore';

type Props = {
  task: TaskType;
  index: number;
};

const TaskCard = ({ task, index }: Props) => {
  const { openModal } = useModalStore();

  const priorityConfig = {
    high: {
      color: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300',
      dot: 'bg-gradient-to-r from-red-500 to-pink-500',
      glow: 'shadow-red-200',
      cardBg: 'from-red-50 to-pink-50'
    },
    medium: {
      color: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-300',
      dot: 'bg-gradient-to-r from-amber-500 to-orange-500',
      glow: 'shadow-amber-200',
      cardBg: 'from-amber-50 to-orange-50'
    },
    low: {
      color: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-300',
      dot: 'bg-gradient-to-r from-emerald-500 to-green-500',
      glow: 'shadow-emerald-200',
      cardBg: 'from-emerald-50 to-green-50'
    }
  };

  const priority = priorityConfig[task.priority];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    if (diffDays > 1) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-gradient-to-br from-white via-white to-gray-50 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 ${
            snapshot.isDragging ? 'shadow-2xl rotate-2 scale-110 bg-gradient-to-br from-blue-100 via-slate-50 to-blue-100 border-blue-300' : 'hover:scale-[1.02] hover:-translate-y-1'
          } ${priority.glow} hover:${priority.glow}`}
          onClick={() => openModal(task)}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors flex-1 mr-3 leading-tight">
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${priority.dot} shadow-lg`}></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold border-2 ${priority.color} shadow-lg`}>
              {task.priority.toUpperCase()}
            </span>
            <span className="text-sm font-bold text-blue-700 bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-2 rounded-xl border border-blue-200 shadow-sm">
              {formatDate(task.dueDate)}
            </span>
          </div>
          
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {task.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 shadow-sm"
                >
                  #{tag}
                </span>
              ))}
              {task.tags.length > 2 && (
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 shadow-sm border border-gray-300">
                  +{task.tags.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;