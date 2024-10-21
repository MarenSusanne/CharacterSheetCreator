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
  if (value < 1 || value > 30) return null;
  const modifier = Math.floor((value - 10) / 2);
  return (modifier >= 0 ? `+${modifier}` : `${modifier}`); 
}

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
        <div className="display-horisontal" style={{ 'margin': '-0.5vw 0vw 0vw 0vw', 'width' : '78vw'}}> {/* last info block */} 
                <div className="" > {/* Left column */}
                    <div className="fun-small-border" style={{ 'margin': '0vw 0vw 0.3vw -1.8vw', 'width': '20.8vw', 'height': '12.4vw'}}> {/* Saving Throws */}

                    </div>
                    <div className="fun-small-border" style={{ 'margin': '0vw 0vw 0.3vw -1.8vw', 'width': '20.8vw', 'height': '12.4vw'}}> {/* Senses */}

                    </div>
                    <div className="fun-small-border" style={{ 'margin': '0vw 0vw 0.3vw -1.8vw', 'width': '20.8vw', 'height': '18vw'}}> {/* Proficiencies */}

                    </div>
                </div>
            <div className="fun-small-border" style={{ 'margin': '0vw 0vw 0.3vw -3vw', 'width': '20.8vw', 'height': '43.4vw'}}> {/* Middle column / skills */}

            </div>
            <div className="" style={{ 'margin': '0vw 0vw 0vw -2.2vw', 'width': '41vw', 'height': '43.4vw'}}> {/* Right column */}
                <div className='display-horisontal' style={{'margin-bottom' : '1vw'}}> {/* Top Line */}
                    <div> {/* Initiative */}
                      <div className='centre-content'>Initiative</div>
                      <div className="fun-small-border" style={{ 'margin': '0vw 0vw 0vw 0.5vw', 'width': '7.7vw', 'height': '4vw'}}></div>
                    </div>
                    <div className="fun-small-border" style={{ 'margin': '0vw 0vw 0vw -1.6vw', 'width': '8.5vw', 'height': '6vw'}}> {/* AC */}
                        
                    </div>
                    <div className="fun-small-border" style={{ 'margin': '0vw 0vw 0vw -1.9vw', 'width': '27vw', 'height': '6vw'}}> {/* Defenses / Conditions */}
                        
                    </div>
                </div>
                <div className="fun-small-border" style={{ 'margin': '0vw 0vw 0vw -1vw', 'width': '42vw', 'height': '36.3vw'}}> {/* Bottom Block */}
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default ShowComponent;
