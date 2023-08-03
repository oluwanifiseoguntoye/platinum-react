import React from 'react'
import "../styles/admin.css"
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Admin() {
  const [listOfOrders, setListOfOrders] = useState([]);
  const navigate = useNavigate(); 
  const token = localStorage.getItem('adminToken');
  const tokenExpirationTime = Date.now() + 60 * 60 * 1000;

  useEffect(() => {

    if (!token || Date.now() > tokenExpirationTime) {
      navigate('/admin/login');
    } else {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
  }, [navigate, token, tokenExpirationTime]);



  useEffect(() => {
    axios.get("http://localhost:3001/getOrders").then((response) => {
      setListOfOrders(response.data);
    });
  }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
          await axios.delete(`http://localhost:3001/deleteOrder/${orderId}`);
    
          setListOfOrders((prevOrders) =>
            prevOrders.filter((order) => order.orderId !== orderId)
          );
        } catch (error) {
          console.error('Error deleting order:', error);
          console.log('Error deleting order:', error);
        }
      };
    
  
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h1 style={{ color: '#ECDC84' }} className="pageTitle">Admin</h1>
        </Link>
        <div className="orderDisplay">
          <table>
            <thead>
              <tr className="rowLabel">
                <th></th>
                <th>Order Id</th>
                <th>Product Id</th>
                <th>First Name</th>
                <th>Second Name</th>
                <th>Address</th>
                <th>Apt Number</th>
                <th>City</th>
                <th>Postal Code</th>
                <th>Province</th>         
              </tr>
            </thead>
            <tbody>
              {listOfOrders.map((order) => (
                <tr key={order.orderId} className="columnInfo">
                  <td>
                  <button className="orderDelete" onClick={() => handleDeleteOrder(order.orderId)}>
                    Delete
                  </button>
                  </td>
                  <td>{order.orderId}</td>
                  <td>{order.productId}</td>
                  <td>{order.firstName}</td>
                  <td>{order.lastName}</td>
                  <td>{order.address}</td>
                  <td>{order.aptNumber}</td>
                  <td>{order.city}</td>
                  <td>{order.postalCode}</td>
                  <td>{order.province}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default Admin;
  