import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { Progress } from "@/components/ui/progress";
import { FolderClosed } from 'lucide-react';
import {NavLink, Outlet, useParams } from 'react-router-dom';
import {
  STUDENT_PROJECT_NAVBAR,
  SUPERVISOR_PROJECT_NAVBAR,
} from "@/utils/data";
import PageHeader from '@/pages/components/PageHeader';
import { ProjectContext, ProjectProvider } from '@/contexts/ProjectContext';



const ProjectContent: React.FC = ()=> {
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  const { project_id } = useParams();
  const navItems =
    user?.role === "supervisor"
      ? SUPERVISOR_PROJECT_NAVBAR
      : STUDENT_PROJECT_NAVBAR;

  return (     
        <main className="flex flex-1 flex-col px-6 py-4 gap-4">
          {/* Project Header */}
          <PageHeader title={project?.title} icon={FolderClosed} />
          {/* Project Tabs */}
          <div className="flex gap-10 border-b text-sm font-medium text-muted-foreground font-secondary">
            {navItems.map((item) => (
              <NavLink
                key={item.title}
                to={`/project/${project_id}/${item.path}`}
                end={item.path ===""}
                className={({ isActive }) =>
                  `pb-2 ${isActive ? "border-b-3 border-primary" : ""}`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Main Content */}
          <div className="pt-4">
            <Outlet/>
          </div>
        </main>
  );
}

const ProjectLayout: React.FC = () => {
  return (
    <ProjectProvider>
      <ProjectContent />
    </ProjectProvider>
  );
};

export default ProjectLayout