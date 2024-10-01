import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EditComponent() {
  const { id } = useParams(); // Get ID from URL
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5042/api/character/${id}`)
      .then(response => {
        setName(response.data.name); // Set form with existing data
      })
      .catch(error => {
        console.error('Error fetching data for editing:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5042/api/character/${id}`, { name })
      .then(response => {
        console.log('Data updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Edit item name"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditComponent;