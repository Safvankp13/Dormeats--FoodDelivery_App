

import Register from "./pages/register/Register.jsx";
import HomePage from './pages/HomePage.jsx';
import {

  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Login from "./pages/login/Login.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Menu from "./pages/food Menu/Menu.jsx";
import Premium from "./pages/premium/Premium.jsx";
import Category from "./pages/category/Category.jsx";
import { useUserStore } from "./store/useUserStore.js";
import { useEffect } from "react";
import { useMembershipStore } from "./store/useMembershipStore.js";

function App() {
const{user,checkAuth}= useUserStore()
const{fetchMembership}= useMembershipStore()

useEffect(() => {
  checkAuth();
}, [checkAuth]);
useEffect(() => {
  if (user) {
    fetchMembership(); 
  }
}, [user,fetchMembership]);

const Layout=()=>{

  return(
    <>
    
    <Header />
    <Outlet />
    
    </>
  ) 
}
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Layout />}>
      <Route index element={<HomePage/>}/>
      <Route path="category/:categoryName" element={<Category/>} />
      <Route path="dashboard" element={<Dashboard/>} />
      <Route path="cart" element={<Cart/>} />
      <Route path="menu" element={<Menu/>} />
      <Route path="premium" element={<Premium/>} />
      </Route>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={<Register/>} />
      
      
      </>
    )
  );

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App
