import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  icon: React.ElementType;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, icon:Icon }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const refreshPage = () => {
  navigate(location.pathname, { replace: true });
  };

  return (
        <div className="bg-white sticky top-10 z-50 py-3 flex items-center gap-3">
        <div onClick={refreshPage} className="hover:cursor-pointer w-10 h-10 bg-muted rounded-md flex items-center justify-center">
            <Icon className="text-muted-foreground size-5" />
        </div>
        <h1 className="text-4xl text-grey">{title}</h1>
        </div>
  );
};

export default PageHeader;
