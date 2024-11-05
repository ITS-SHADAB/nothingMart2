import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUser } from '../features/Auth/AuthSlice';
import LoadingIndicator from '../common/LoadingIndictor';
import Header from '../component/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';

function Layout() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.Auth.loading);

  useEffect(() => {
    dispatch(isUser());
  }, [dispatch]);

  if (loading) {
    return <LoadingIndicator />; // Render a loading indicator while checking auth status
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
