import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListComponent() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5042/api/character')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  /*
     axios.delete(`http://localhost:5042/api/character/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
   */

  const handleCreateClick = () => {
    navigate('/Create/class');
  };
  const handleCharacterClick = (id) => {
    navigate(`/Character/${id}`);
  };

  return (
    <div>
      <h2 className="centre-content">List of Characters</h2>
      {items.map(item => (
        <div className="centre-content fun-box pointer" key={item.id}>
          <div onClick={() => handleCharacterClick(item.id)}>{item.name} </div>
          <button onClick={() => handleEdit(item.id)}>Edit</button>
        </div>
      ))}
      <button onClick={handleCreateClick}>Make new Character</button>
    </div>
  );
}

export default ListComponent;