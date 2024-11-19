import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classInfo from './ClassInfo';
import { findClassDetails } from './utils';
import ClassTagline from './ClassTagline';
import { useNavigate } from 'react-router-dom';

function ClassList() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const [expandedAbility, setExpandedAbility] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  const openDialog = async (className) => {
    setSelectedClass(className);
    setError(null);
    setClassDetails(null);
    setFeatures([]);
    setLoading(true);

    try {
      // Fetch class details
      const classResponse = await axios.get(
        `https://www.dnd5eapi.co/api/classes/${className.toLowerCase()}`
      );
      setClassDetails(classResponse.data);

      // Fetch all features
      const featuresResponse = await axios.get(`https://www.dnd5eapi.co/api/features`);

      // Filter features for the selected class
      const filteredFeatureSummaries = featuresResponse.data.results;

      const filteredFeatures = await Promise.all(
        filteredFeatureSummaries.map(async (feature) => {
          const featureDetail = await axios
            .get(`https://www.dnd5eapi.co${feature.url}`)
            .then((res) => res.data);

          return featureDetail.class.name.toLowerCase() === className.toLowerCase()
            ? featureDetail
            : null;
        })
      );

      // Remove null values and sort by level
      const classFeatures = filteredFeatures.filter((feature) => feature !== null);
      classFeatures.sort((a, b) => a.level - b.level);

      setFeatures(classFeatures);
    } catch (err) {
      setError('Error fetching class or features.');
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setSelectedClass(null);
    setClassDetails(null);
    setFeatures([]);
    setExpandedAbility(null);
  };

  const toggleAbility = (index) => {
    setExpandedAbility(expandedAbility === index ? null : index);
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
        setError('Error fetching classes.');
      });
  }, []);

  const localClassDetails = selectedClass ? findClassDetails(selectedClass, classInfo) : null;

  const handleAddClass = () => {
    const existingCharacterData = JSON.parse(localStorage.getItem('newCharacter')) || {};
    const updatedCharacterData = {
      ...existingCharacterData,
      class: selectedClass,
      level: 1, // Start at level 1
    };

    localStorage.setItem('newCharacter', JSON.stringify(updatedCharacterData));
    navigate('/create/race');
  };

  return (
    <div>
      <h3>Choose a Class</h3>
      {error && <p>{error}</p>}

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

      {loading && <p>Loading class details...</p>}

      {selectedClass && classDetails && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                <h4>{classDetails.name}</h4>
                <ClassTagline classInfo={localClassDetails} />
                <p>{classDetails.desc ? classDetails.desc.join(' ') : 'Description not available.'}</p>
                <div>
                  <div>
                    <b>Hit Die: </b>
                    {classDetails.hit_die}
                  </div>
                  <div>
                    <b>Primary Ability: </b>
                    {classDetails.primary_ability || 'Unknown'}
                  </div>
                  <div>
                    <b>Saves: </b>
                    {classDetails.saving_throws.map((save) => save.name).join(', ')}
                  </div>
                </div>
              </div>
              <div>
                {features.length > 0 ? (
                  features.map((feature, idx) => (
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
                            feature.desc.map((desc, i) => <div key={i}>{desc}</div>)
                          ) : (
                            <div>{feature.desc}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No features available.</p>
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
