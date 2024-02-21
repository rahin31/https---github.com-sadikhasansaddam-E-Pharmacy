// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App.jsx'
import AddCategory from './AddCategory.jsx';
import AddManufacturer from './AddManufacturer.jsx';
import AddMedicine from './AddMedicine.jsx';
//import AdminDashboard from './AdminDashboard.jsx';

const Root = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<App/>} />
      <Route path="/admin/add-category" element={<AddCategory/>} />
      <Route path="/admin/add-manufacturer" element={<AddManufacturer/>} />
      <Route path="/admin/add-medicine" element={<AddMedicine/>} />

        {/* <Route component={NotFound} /> */}
      </Routes>
    </Router>
  );
};

export default Root;