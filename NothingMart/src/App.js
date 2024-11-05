import React, { useEffect } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Shopitem from './features/Shop/component/Shopitem';
import Body from './component/Body';
import Detail from './pages/Detail';

import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Contact from './pages/Contact';
import Authentication from './features/Auth/component/Authentication';
import SignUp from './features/Auth/component/SignUp';
import Protected from './features/Auth/component/Protected';
import Logout from './features/Auth/component/Logout';
import Order from './pages/Order';
import MyProfile from './pages/MyProfile';
import Admin from './pages/Admin';
import ProtectedAdmin from './features/Auth/component/AdminProtected';
import AdminProductDetail from './features/Admin/AdminProductDetail';
import UpdateProductForm from './features/Admin/UpdateProductForm';
import AddProductForm from './features/Admin/AddProductForm';
import AdminOrderDetail from './features/Admin/AdminOrderDetail';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/admin-product',
        element: (
          <ProtectedAdmin>
            <Admin />
          </ProtectedAdmin>
        ),
      },
      {
        path: '/shop-admin-detail/:id',
        element: <AdminProductDetail />,
      },
      {
        path: '/admin/edit-Product/:id',
        element: <UpdateProductForm />,
      },
      {
        path: '/admin/add-Product',
        element: <AddProductForm />,
      },
      {
        path: '/admin-order',
        element: <AdminOrderDetail />,
      },
      {
        path: '/shop',
        element: <Shopitem />,
      },
      {
        path: '/cart',
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: '/checkout',
        element: (
          <Protected>
            <CheckOut />
          </Protected>
        ),
      },
      {
        path: '/order',
        element: (
          <Protected>
            <Order />
          </Protected>
        ),
      },
      {
        path: '/profile',
        element: (
          <Protected>
            <MyProfile />
          </Protected>
        ),
      },
      {
        path: '/contact',
        element: (
          <Protected>
            <Contact />
          </Protected>
        ),
      },
    ],
  },
  {
    path: '/shop-detail/:id',
    element: <Detail />,
  },

  {
    path: '/login',
    element: <Authentication />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },

  {
    path: '*',
    element: <div>404 Page Not Found</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
