import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AddManufacturer() {
  const [name, setName] = useState('');
  const [established, setEstablished] = useState('');
  const [headquarter, setHeadquarter] = useState('');
  const [addManufacturerError, setAddManufacturerError] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3005/admin/add-manufacturer').then(manufacturers => setManufacturers(manufacturers.data)).catch(err => console.log(err))
  }, [])

  const handleAddManufacturer = async (e) => {
    e.preventDefault();
    
    // Trim whitespace from the manufacturer name
    const trimmedName = name.trim();
    const parsedEstablished = parseInt(established);
    const trimmedHeadquarter = headquarter.trim();

    if (!trimmedName) {
      setAddManufacturerError('Manufacturer name cannot be empty');
      return;
    }

    if (isNaN(parsedEstablished)) {
      setAddManufacturerError('Established year must be a valid number');
      return;
    }

    if (!trimmedHeadquarter) {
      setAddManufacturerError('headquarter name cannot be empty');
      return;
    }


    try {
      // Perform add-manufacturer logic
      await axios.post('http://localhost:3005/admin/add-manufacturer', { name: trimmedName, established: parsedEstablished, headquarter: trimmedHeadquarter });

      // After successful add-manufacturer, redirect to some page (e.g., home page)
      navigateTo('/');
    } catch (error) {
      console.error('Error occurred during adding manufacturer:', error);
      setAddCategoryError('Error occurred during adding manufacturer. Please try again later.');
    }
  };

  return (
    <div>
      <div>
        <div>
          <form id="add-manufacturer" onSubmit={handleAddManufacturer}>
            <h1>Add Manufacturer</h1>

            <div>
              <input
                type="text"
                placeholder="Manufacturer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Established In"
                value={established}
                onChange={(e) => setEstablished(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Headquarter At"
                value={headquarter}
                onChange={(e) => setHeadquarter(e.target.value)}
              />
            </div>

            {addManufacturerError && <p>{addManufacturerError}</p>}

            <button type="submit">
              Add Manufacturer
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddManufacturer;
