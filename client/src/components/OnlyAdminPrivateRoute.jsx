import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'; // Import Navigate here

function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />}
    </div>
  );
}

export default  OnlyAdminPrivateRoute;
