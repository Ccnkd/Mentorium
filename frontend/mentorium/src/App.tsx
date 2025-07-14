import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ManageTasks from './pages/Supervisors/ManageTasks';
import ManageProjects from './pages/Supervisors/ManageProjects';
import EditTask from './pages/Shared/EditTask';
import CreateTask from './pages/Shared/CreateTask';
import CreateProject from './pages/Shared/CreateProject';
import MyProjects from './pages/Shared/MyProjects';
import Trash from './pages/Shared/Trash';
import CreatePanel from './pages/Coordinator/CreatePanel';
import DefenseDashboard from './pages/Coordinator/DefenseDashboard';
import SupervisorManagement from './pages/Coordinator/SupervisorManagement';
import CreateSchedule from './pages/Coordinator/CreateSchedule';
import MyTasks from './pages/Shared/MyTasks';
import StudentDashboard from './pages/Students/StudentDashboard';
import CreateBudget from './pages/Students/CreateBudget';
import PrivateRoute from './routes/PrivateRoute';
import StudentManagement from './pages/Supervisors/StudentManagement';
import UserProvider, { UserContext } from './contexts/UserContext';
import SupervisorDashboard from './pages/Supervisors/SupervisorDashboard';
import StudentProjectDashboard from './pages/Students/StudentProjectDashboard';
import ProjectLayout from './components/layouts/ProjectLayout';
import TasksPage from './pages/Projects/[projectId]/TasksPage';
import BudgetPage from './pages/Projects/[projectId]/BudgetPage';
import Overview from './pages/Projects/[projectId]/Overview';
import GlobalLayout from './components/layouts/GlobalLayout';
import TeamPage from './pages/Projects/[projectId]/TeamPage';
import AnnouncementPage from './pages/Projects/[projectId]/AnnouncementPage';


const App: React.FC = () => {
  return (
    <Router>
    <UserProvider>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<GlobalLayout />}>
            
            {/* Root Redirect */}
            <Route path="/" element={<Root />} />

            {/* Dashboard Routes (within GlobalLayout) */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
            <Route path="/coordinator/defenseDashboard" element={<DefenseDashboard />} />

            {/* Shared Routes */}
            <Route path="/createtask" element={<CreateTask />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/edittask" element={<EditTask />} />
            <Route path="/mytasks" element={<MyTasks />} />
            <Route path="/myprojects" element={<MyProjects />} />
            <Route path="/trash" element={<Trash />} />

            {/* Student Routes */}
            <Route path="/student/projectdashboard" element={<StudentProjectDashboard />} />
            <Route path="/student/createBudget" element={<CreateBudget />} />

            {/* Supervisor Routes */}
            <Route element={<PrivateRoute allowedRoles={['supervisor']} />}>
              <Route path="/supervisor/studentManagement" element={<StudentManagement />} />
              <Route path="/supervisor/tasks" element={<ManageTasks />} />
              <Route path="/supervisor/projects" element={<ManageProjects />} />
            </Route>

            {/* Coordinator Routes */}
            <Route element={<PrivateRoute allowedRoles={['coordinator']} />}>
              <Route path="/coordinator/supervisorManagement" element={<SupervisorManagement />} />
              <Route path="/coordinator/createPanel" element={<CreatePanel />} />
              <Route path="/coordinator/createSchedule" element={<CreateSchedule />} />
            </Route>

            {/* Project Pages under ProjectLayout */}
            <Route path="/project/:projectId" element={<ProjectLayout />}>
              <Route index element={<Overview />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="budget" element={<BudgetPage />} />
              {/* other subpages */}
            </Route>


          </Route>
        </Route>

      </Routes>
    </UserProvider>
  </Router>
  );
};

export default App;
const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;
  if (!user) return <Navigate to="/login" />;

  if (user.role === "supervisor") {
    return <Navigate to="/supervisor/dashboard" />;
  } else if (user.role === "coordinator") {
    return <Navigate to="/coordinator/dashboard" />;
  } else {
    return <Navigate to="/student/dashboard" />;
  }
};