import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedAdmin({ children }) {
  const user = useSelector((state) => state.Auth.loggedInUser);

  if (!user) return <Navigate to="/login" replace={true} />;
  if (user && user.role !== 'admin') return <Navigate to="/" replace={true} />;

  return <>{children}</>;
}

export default ProtectedAdmin;
