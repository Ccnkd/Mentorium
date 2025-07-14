import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '@/contexts/UserContext';

interface PrivateRouteProps {
  allowedRoles?: string[]; // optional: allow any logged-in user if not passed
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  // Wait for user loading
  if (loading) return null; // or a loading spinner

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // optionally create this page
  }

  // Everything okay
  return <Outlet />;
};

export default PrivateRoute;
