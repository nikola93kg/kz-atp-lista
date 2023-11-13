import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../store/ToastContext';
import ConfirmationModal from '../ConfirmationModal';
import '../../styles/DeletePerson.css';

function DeletePerson() {
  const [people, setPeople] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/persons`);
        if (!response.ok) {
          throw new Error('Failed to fetch players.');
        }
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error('There was an error fetching the players:', error);
        addToast('Error fetching players. Please try again.', 'error');
      }
    };

    fetchPeople();
  }, [addToast]);

  const showDeleteModal = (person) => {
    setPersonToDelete(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPersonToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (personToDelete == null) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/persons/${personToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the player.');
      }

      setPeople(people.filter(person => person.id !== personToDelete.id));
      addToast('Player deleted successfully!', 'success');
    } catch (error) {
      console.error('There was an error deleting the player:', error);
      addToast('Error deleting player. Please try again.', 'error');
    } finally {
      closeModal();
    }
  };

  return (
    <div className="delete-person-container">
      <h2>Delete Player</h2>
      {people.length > 0 ? (
        <ul>
          {people.map((person) => (
            <li key={person.id}>
              {person.name} 
              <button onClick={() => showDeleteModal(person)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No players to display.</p>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={handleConfirmDelete}
        playerName={personToDelete ? personToDelete.name : ''}
      />
    </div>
  );
}

export default DeletePerson;
