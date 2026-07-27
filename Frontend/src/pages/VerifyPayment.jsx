/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'

import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext"
// import { useScroll } from "framer-motion";
import {useEffect, useState } from "react";
import axios from "axios";

const VerifyPayment = () => {
  const {clearCart} = useCart();
  const {search} = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [statusMsg,setStatuMsg] = useState('VerifyPayment....')

  const token = localStorage.getItem('authToken');
  const authHeader = token ? {Authorization:`Bearer ${token}`} : null;
  
  useEffect(()=>{
    const params = new URLSearchParams(search);
    const success = params.get('success');
    const session_id = params.get('session_id');

    if(success !== 'true' || !session_id){
      if(success === 'false'){
        navigate('/checkout',{replace:true});
        return;
      }
      setStatusMsg("Unable to verify payment because the session information is missing.");
    }

    //Stripe success = true
    axios.get('http://localhost:4000/api/order/stripe',{
      params:{session_id},
      headers:authHeader
    })
    .then(()=>{
      clearCart();
      navigate('/myorder',{replace:true});
    }).catch((err)=>{
      console.log('confirmation error',err);
      setStatuMsg('There was an error');
      clearCart(false);
    })
   },[search,clearCart,navigate,authHeader]);
  return (
    <div></div>
  )
}

export default VerifyPayment