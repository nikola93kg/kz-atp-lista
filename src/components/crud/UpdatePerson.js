import React, { useState, useEffect } from "react";
import { useToast } from "../../store/ToastContext.js";
import "../../styles/UpdatePerson.css";

function UpdatePerson() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const sortPlayersById = (players) => {
    return players.slice().sort((a, b) => a.id - b.id);
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/persons`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch players.");
      }
      const data = await response.json();
      setPlayers(sortPlayersById(data));
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedPlayer) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/persons/${selectedPlayer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedPlayer),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update player.");
      }

      const updatedPlayer = await response.json();

      setPlayers(prevPlayers => sortPlayersById([
        ...prevPlayers.filter(p => p.id !== updatedPlayer.id),
        updatedPlayer,
      ]));

      addToast("Player updated successfully!", "success");
      setIsModalOpen(false);
      setSelectedPlayer(null);
      // fetchPlayers();
    } catch (error) {
      console.error("There was an error:", error);
      addToast("Failed to update player. Please try again.", "error");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="update-person-container">
      <h2 className="update-person-header">Edit Player</h2>
      <ul className="player-list">
        {players.map((player) => (
          <li
            key={player.id}
            className="player-item"
            onClick={() => openModal(player)}
          >
            {player.name}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-header">
              <h3>Edit Player</h3>
            </div>
            <div className="modal-content">
              <img
                src={selectedPlayer.image}
                alt={selectedPlayer.name}
                className="player-image-preview"
              />
              <form className="modal-form" onSubmit={handleSubmit}>
                <label htmlFor="playerName">Name:</label>
                <input
                  type="text"
                  id="playerName"
                  name="name"
                  value={selectedPlayer.name}
                  onChange={handleInputChange}
                />
                <label htmlFor="playerImage">Image URL:</label>
                <input
                  type="text"
                  id="playerImage"
                  name="image"
                  value={selectedPlayer.image}
                  onChange={handleInputChange}
                />
                <button type="submit" className="update-player-btn">
                  Update Player
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePerson;
