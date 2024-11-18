import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation if using react-router

function Abilities() {
  const [abilities, setAbilities] = useState({
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: ''
  });
  const navigate = useNavigate(); // For navigation


  // Load abilities from localStorage if they exist
  useEffect(() => {
    const savedAbilities = JSON.parse(localStorage.getItem('abilities'));
    if (savedAbilities) {
      setAbilities(savedAbilities);
    }
  }, []);

  // Handle input changes for each ability score
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the ability score
    setAbilities((prevAbilities) => ({
      ...prevAbilities,
      [name]: value
    }));
  };

  // Save the abilities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('abilities', JSON.stringify(abilities));
  }, [abilities]);

  return (
    <div>
      <h3>Enter Ability Scores</h3>
      <form>
        <div>
          <label>Strength:</label>
          <input
            type="number"
            name="strength"
            value={abilities.strength}
            onChange={handleInputChange}
            min="1"
            max="30"
          />
        </div>
        <div>
          <label>Dexterity:</label>
          <input
            type="number"
            name="dexterity"
            value={abilities.dexterity}
            onChange={handleInputChange}
            min="1"
            max="30"
          />
        </div>
        <div>
          <label>Constitution:</label>
          <input
            type="number"
            name="constitution"
            value={abilities.constitution}
            onChange={handleInputChange}
            min="1"
            max="30"
          />
        </div>
        <div>
          <label>Intelligence:</label>
          <input
            type="number"
            name="intelligence"
            value={abilities.intelligence}
            onChange={handleInputChange}
            min="1"
            max="30"
          />
        </div>
        <div>
          <label>Wisdom:</label>
          <input
            type="number"
            name="wisdom"
            value={abilities.wisdom}
            onChange={handleInputChange}
            min="1"
            max="30"
          />
        </div>
        <div>
          <label>Charisma:</label>
          <input
            type="number"
            name="charisma"
            value={abilities.charisma}
            onChange={handleInputChange}
            min="1"
            max="30"
          />
        </div>
      </form>
      <button onClick={() => navigate('/new-character')}>Save Abilities</button>
    </div>
  );
}

export default Abilities;
