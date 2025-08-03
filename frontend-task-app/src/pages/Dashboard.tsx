// src/pages/Dashboard.tsx
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import { useTaskStore } from '../store/taskStore';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const Dashboard = () => {
  const { tasks } = useTaskStore();

  const allTasks = Object.values(tasks).flat();
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.status === 'done').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statusData = [
    { status: 'To Do', count: allTasks.filter((task) => task.status === 'todo').length },
    { status: 'In Progress', count: allTasks.filter((task) => task.status === 'inprogress').length },
    { status: 'Done', count: allTasks.filter((task) => task.status === 'done').length }
  ];

  const completedPerDay = Object.entries(tasks)
    .map(([date, tasks]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: tasks.filter((t) => t.status === 'done').length,
      total: tasks.length
    }))
    .slice(-7); // Last 7 days

  const priorityData = [
    { name: 'Low', value: allTasks.filter((t) => t.priority === 'low').length },
    { name: 'Medium', value: allTasks.filter((t) => t.priority === 'medium').length },
    { name: 'High', value: allTasks.filter((t) => t.priority === 'high').length }
  ].filter(item => item.value > 0);

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'In Progress',
      value: allTasks.filter(t => t.status === 'inprogress').length,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            📊 Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Track your productivity and task completion trends
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={`text-white ${stat.color.replace('bg-', 'text-')}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Status Chart */}
          <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Task Status Distribution</h2>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="status" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Completion Trend */}
          <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Weekly Completion Trend</h2>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={completedPerDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white shadow-lg p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Task Priority Distribution</h2>
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {priorityData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Quick Insights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-90">Most Productive Day</p>
              <p className="text-lg font-semibold">
                {completedPerDay.length > 0 
                  ? completedPerDay.reduce((a, b) => a.completed > b.completed ? a : b).date
                  : 'No data yet'}
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-90">Average Daily Tasks</p>
              <p className="text-lg font-semibold">
                {completedPerDay.length > 0 
                  ? Math.round(completedPerDay.reduce((sum, day) => sum + day.total, 0) / completedPerDay.length)
                  : 0}
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-90">Success Rate</p>
              <p className="text-lg font-semibold">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
