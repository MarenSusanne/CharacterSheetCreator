import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BackgroundComponent() {
  const navigate = useNavigate();
  const [backgrounds, setBackgrounds] = useState([]); // List of available backgrounds
  const [error, setError] = useState(null);          // Error message
  const [selectedBackground, setSelectedBackground] = useState(null); // Selected background
  const [backgroundDetails, setBackgroundDetails] = useState(null);   // Details of selected background

  useEffect(() => {
    // Fetch the list of backgrounds from the API
    axios
      .get(`https://www.dnd5eapi.co/api/backgrounds`)
      .then((response) => {
        setBackgrounds(response.data.results);
        setError(null);
      })
      .catch(() => {
        setError("Error fetching backgrounds.");
      });
  }, []);

  const openDialog = (backgroundName) => {
    setSelectedBackground(backgroundName);
    setError(null);

    // Fetch details for the selected background
    axios
      .get(`https://www.dnd5eapi.co/api/backgrounds/${backgroundName.toLowerCase()}`)
      .then((response) => {
        setBackgroundDetails(response.data);
        setError(null);
      })
      .catch(() => {
        setError("Error fetching background details.");
      });
  };

  const closeDialog = () => {
    setSelectedBackground(null);
    setBackgroundDetails(null);
  };

  const handleAddBackground = () => {
    const existingCharacterData = JSON.parse(localStorage.getItem('newCharacter')) || {};
    const updatedCharacterData = {
      ...existingCharacterData,
      background: selectedBackground,
    };

    localStorage.setItem('newCharacter', JSON.stringify(updatedCharacterData));
    navigate('/create/abilities'); // Redirect to the next step or overview
  };

  return (
    <div>
      <h3>Choose a Background</h3>
      {error && <p>{error}</p>}

      <div>
        {backgrounds.map((item) => (
          <div
            key={item.index}
            className="background-item pointer"
            onClick={() => openDialog(item.name)}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {selectedBackground && backgroundDetails && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">
              <h4>{backgroundDetails.name}</h4>
              <p>{backgroundDetails.desc ? backgroundDetails.desc.join(" ") : "Description not available."}</p>

              <div>
                <b>Starting Proficiencies:</b>
                {backgroundDetails.starting_proficiencies && backgroundDetails.starting_proficiencies.length > 0 ? (
                  <ul>
                    {backgroundDetails.starting_proficiencies.map((proficiency, idx) => (
                      <li key={idx}>{proficiency.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No proficiencies listed.</p>
                )}
              </div>

              <div>
                <b>Equipment:</b>
                {backgroundDetails.starting_equipment && backgroundDetails.starting_equipment.length > 0 ? (
                  <ul>
                    {backgroundDetails.starting_equipment.map((equipment, idx) => (
                      <li key={idx}>{equipment.equipment.name} (Quantity: {equipment.quantity})</li>
                    ))}
                  </ul>
                ) : (
                  <p>No equipment listed.</p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={closeDialog}>Close</button>
              <button onClick={handleAddBackground}>Add Background</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BackgroundComponent;
