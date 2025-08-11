import { ProjectContext } from '@/contexts/ProjectContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';


const TeamPage :React.FC= () => {
  useUserAuth();
  const { project } = useContext(ProjectContext);
  return (
    <div>
      {project?.is_final_year_project ? (
        project.project_group.members.map((member) => (
          <div key={member.user_id}>
            {member.firstname}
          </div>
        ))
      ) : null}
    </div>
  )
}

export default TeamPage