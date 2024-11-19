import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditComponent() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  // Initial state setup for all character fields
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [race, setRace] = useState('');
  const [level, setLevel] = useState(1);
  const [background, setBackground] = useState('');
  const [abilities, setAbilities] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  });

  // Fetch character data on component mount
  useEffect(() => {
    axios.get(`http://localhost:5042/api/character/${id}`)
      .then(response => {
        const data = response.data;
        setName(data.name);
        setClassName(data.class);
        setRace(data.race);
        setLevel(data.level);
        setBackground(data.background);
        setAbilities(data.abilities || {}); // Ensure abilities exist
      })
      .catch(error => {
        console.error('Error fetching data for editing:', error);
      });
  }, [id]);

  // Handle form field updates
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCharacter = {
      name,
      class: className,
      race,
      level,
      background,
      abilities
    };

    axios.put(`http://localhost:5042/api/character/${id}`, updatedCharacter)
      .then(response => {
        console.log('Data updated:', response.data);
        navigate(`/character/${id}`); // Optionally navigate to character page or other route
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  // Handle ability score changes
  const handleAbilityChange = (e) => {
    const { name, value } = e.target;
    setAbilities(prevAbilities => ({
      ...prevAbilities,
      [name]: value
    }));
  };

  // Handle character deletion
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      axios.delete(`http://localhost:5042/api/character/${id}`)
        .then(response => {
          console.log('Character deleted:', response.data);
          navigate('/home'); // Redirect to a list of characters or home
        })
        .catch(error => {
          console.error('Error deleting character:', error);
        });
    }
  };

  return (
    <div>
      <h2>Edit Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Edit character name"
            required
          />
        </div>

        <div>
          <label>Class:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Edit class"
            required
          />
        </div>

        <div>
          <label>Race:</label>
          <input
            type="text"
            value={race}
            onChange={(e) => setRace(e.target.value)}
            placeholder="Edit race"
            required
          />
        </div>

        <div>
          <label>Level:</label>
          <input
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            min="1"
            max="20"
            required
          />
        </div>

        <h4>Abilities:</h4>
        <div>
          <label>Strength:</label>
          <input
            type="number"
            name="strength"
            value={abilities.strength}
            onChange={handleAbilityChange}
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
            onChange={handleAbilityChange}
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
            onChange={handleAbilityChange}
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
            onChange={handleAbilityChange}
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
            onChange={handleAbilityChange}
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
            onChange={handleAbilityChange}
            min="1"
            max="30"
          />
        </div>

        <button type="submit">Update Character</button>
      </form>

      <button onClick={handleDelete} style={{ marginTop: '10px', color: 'red' }}>
        Delete Character
      </button>
    </div>
  );
}

export default EditComponent;
