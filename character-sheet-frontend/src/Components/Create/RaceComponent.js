import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import for navigation if using react-router


function RaceList() {
  const navigate = useNavigate(); // For navigation
  const [races, setRaces] = useState([]); // State to hold the class list
  const [error, setError] = useState(null);   // State to hold any error message
  const [selectedRace, setSelectedRace] = useState(null); // State to hold the selected class name
  const [raceDetails, setRaceDetails] = useState(null);   // State to hold the detailed class info
  const [expandedTrait, setExpandedTrait] = useState(null); // Track expanded traits
  const [traitDetails, setTraitDetails] = useState({}); // Store trait details by trait index

  

  const openDialog = (raceName) => {
    setSelectedRace(raceName);
    setError(null);

    // Fetch the selected class's detailed information
    axios
      .get(`https://www.dnd5eapi.co/api/races/${raceName.toLowerCase()}`)
      .then((response) => {
        setRaceDetails(response.data);
        setError(null); // Clear any previous error
      })
      .catch(() => {
        setError("Error fetching race details.");
      });
  };

  const closeDialog = () => {
    setSelectedRace(null);
    setRaceDetails(null);
    setExpandedTrait(null); // Reset expanded trait on close
    setTraitDetails({});
  };

  useEffect(() => {
  // Fetch the list of classes from the API
  axios
    .get(`https://www.dnd5eapi.co/api/races`)
    .then((response) => {
      setRaces(response.data.results);
      setError(null);
    })
    .catch(() => {
      setError("Error fetching races.");
    });

  // Fetch all features from the API and then get details for each
  
}, []);

const handleAddRace = () => {
  const existingCharacterData = JSON.parse(localStorage.getItem('newCharacter')) || {};
  const updatedCharacterData = {
    ...existingCharacterData,
    race: selectedRace,
  };

  localStorage.setItem('newCharacter', JSON.stringify(updatedCharacterData));
  navigate('/create/background'); // Redirect to character overview or next step
};

  const toggleTrait = (trait) => {
    if (expandedTrait === trait.index) {
      setExpandedTrait(null); // Collapse if already expanded
      return;
    }

    setExpandedTrait(trait.index); // Expand the selected trait

    // Fetch trait details if not already fetched
    if (!traitDetails[trait.index]) {
      axios
        .get(`https://www.dnd5eapi.co${trait.url}`)
        .then((response) => {
          setTraitDetails((prevDetails) => ({
            ...prevDetails,
            [trait.index]: response.data,
          }));
        })
        .catch(() => {
          setError("Error fetching trait details.");
        });
    }
  };

  return (
    <div>
      <h3>Choose a Race</h3>
      {error && <p>{error}</p>}

      <div>
        {races.map((item) => (
          <div
            key={item.index}
            className="class-item pointer"
            onClick={() => openDialog(item.name)}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {selectedRace && raceDetails && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">
              <h4>{raceDetails.name}</h4>
              <div>
                <div><b>Speed: </b>{raceDetails.speed}</div>
                
                <div><b>Ability Bonuses: </b>
                  <ul>
                    {raceDetails.ability_bonuses.map((bonus, index) => (
                      <li key={index}>{bonus.ability_score.name}: +{bonus.bonus}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="classAbility"><b>Size: </b>{raceDetails.size_description}</div>
                
                <div className="classAbility"><b>Languages: </b>{raceDetails.language_desc}</div>
                
                  {raceDetails.traits.length > 0 ? (
                    raceDetails.traits.map((trait, index) => (
                      <div key={index}>
                        <div
                          onClick={() => toggleTrait(trait)}
                          className="classAbility pointer"
                        >
                          <b>{trait.name}</b>
                        </div>
                        {expandedTrait === trait.index && traitDetails[trait.index] && (
                          <div>
                            {Array.isArray(traitDetails[trait.index].desc) ? (
                              traitDetails[trait.index].desc.map((desc, i) => (
                                <div key={i}>{desc}</div>
                              ))
                            ) : (
                              <div>{traitDetails[trait.index].desc}</div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No traits available.</p>
                  )}
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeDialog}>Close</button>
              <button onClick={handleAddRace}>Add Race</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RaceList;
