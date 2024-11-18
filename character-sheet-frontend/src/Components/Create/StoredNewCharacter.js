import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StoredNewCharacter() {
  const navigate = useNavigate();
  
  // State to hold new character data
  const [newCharacterData, setNewCharacterData] = useState(() => {
    const savedData = localStorage.getItem('newCharacter');
    return savedData ? JSON.parse(savedData) : {
      name: '', class: '', race: '', level: '1', background: ''
    };
  });

  // State to hold ability scores
  const [abilities, setAbilities] = useState(() => {
    const savedAbilities = localStorage.getItem('abilities');
    return savedAbilities ? JSON.parse(savedAbilities) : {
      strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0
    };
  });

  // Handle input changes for both character data and abilities
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in newCharacterData) {
      setNewCharacterData(prevData => ({
        ...prevData,
        [name]: value
      }));
    } else {
      setAbilities(prevAbilities => ({
        ...prevAbilities,
        [name]: value
      }));
    }
  };

  // Save both character data and abilities to localStorage
  useEffect(() => {
    localStorage.setItem('newCharacter', JSON.stringify(newCharacterData));
    localStorage.setItem('abilities', JSON.stringify(abilities));
  }, [newCharacterData, abilities]);

  // Handle character creation (POST request to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine the character data and abilities into one object
    const characterData = {
      ...newCharacterData,
      ...abilities
    };

    try {
      // Send POST request to backend API
      const response = await axios.post('http://localhost:5042/api/character', characterData);
      console.log('Character created:', response.data);

      // Redirect to the next step in the character creation process
      navigate('/create/race');
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
    <div>
      <h2>Create New Character</h2>
      <form onSubmit={handleSubmit}>
        {/* Character Name */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newCharacterData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Character Class */}
        <div>
          <label>Class:</label>
          <input
            type="text"
            name="class"
            value={newCharacterData.class}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Character Race */}
        <div>
          <label>Race:</label>
          <input
            type="text"
            name="race"
            value={newCharacterData.race}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Character Level */}
        <div>
          <label>Level:</label>
          <input
            type="number"
            name="level"
            value={newCharacterData.level}
            onChange={handleInputChange}
            min="1"
            max="20"
            required
          />
        </div>

        {/* Abilities */}
        <h4>Abilities:</h4>
        <div>
          <label>Strength:</label>
          <input
            type="number"
            name="strength"
            value={abilities.strength}
            onChange={handleInputChange}
            min="1"
            max="20"
            required
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
            max="20"
            required
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
            max="20"
            required
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
            max="20"
            required
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
            max="20"
            required
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
            max="20"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Create Character</button>
      </form>

      {/* Debugging output */}
      <h4>Character Summary:</h4>
      <p><b>Name:</b> {newCharacterData.name}</p>
      <p><b>Class:</b> {newCharacterData.class}</p>
      <p><b>Race:</b> {newCharacterData.race}</p>
      <p><b>Level:</b> {newCharacterData.level}</p>
      <h5>Abilities:</h5>
      <p><b>Strength:</b> {abilities.strength}</p>
      <p><b>Dexterity:</b> {abilities.dexterity}</p>
      <p><b>Constitution:</b> {abilities.constitution}</p>
      <p><b>Intelligence:</b> {abilities.intelligence}</p>
      <p><b>Wisdom:</b> {abilities.wisdom}</p>
      <p><b>Charisma:</b> {abilities.charisma}</p>
    </div>
  );
}

export default StoredNewCharacter;
