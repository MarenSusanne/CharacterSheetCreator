import axios from 'axios';
import { useEffect, useState } from 'react';

function ListComponent() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5042/api/character')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5042/api/character/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id)); // Update the state to remove the deleted item
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  return (
    <div>
      <h2>List of Characters</h2>
      {items.map(item => (
        <div key={item.id}>
          {item.name} 
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ListComponent;