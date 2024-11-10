import React from 'react';
import { Outlet } from 'react-router-dom';
import RedirectWithReload from '../redicetdWithReload/RedirectWithReload';

function ProtectedRoute({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <RedirectWithReload to="/login?source=main" />;
}

export default ProtectedRoute;
