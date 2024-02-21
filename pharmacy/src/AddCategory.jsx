import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function AddCategory() {
  const [name, setName] = useState('');
  const [addCategoryError, setAddCategoryError] = useState('');
  const [categories, setCategories] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3005/admin/add-category').then(categories => setCategories(categories.data)).catch(err => console.log(err))
  }, [])

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    // Trim whitespace from the category name
    const trimmedName = name.trim();

    if (!trimmedName) {
      setAddCategoryError('Category name cannot be empty');
      return;
    }


    try {
      // Perform add-category logic
      await axios.post('http://localhost:3005/admin/add-category', { name: trimmedName });

      // After successful add-category, redirect to some page (e.g., home page)
      navigateTo('/');
    } catch (error) {
      console.error('Error occurred during adding category:', error);
      setAddCategoryError('Error occurred during adding category. Please try again later.');
    }
  };

  return (
    <div>
      <div>
        <div>
          <form id="add-category" onSubmit={handleAddCategory}>
            <h1>Add Category</h1>

            <div>
              <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {addCategoryError && <p>{addCategoryError}</p>}

            <button type="submit">
              Add Category
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
