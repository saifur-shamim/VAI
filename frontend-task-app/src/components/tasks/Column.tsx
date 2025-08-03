// src/components/tasks/Column.tsx
import { Droppable } from '@hello-pangea/dnd';
import type { TaskType } from '../../store/taskStore';
import TaskCard from './TaskCard';

type Props = {
  status: TaskType['status'];
  tasks: TaskType[];
};

const Column = ({ status, tasks }: Props) => {
  const label = status === 'inprogress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-200 p-6 rounded-xl shadow-lg border border-gray-300 min-h-[300px]"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{label}</h2>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;