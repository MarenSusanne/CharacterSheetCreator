import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classInfo from './ClassInfo';
import { findClassDetails } from './utils';
import ClassTagline from './ClassTagline';
import { useNavigate } from 'react-router-dom'; // Import for navigation if using react-router


function ClassList() {
  const navigate = useNavigate(); // For navigation
  const [classes, setClasses] = useState([]); // State to hold the class list
  const [error, setError] = useState(null);   // State to hold any error message
  const [selectedClass, setSelectedClass] = useState(null); // State to hold the selected class name
  const [classDetails, setClassDetails] = useState(null);   // State to hold the detailed class info
  const [expandedAbility, setExpandedAbility] = useState(null); // Track expanded abilities
  const [features, setFeatures] = useState([]); // State to hold all features
  

  const openDialog = (className) => {
    setSelectedClass(className);
    setError(null);

    // Fetch the selected class's detailed information
    axios
      .get(`https://www.dnd5eapi.co/api/classes/${className.toLowerCase()}`)
      .then((response) => {
        setClassDetails(response.data);
        setError(null); // Clear any previous error
      })
      .catch(() => {
        setError("Error fetching class details.");
      });
  };

  const closeDialog = () => {
    setSelectedClass(null);
    setClassDetails(null);
  };

  const toggleAbility = (index) => {
    setExpandedAbility(expandedAbility === index ? null : index); // Toggle the ability's expanded state
  };

  useEffect(() => {
  // Fetch the list of classes from the API
  axios
    .get(`https://www.dnd5eapi.co/api/classes`)
    .then((response) => {
      setClasses(response.data.results);
      setError(null);
    })
    .catch(() => {
      setError("Error fetching classes.");
    });

  // Fetch all features from the API and then get details for each
  axios
    .get(`https://www.dnd5eapi.co/api/features`)
    .then(async (response) => {
      const featureSummaries = response.data.results;
      const featureDetails = await Promise.all(
        featureSummaries.map((feature) =>
          axios.get(`https://www.dnd5eapi.co${feature.url}`).then((res) => res.data)
        )
      );

      // Sort features by level in ascending order
      featureDetails.sort((a, b) => a.level - b.level);

      setFeatures(featureDetails);
    })
    .catch(() => {
      setError("Error fetching features.");
    });
}, []);

  const localClassDetails = selectedClass ? findClassDetails(selectedClass, classInfo) : null;

  // Filter features by selected class name and level
  const filteredFeatures = features.filter(
    (feature) => feature.class && feature.class.name.toLowerCase() === selectedClass?.toLowerCase()
  );

  const handleAddClass = () => {
    const existingCharacterData = JSON.parse(localStorage.getItem('newCharacter')) || {};
    const updatedCharacterData = {
      ...existingCharacterData,
      class: selectedClass,
      level: 1, // Start at level 1
    };
  
    localStorage.setItem('newCharacter', JSON.stringify(updatedCharacterData));
    navigate('/create/race'); // Redirect to race selection
  };

  return (
    <div>
      <h3>Choose a Class</h3>
      {error && <p>{error}</p>} {/* Display error message if present */}

      <div>
        {classes.map((item) => (
          <div
            key={item.index}
            className="class-item pointer"
            onClick={() => openDialog(item.name)}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Modal for Class Details */}
      {selectedClass && classDetails && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                <h4>{classDetails.name}</h4>
                <ClassTagline classInfo={localClassDetails} />
                <p>{classDetails.desc ? classDetails.desc.join(" ") : "Description not available."}</p>
                <div>
                  <div><b>Hit Die: </b>{classDetails.hit_die}</div>
                  <div><b>Primary Ability: </b>{classDetails.primary_ability || "Unknown"}</div>
                  <div><b>Saves: </b>{classDetails.saving_throws.map(save => save.name).join(", ")}</div>
                </div>
              </div>
              <div>
                {filteredFeatures.length > 0 ? (
                  filteredFeatures.map((feature, idx) => (
                    <div key={idx}>
                      <h5>Level {feature.level}</h5>
                      <div
                        onClick={() => toggleAbility(`${feature.index}-${idx}`)}
                        className="classAbility pointer"
                      >
                        <b>{feature.name}</b>
                      </div>
                      {expandedAbility === `${feature.index}-${idx}` && (
                        <div>
                          {Array.isArray(feature.desc) ? (
                            feature.desc.map((desc, i) => (
                              <div key={i}>{desc}</div>
                            ))
                          ) : (
                            <div>{feature.desc}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No abilities available.</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeDialog}>Close</button>
              <button onClick={handleAddClass}>Add Class</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassList;
