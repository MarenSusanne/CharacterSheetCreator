import axios from 'axios';
import { useState } from 'react';

function CreateComponent() {
    const [character, setCharacter] = useState({
        name: '',
        class: '',
        race: '',
        level: 0,
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      });
    

      const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter({
          ...character,
          [name]: value
        });
      };
    

      const handleSubmit = (e) => {
        e.preventDefault();
    

        axios.post('http://localhost:5042/api/character', character)
          .then((response) => {
            console.log("Character created:", response.data);

            setCharacter({
              name: '',
              class: '',
              race: '',
              level: 0,
              strength: 0,
              dexterity: 0,
              constitution: 0,
              intelligence: 0,
              wisdom: 0,
              charisma: 0
            });
          })
          .catch((error) => {
            console.error("There was an error creating the character!", error);
          });
      };
    
      return (
        <div>
          <h2>Create New Character</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={character.name}
                onChange={handleChange}
                required
              />
            </div>
    
            <div>
              <label>Class:</label>
              <input
                type="text"
                name="class"
                value={character.class}
                onChange={handleChange}
                required
              />
            </div>
    
            <div>
              <label>Race:</label>
              <input
                type="text"
                name="race"
                value={character.race}
                onChange={handleChange}
                required
              />
            </div>
    
            <div>
              <label>Level:</label>
              <input
                type="number"
                name="level"
                value={character.level}
                onChange={handleChange}
                min="1"
                max="20"
                required
              />
            </div>
    
            <div>
              <label>Strength:</label>
              <input
                type="number"
                name="strength"
                value={character.strength}
                onChange={handleChange}
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
                value={character.dexterity}
                onChange={handleChange}
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
                value={character.constitution}
                onChange={handleChange}
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
                value={character.intelligence}
                onChange={handleChange}
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
                value={character.wisdom}
                onChange={handleChange}
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
                value={character.charisma}
                onChange={handleChange}
                min="1"
                max="20"
                required
              />
            </div>
    
            <button type="submit">Create Character</button>
          </form>
        </div>
      );
    };

export default CreateComponent;