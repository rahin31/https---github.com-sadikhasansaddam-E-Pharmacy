import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom
import axios from 'axios';
import './App.css';

function App() {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch total orders count from your backend API
    axios.get('http://localhost:3005/admin/dashboard')
      .then(response => {
        setTotalOrders(response.data.totalOrders);
      })
      .catch(error => {
        console.error('Error fetching total orders:', error);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to the Admin Dashboard</h1>
        <div>
          <div>
            <Link to="/admin/sale-analysis" className="button">Sale Analysis</Link>
            <Link to="/admin/pending-orders" className="button">Pending Orders ({totalOrders})</Link>
            <Link to="/admin/check-stock" className="button">Check Stock</Link>
            <Link to="/admin/update-stock" className="button">Update Stock</Link>
            <Link to="/admin/customers-list" className="button">Customers List</Link>
          </div>
          <div>
            <Link to="/admin/edit-medicine" className="button">Edit Medicine</Link>
            <Link to="/admin/add-medicine" className="button">Add Medicine</Link>
            <Link to="/admin/remove-medicine" className="button">Remove Medicine</Link>
            <Link to="/admin/add-manufacturer" className="button">Add Manufacturer</Link>
            <Link to="/admin/add-category" className="button">Add Category</Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
