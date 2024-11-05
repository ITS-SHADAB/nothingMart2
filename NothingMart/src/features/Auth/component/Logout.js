import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../AuthSlice';
import { Navigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.loggedInUser);
  useEffect(() => {
    dispatch(signOut());
  }, []);
  return <>{!user && <Navigate to="/" replace={true} />}</>;
}

export default Logout;
