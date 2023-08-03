import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/orderstyles.css"

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const orderData = {
      productId: id,
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      aptNumber: formData.get('aptNumber'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode'),
      province: formData.get('province'),
    };

    try {
      const response = await fetch('http://localhost:3001/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        const orderId = data.orderId;
        navigate(`/product/${id}/order/complete?orderId=${orderId}`);
      } else {
        alert('Error creating order. Please try again.');
        console.error('Error creating order:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error creating order. Please try again.');
    }
  };

  return (
    <div>
        <div className="formContainer" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
            <form onSubmit={handleSubmit}>
                <label className="formLabel" htmlFor="firstName">First Name:</label>
                <input className="formInput" type="text" id="firstName" name="firstName" required />

                <label className="formLabel" htmlFor="lastName">Last Name:</label>
                <input className="formInput" type="text" id="lastName" name="lastName" required />

                <label className="formLabel" htmlFor="address">Address:</label>
                <input className="formInput" type="text" id="address" name="address" required />

                <label className="formLabel" htmlFor="aptNumber">Apt Number (Not Required):</label>
                <input className="formInput" type="text" id="aptNumber" name="aptNumber" />

                <label className="formLabel" htmlFor="city">City:</label>
                <input className="formInput" type="text" id="city" name="city" required />

                <label className="formLabel" htmlFor="postalCode">Postal Code:</label>
                <input className="formInput" type="text" id="postalCode" name="postalCode" required />

                <label className="formLabel" htmlFor="province">Province:</label>
                <input className="formInput" type="text" id="province" name="province" required />

                <button className="formButton" type="submit" style={{alignItems: 'center' }}>Submit Order</button>

            </form>
        </div>
    </div>
  );
}

export default Order;