import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowComponent = () => {
  const { id } = useParams(); 
  const [item, setItem] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

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
    { name: 'Strength', value: item.strength },
    { name: 'Dexterity', value: item.dexterity },
    { name: 'Constitution', value: item.constitution },
    { name: 'Intelligence', value: item.intelligence },
    { name: 'Wisdom', value: item.wisdom },
    { name: 'Charisma', value: item.charisma },
  ];


  return (
    <div>
        <div> {/* top info line */}
            <div class="display-horisontal"> 
                <div class="display-horisontal margin" style={{ '--standard-margin': '0vw 3vw 1vw 3vw' }}>
                    <div>
                        <img class="portrait" src="/images/humanoid.jpg" alt="character profile"/>
                    </div>
                    <div class="margin" style={{ lineHeight: '0.5', '--standard-margin': '-1vw 3vw 1vw 3vw' }}>
                        <p>
                            <strong>{item.name} </strong>
                            <button class="button">Manage</button>
                        </p>
                        <p class="transparent50">{item.race}  {item.class}  {item.level}</p>
                        <div>Level {item.level}</div>
                    </div>
                </div>
                <div class="centre-content margin" style={{ '--standard-margin': '0px 0px 0px 175px' }}>
                    <button class="margin button" style={{ '--standard-margin': '4px' }}>Short Rest</button>
                    <button class="margin button" style={{ '--standard-margin': '4px' }}>Long Rest</button>
                    <img class="width margin" src='/images/anvil.png' alt='' style={{ '--standard-width': '50px', '--standard-margin': '4px' }} />
                </div>
            </div>
        </div>
        <div class="display-horisontal"> {/* second info line */}
            <div> {/* Abilities */}
                <div class="display-horisontal">
                    {attributes.map((attr) => (
                        <div class="margin centre-items fun-small-border" key={attr.name} style={{ '--standard-margin': '0vw -1vw 1vw -1vw' }}>
                            <div class="text">{attr.name}</div>
                            <div>{getModifier(attr.value)}</div>
                            <div>{attr.value}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div class="display-vertical margin fun-small-border centre-content" style={{ '--standard-margin': '0vw -1vw 1vw -1vw' }}> {/* Proficiency */}
                <div class="text">Proficiency</div>
                <div>{getBonusByLevel(item.level)}</div>
                <div class="text">Bonus</div>
            </div>
            <div> {/* Speed */}

            </div>
            <div> {/* Inspiration */}

            </div>
            <div> {/* HP */}

            </div>
        </div>
        <div> {/* last info block */} 
                <div> {/* Left column */}
                    <div> {/* Saving Throws */}

                    </div>
                    <div> {/* Senses */}

                    </div>
                    <div> {/* Proficiencies */}

                    </div>
                </div>
            <div> {/* Middle column / skills */}

            </div>
            <div> {/* Right column */}
                <div> {/* Top Line */}
                    <div> {/* Initiative */}
                    
                    </div>
                    <div> {/* AC */}
                        
                    </div>
                    <div> {/* Defenses / Conditions */}
                        
                    </div>
                </div>
                <div> {/* Bottom Block */}
                    
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