// src/components/tasks/Board.tsx
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import { useTaskStore } from '../../store/taskStore';
import type { TaskType } from '../../store/taskStore';

const statuses: TaskType['status'][] = ['todo', 'inprogress', 'done'];

const Board = () => {
  const { selectedDate, tasks, moveTask } = useTaskStore();
  const dateTasks = tasks[selectedDate] || [];

  const onDragEnd = (result: {
    draggableId: string;
    destination: { droppableId: string } | null;
  }) => {
    if (!result.destination) return;
    moveTask(result.draggableId, result.destination.droppableId as TaskType['status']);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={dateTasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;