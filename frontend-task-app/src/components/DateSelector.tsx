// src/components/DateSelector.tsx
import { useTaskStore } from '../store/taskStore';

const DateSelector = () => {
  const selectedDate = useTaskStore((s) => s.selectedDate);
  const setSelectedDate = useTaskStore((s) => s.setSelectedDate);

  return (
    <div className="w-full max-w-xs">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />
    </div>
  );
};

export default DateSelector;