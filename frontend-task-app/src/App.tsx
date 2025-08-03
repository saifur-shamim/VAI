import { Route, Routes, Navigate } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import Annotate from './pages/Annotate';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/annotate" element={<Annotate />} />
      </Routes>
    </div>
  );
}

export default App;