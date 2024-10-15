import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ShowComponent = () => {
  const { id } = useParams(); 
  const [item, setItem] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const levelBonuses = [
    { level: 1, bonus: '+2' },
    { level: 2, bonus: '+2' },
    { level: 3, bonus: '+2' },
    { level: 4, bonus: '+2' },
    { level: 5, bonus: '+3' },
    { level: 6, bonus: '+3' },
    { level: 7, bonus: '+3' },
    { level: 8, bonus: '+3' },
    { level: 9, bonus: '+4' },
    { level: 10, bonus: '+4' },
    { level: 11, bonus: '+4' },
    { level: 12, bonus: '+4' },
    { level: 13, bonus: '+5' },
    { level: 14, bonus: '+5' },
    { level: 15, bonus: '+5' },
    { level: 16, bonus: '+5' },
    { level: 17, bonus: '+6' },
    { level: 18, bonus: '+6' },
    { level: 19, bonus: '+6' },
    { level: 20, bonus: '+6' }
];

const getBonusByLevel = (level) => {
  const bonus = levelBonuses.find(l => l.level === level);
  return bonus ? bonus.bonus : null;
};

const getModifier = (value) => {
    if (value === 1) return '-5';
    if (value >= 2 && value <= 3) return '-4';
    if (value >= 4 && value <= 5) return '-3';
    if (value >= 6 && value <= 7) return '-2';
    if (value >= 8 && value <= 9) return '-1';
    if (value >= 10 && value <= 11) return '+0';
    if (value >= 12 && value <= 13) return '+1';
    if (value >= 14 && value <= 15) return '+2';
    if (value >= 16 && value <= 17) return '+3';
    if (value >= 18 && value <= 19) return '+4';
    if (value >= 20 && value <= 21) return '+5';
    if (value >= 22 && value <= 23) return '+6';
    if (value >= 24 && value <= 25) return '+7';
    if (value >= 26 && value <= 27) return '+8';
    if (value >= 28 && value <= 29) return '+9';
    if (value === 30) return '+10';
    return null;
  };

  useEffect(() => {
    
    axios.get(`http://localhost:5042/api/character/${id}`)
      .then((response) => {
        setItem(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        setError('There was an error fetching the item!');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!item) {
    return <div>No item found!</div>;
  }

  const attributes = [
    { name: 'STR', value: item.strength },
    { name: 'DEX', value: item.dexterity },
    { name: 'CON', value: item.constitution },
    { name: 'INT', value: item.intelligence },
    { name: 'WIS', value: item.wisdom },
    { name: 'CHA', value: item.charisma },
  ];
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
        <div style={{ 'margin': '0vw 0vw -1.4vw 0vw' }}> {/* top info line */}
            <div className="display-horisontal "> 
                <div className="display-horisontal margin max-width" style={{ '--standard-margin': '0vw 3vw 1vw 3vw' }}>
                    <div>
                        <img className="portrait" src="/images/humanoid.jpg" alt="character profile"/>
                    </div>
                    <div className="margin" style={{ lineHeight: '0.1', '--standard-margin': '-1vw 3vw 1vw 2.5vw' }}>
                        <p>
                            <strong>{item.name} </strong>
                            <button className="button">Manage</button>
                        </p>
                        <p className="transparent50">{item.race}  {item.class}  {item.level}</p>
                        <div>Level {item.level}</div>
                    </div>
                </div>
                <div className="centre-end-content">
                    <button className="margin button" style={{ '--standard-margin': '0.2vw' }}>Short Rest</button>
                    <button className="margin button" style={{ '--standard-margin': '0.2vw' }}>Long Rest</button>
                    <img  onClick={() => handleEdit(item.id)} className="width margin" src='/images/anvil.png' alt='' style={{ '--standard-width': '3vw', '--standard-margin': '0.2vw', 'cursor': 'pointer' }} />
                </div>
            </div>
        </div>
        <div className="display-horisontal"> {/* second info line */}
            <div> {/* Abilities */}
                <div className="display-horisontal">
                    {attributes.map((attr) => (
                        <div className="margin centre-items fun-small-border" key={attr.name} style={{ '--standard-margin': '0vw -0.3vw 1vw -0.9vw' }}>
                            <div className="text">{attr.name}</div>
                            <div>{getModifier(attr.value)}</div>
                            <div>{attr.value}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="display-vertical margin fun-small-border centre-content" style={{ '--standard-margin': '0vw -1vw 1vw -1vw', 'width': '8.3vw', 'height': '5.3vw' }}> {/* Proficiency */}
                <div className="text_long">Proficiency</div>
                <div>{getBonusByLevel(item.level)}</div>
                <div className="text">Bonus</div>
            </div>
            <div className="display-vertical margin fun-small-border centre-content" style={{ '--standard-margin': '0vw -1vw 1vw -0.5vw', 'width': '8.1vw', 'height': '5.3vw' }}> {/* Speed */}
                    <div>Walking</div>
                    <div>30. ft</div>
                    <div>Speed</div>
            </div>
            <div className="display-vertical margin centre-content" style={{ '--standard-margin': '0vw -1vw 0vw -0.5vw', 'width': '7.1vw', 'height': '5vw' }}> {/* Inspiration */}
              <div className="display-vertical fun-smallest-border centre-content"> {/* Inspiration */}
              </div>
              <div>Heroic</div>
              <div>Inspiration</div>
            </div>
            <div className="display-horisontal margin fun-small-border centre-content health-container" style={{ '--standard-margin': '0vw -1vw 1vw -0.7vw', 'width': '21.5vw', 'height': '5.3vw' }}> {/* HP */}
                    <div>
                      <div className="health">HEAL</div>
                      <input className="health"></input>
                      <div className="health">DAMAGE</div>
                    </div>
                    <div className="display-vertical container">
                      <div className='position-end'>Current</div>
                      <div> </div>
                        <div>Max</div>
                        <div className='position-end'>60</div> {/* current health */}
                        <div>/</div>
                        <div>60</div> {/* max health */}
                      <div> </div>
                      <div className='hp'>Hit Points</div>
                      <div> </div>
                    </div>
                    <div>
                      <div>Temp</div>
                      <div>--</div>
                    </div>
            </div>
        </div>
        <div className="display-horisontal spacebetween"> {/* last info block */} 
                <div className="testborder"> {/* Left column */}
                    <div className="fun-small-border"> {/* Saving Throws */}

                    </div>
                    <div className="fun-small-border"> {/* Senses */}

                    </div>
                    <div className="fun-small-border"> {/* Proficiencies */}

                    </div>
                </div>
            <div className="fun-small-border"> {/* Middle column / skills */}

            </div>
            <div className="testborder"> {/* Right column */}
                <div> {/* Top Line */}
                    <div className="fun-small-border"> {/* Initiative */}
                    
                    </div>
                    <div className="fun-small-border"> {/* AC */}
                        
                    </div>
                    <div className="fun-small-border"> {/* Defenses / Conditions */}
                        
                    </div>
                </div>
                <div className="fun-small-border"> {/* Bottom Block */}
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default ShowComponent;


/*<div>
      <h2>Character Details</h2>
      <ul>
        <li><strong>Name:</strong> {item.name}</li>
        <li><strong>Class:</strong> {item.class}</li>
        <li><strong>Race:</strong> {item.race}</li>
        <li><strong>Level:</strong> {item.level}</li>
        <li><strong>Strength:</strong> {item.strength}</li>
        <li><strong>Dexterity:</strong> {item.dexterity}</li>
        <li><strong>Constitution:</strong> {item.constitution}</li>
        <li><strong>Intelligence:</strong> {item.intelligence}</li>
        <li><strong>Wisdom:</strong> {item.wisdom}</li>
        <li><strong>Charisma:</strong> {item.charisma}</li>
      </ul>
    </div> */