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

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer border border-gray-100"
          onClick={() => openModal(task)}
        >
          <p className="text-lg font-medium text-gray-900">{task.title}</p>
          <div className="flex justify-between items-center mt-2">
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-700'
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">{task.dueDate}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;