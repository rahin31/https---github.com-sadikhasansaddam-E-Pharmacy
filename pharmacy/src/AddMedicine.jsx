import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AddMedicine() {
  const [brandName, setBrandName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [category, setCategory] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [addMedicineError, setAddMedicineError] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [medicineTypes, setMedicineTypes] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    // Fetch existing manufacturers, categories, and medicine types
    axios.get('http://localhost:3005/admin/add-medicine')
      .then(response => {
        const { manufacturers, categories, medicineTypes } = response.data;

        // Extracting only the 'name' attribute from each collection
        const manufacturerNames = manufacturers.map(manufacturer => manufacturer.name);
        const categoryNames = categories.map(category => category.name);
        const medicineTypeNames = medicineTypes.map(type => type.name);

        // Update state with the extracted names
        setManufacturers(manufacturerNames);
        setCategories(categoryNames);
        setMedicineTypes(medicineTypeNames);
      })
      .catch(err => console.log(err));
  }, []);


  const handleAddMedicine = async (e) => {
    e.preventDefault();

    const parsedBuyingPrice = parseFloat(buyingPrice);
    const parsedSellingPrice = parseFloat(sellingPrice);

    if (!brandName || !genericName || !manufacturer || !category || !medicineType || isNaN(parsedBuyingPrice) || isNaN(parsedSellingPrice)) {
      setAddMedicineError('Please fill in all fields correctly.');
      return;
    }

    try {
      // Perform add-medicine logic
      await axios.post('http://localhost:3005/admin/add-medicine', {
        brandName,
        genericName,
        manufacturer,
        category,
        medicineType,
        buyingPrice: parsedBuyingPrice,
        sellingPrice: parsedSellingPrice
      });

      // After successful add-medicine, redirect to some page (e.g., home page)
      navigateTo('/');
    } catch (error) {
      console.error('Error occurred during adding medicine:', error);
      setAddMedicineError('Error occurred during adding medicine. Please try again later.');
    }
  };

  return (
    <div>
      <div>
        <div>
          <form id="add-medicine" onSubmit={handleAddMedicine}>
            <h1>Add Medicine</h1>

            <div>
              <input
                type="text"
                placeholder="Brand Name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Generic Name"
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
              />
            </div>

            <div>
              <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}>
                <option value="">Select Manufacturer</option>
                {manufacturers.map(manufacturer => (
                  <option key={manufacturer._id} value={manufacturer._id}>{manufacturer.name}</option>
                ))}
              </select>
            </div>

            <div>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <select value={medicineType} onChange={(e) => setMedicineType(e.target.value)}>
                <option value="">Select Medicine Type</option>
                {medicineTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="number"
                placeholder="Buying Price"
                value={buyingPrice}
                onChange={(e) => setBuyingPrice(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Selling Price"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>

            {addMedicineError && <p>{addMedicineError}</p>}

            <button type="submit">
              Add Medicine
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;
