// src/pages/Dashboard.tsx
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useTaskStore } from '../store/taskStore';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#f97316', '#0ea5e9'];

const Dashboard = () => {
  const { tasks } = useTaskStore();

  const allTasks = Object.values(tasks).flat();

  const statusData = ['todo', 'inprogress', 'done'].map((status) => ({
    status,
    count: allTasks.filter((task) => task.status === status).length,
  }));

  const completedPerDay = Object.entries(tasks).map(([date, tasks]) => ({
    date,
    done: tasks.filter((t) => t.status === 'done').length,
  }));

  const priorities = ['low', 'medium', 'high'];
  const priorityData = priorities.map((priority) => ({
    name: priority,
    value: allTasks.filter((t) => t.priority === priority).length,
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks per Status</h2>
          <BarChart width={400} height={300} data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#0ea5e9" />
          </BarChart>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks Done Per Day</h2>
          <LineChart width={400} height={300} data={completedPerDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="done" stroke="#10b981" />
          </LineChart>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-xl col-span-full md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasks by Priority</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {priorityData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
