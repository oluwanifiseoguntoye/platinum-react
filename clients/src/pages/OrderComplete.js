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
        *To complete your purchase, please DM your Order ID to our Instagram Account. 
        <br></br>Your total cost will be calculated and you're expected to pay the total through 
        e-transfer in 24 hours or your order will be cancelled
      </p>
    </div>
  );
}

export default OrderComplete;