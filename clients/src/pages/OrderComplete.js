import React from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/ordercomplete.css"

function OrderComplete() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h2>Order placed!</h2>
      <h1 className="orderID">Order ID: {orderId}</h1>
      <p className="closingInfo">
        *To complete your purchase, please DM your Order ID to our Instagram Account
      </p>
    </div>
  );
}

export default OrderComplete;