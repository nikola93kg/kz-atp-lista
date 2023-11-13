import React, { useState, useEffect } from "react";
import "../styles/VotingForm.css";

function VotingForm({ onVote }) {
  const [selectedPerson, setSelectedPerson] = useState({ id: null, name: "" });
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/persons`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPersons(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching persons:", error);
  //       setIsLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const fetchPersons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/persons`);
        if (!response.ok) {
          throw new Error("Error fetching persons");
        }
        let data = await response.json();
        data = sortPersons(data);
        setPersons(data);
      } catch (error) {
        console.error("Error fetching persons:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPersons();
  }, []);

  const sortPersons = (persons) => {
    return persons.slice().sort((a, b) => a.id - b.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPerson) {
      alert("Please select a person to vote for.");
      return;
    }

    onVote(selectedPerson);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="voting-form">
      <form onSubmit={handleSubmit}>
        {persons.map((person) => (
          <div key={person.id} className="person-option">
            <label className="person-label">
              <img
                src={person.image}
                alt={person.name}
                className="person-image"
              />
              {person.name}
            </label>
            <input
              type="radio"
              name="person"
              value={person.id}
              onChange={() =>
                setSelectedPerson({ id: person.id, name: person.name })
              }
            />
          </div>
        ))}
        <button type="submit" className="vote-button">
          Vote
        </button>
      </form>
    </div>
  );
}

export default VotingForm;
