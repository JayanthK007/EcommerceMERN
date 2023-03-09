import Header from "./components/layout/Header/Header.js"
import Footer from './components/layout/Footer/Footer'
import Contact from "./components/layout/contact/Contact"
import About from "./components/layout/about/About"
import './App.css';
import WebFont from 'webfontloader';
import { useEffect,useState } from "react";
import { Route, Routes} from "react-router-dom"
import Home from './components/Home/Home.js'
import ProductDetails from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js"
import Search from "./components/Product/Search.js"
import LoginSignUp from "./components/User/LoginSignUp"
import UpdateProfile from "./components/User/UpdateProfile"
import store from "./store"
import { loadUser } from "./actions/userAction.js";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions.js";
import Profile from "./components/User/Profile"
import ProtectedRoute from "./components/Route/ProtectedRoute"
import UpdatePassword from "./components/User/UpdatePassword"
import ForgotPassword from "./components/User/ForgotPassword"
import ResetPassword from "./components/User/ResetPassword"
import Cart from "./components/Cart/Cart"
import Shipping from "./components/Cart/Shipping"
import ConfirmOrder from "./components/Cart/ConfirmOrder"
import Payment from "./components/Cart/Payment"
import OrderSuccess from "./components/Cart/OrderSuccess"
import MyOrders from "./components/Order/MyOrders"
import OrderDetails from "./components/Order/OrderDetails"
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct"
import UpdateProduct from "./components/admin/UpdateProduct"
import axios from "axios"

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderList from "./components/admin/OrderList.js";
import ProcessOrder from "./components/admin/ProcessOrder"
import UsersList from "./components/admin/UsersList.js";
import UpdateUser from "./components/admin/UpdateUser.js";
import ProductReview from "./components/admin/ProductReview.js";
import NotFound from "./components/layout/NotFound/NotFound"

function App() {
  

  const {isAuthenticated,user}=useSelector(state=>state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto','Droid Sans', 'Chilanka']
      }
    });

    store.dispatch(loadUser());
    getStripeApiKey();
   }, []);
  
   window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
  <>
   <Header />
   {isAuthenticated && <UserOptions user={user}/>}
   <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/product/:id' element={<ProductDetails/>} />
    <Route exact path='/products' element={<Products/>} />
    <Route  path='/products/:keyword' element={<Products/>} />
    <Route exact path='/search' element={<Search/>} />
    <Route exact path="/contact" element={<Contact/>} />
    <Route exact path="/about" element={<About/>} />
    <Route exact path='/account' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
    <Route exact path='/me/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
    <Route exact path='/password/update' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
    <Route exact path='/password/forgot' element={<ForgotPassword/>} />
    <Route exact path='/password/reset/:token' element={<ResetPassword/>} />
    <Route exact path='/login' element={<LoginSignUp/>} />
    <Route exact path='/cart' element={<Cart/>} />
    <Route exact path='/login/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
    <Route exact path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
    {stripeApiKey && <Route exact path='/process/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute>} />}
    <Route exact path='/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
    <Route exact path='/orders' element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />
    <Route exact path='/order/:id' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/products' element={<ProtectedRoute><ProductList/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/product' element={<ProtectedRoute><NewProduct/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/product/:id' element={<ProtectedRoute><UpdateProduct/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/orders' element={<ProtectedRoute><OrderList/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/order/:id' element={<ProtectedRoute><ProcessOrder/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/users' element={<ProtectedRoute><UsersList/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/user/:id' element={<ProtectedRoute><UpdateUser/></ProtectedRoute>} />
    <Route isAdmin={true} exact path='/admin/reviews' element={<ProtectedRoute><ProductReview/></ProtectedRoute>} />
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    
   <Footer />
   </>
   
  );
}

export default App;
