// src/components/DateSelector.tsx
import { useTaskStore } from '../store/taskStore';

const DateSelector = () => {
  const selectedDate = useTaskStore((s) => s.selectedDate);
  const setSelectedDate = useTaskStore((s) => s.setSelectedDate);

  return (
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="border-0 p-0 bg-transparent focus:ring-0 focus:outline-none font-bold text-lg text-gray-700 cursor-pointer hover:text-purple-600 transition-colors"
    />
  );
};

export default DateSelector;