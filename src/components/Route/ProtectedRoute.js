import { useEffect } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate=useNavigate();

  useEffect(()=>{
    if (isAuthenticated === false) {
      navigate("/login");
     }
  
   if (isAdmin === true && user.role !== "admin") {
    navigate("/login");
   }
  },[navigate,isAuthenticated,isAdmin,user])



  return (
      loading === false && children
      );
};

export default ProtectedRoute;