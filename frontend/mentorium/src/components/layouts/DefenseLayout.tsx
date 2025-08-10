// DefenseLayout.tsx
import { GraduationCap } from 'lucide-react';
import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DEFENSE_NAVBAR } from '@/utils/data';
import PageHeader from '@/pages/components/PageHeader';
import DefenseProvider, { DefenseContext } from '@/contexts/DefenseContext';

// This component consumes the DefenseContext and renders the UI
const DefenseContent: React.FC = () => {
  const { defense } = useContext(DefenseContext);

  return (

    
    <main className="flex flex-1 flex-col px-6 py-4 gap-4">
      {/* Project Header */}
      <PageHeader title={defense.defDetails.title} icon={GraduationCap} />

      {/* Project Tabs */}
      <div className="flex gap-10 border-b text-sm font-medium text-muted-foreground font-secondary">
        {DEFENSE_NAVBAR.map((item) => (
          <NavLink
            key={item.title}
            to={`/defense/${item.path}`}
            end={item.path === ''}
            className={({ isActive }) =>
              `pb-2 ${isActive ? 'border-b-3 border-primary' : ''}`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>

      {/* Main Content */}
      <div className="pt-4">
        <Outlet />
      </div>
    </main>
  );
};

// This component wraps the content with DefenseProvider so context is available
const DefenseLayout: React.FC = () => {
  return (
    <DefenseProvider>
      <DefenseContent />
    </DefenseProvider>
  );
};

export default DefenseLayout;
