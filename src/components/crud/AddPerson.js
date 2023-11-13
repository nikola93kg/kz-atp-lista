import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/AddPerson.css'
import { useToast } from '../../store/ToastContext';

function AddPerson() {
  const [personName, setPersonName] = useState('');
  const [personImageUrl, setPersonImageUrl] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const personData = {
      name: personName,
      image: personImageUrl,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/persons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setPersonName('');
      setPersonImageUrl('');
      addToast('Player added successfully!', 'success');
      navigate('/');
    } catch (error) {
      console.error('There was an error adding the player:', error);
      addToast('Error adding player. Please try again.', 'error');
    }
  };

  return (
    <div className="add-person-container">
      <h2>Add Player</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="personName">Name:</label>
        <input
          type="text"
          id="personName"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          required
        />
  
        <label htmlFor="personImage">Image URL:</label>
        <input
          type="text"
          id="personImage"
          value={personImageUrl}
          onChange={(e) => setPersonImageUrl(e.target.value)}
          required
        />
  
        {personImageUrl && (
          <img src={personImageUrl} alt="Preview" className="image-preview" />
        )}
  
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default AddPerson;
