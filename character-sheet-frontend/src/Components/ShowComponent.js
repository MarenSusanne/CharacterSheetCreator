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

  const getBonusByLevel = (level) => {
    if (level < 1 || level > 20) return null;
    return Math.floor((level - 1) / 4) + 2;
  };

const getModifier = (value) => {
  if (value < 1 || value > 30) return null;
  return Math.floor((value - 10) / 2);
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

  const proficiency = (item) => {
    return getBonusByLevel(item)
  }

  const attributes = [
    { name: 'STR', value: item.strength },
    { name: 'DEX', value: item.dexterity },
    { name: 'CON', value: item.constitution },
    { name: 'INT', value: item.intelligence },
    { name: 'WIS', value: item.wisdom },
    { name: 'CHA', value: item.charisma },
  ];

  const getSkills = (item) => {
    const proficiancy = getBonusByLevel(item.level)
    const skills = [
      { name: 'Acrobatics', type: 'DEX', baseValue: getModifier(item.dexterity) },
      { name: 'Animal Handling', type: 'WIS', baseValue: getModifier(item.wisdom) },
      { name: 'Arcana', type: 'INT', baseValue: getModifier(item.intelligence) },
      { name: 'Athletics', type: 'STR', baseValue: getModifier(item.strength) },
      { name: 'Deception', type: 'CHA', baseValue: getModifier(item.charisma) },
      { name: 'History', type: 'INT', baseValue: getModifier(item.intelligence) },
      { name: 'Insight', type: 'WIS', baseValue: getModifier(item.wisdom) },
      { name: 'Intimidation', type: 'CHA', baseValue: getModifier(item.charisma) },
      { name: 'Investigation', type: 'INT', baseValue: getModifier(item.intelligence) },
      { name: 'Medicine', type: 'WIS', baseValue: getModifier(item.wisdom) },
      { name: 'Nature', type: 'INT', baseValue: getModifier(item.intelligence) },
      { name: 'Perception', type: 'WIS', baseValue: getModifier(item.wisdom) },
      { name: 'Performance', type: 'CHA', baseValue: getModifier(item.charisma) },
      { name: 'Persuasion', type: 'CHA', baseValue: getModifier(item.charisma) },
      { name: 'Religion', type: 'INT', baseValue: getModifier(item.intelligence) },
      { name: 'Sleight of Hand', type: 'DEX', baseValue: getModifier(item.dexterity) },
      { name: 'Stealth', type: 'DEX', baseValue: getModifier(item.dexterity) },
      { name: 'Survival', type: 'WIS', baseValue: getModifier(item.wisdom) }
    ];

    return skills.map(skill => {
        const { baseValue } = skill;
        const value = baseValue + (skill.bonus === 1 
            ? proficiancy 
            : skill.bonus === 2 
            ? 2 * proficiancy 
            : 0);
        
        return { ...skill, value }; 
    });
};
const selectedSkills = ['Perception', 'Investigation', 'Insight'];

const filteredSkills = getSkills(item).filter(skill => selectedSkills.includes(skill.name));


  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div style={{ margin: "0vw 0vw -1.4vw 0vw" }}>
        {" "}
        {/* top info line */}
        <div className="display-horisontal ">
          <div
            className="display-horisontal margin max-width"
            style={{ "--standard-margin": "0vw 3vw 1vw 3vw" }}
          >
            <div>
              <img
                className="portrait"
                src="/images/humanoid.jpg"
                alt="character profile"
              />
            </div>
            <div
              className="margin"
              style={{
                lineHeight: "0.1",
                "--standard-margin": "-1vw 3vw 1vw 2.5vw",
              }}
            >
              <p>
                <strong>{item.name} </strong>
                <button className="button">Manage</button>
              </p>
              <p className="transparent50">
                {item.race} {item.class} {item.level}
              </p>
              <div>Level {item.level}</div>
            </div>
          </div>
          <div className="centre-end-content">
            <button
              className="margin button"
              style={{ "--standard-margin": "0.2vw" }}
            >
              Short Rest
            </button>
            <button
              className="margin button"
              style={{ "--standard-margin": "0.2vw" }}
            >
              Long Rest
            </button>
            <img
              onClick={() => handleEdit(item.id)}
              className="width margin"
              src="/images/anvil.png"
              alt=""
              style={{
                "--standard-width": "3vw",
                "--standard-margin": "0.2vw",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
      <div className="display-horisontal">
        {" "}
        {/* second info line */}
        <div>
          {" "}
          {/* Abilities */}
          <div className="display-horisontal">
            {attributes.map((attr) => {
              const modifier = getModifier(attr.value);
              return (
                <div
                  className="margin centre-items fun-small-border"
                  key={attr.name}
                  style={{ "--standard-margin": "0vw 0.5vw 1vw -0vw" }}
                >
                  <div className="text">{attr.name}</div>
                  <div>
                    {modifier >= 0 ? `+${modifier}` : `${modifier}`}
                  </div>{" "}
                  <div>{attr.value}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="display-vertical margin fun-small-border centre-content"
          style={{
            "--standard-margin": "0vw 0.5vw 1vw -0vw",
            width: "8.3vw",
            height: "5.3vw",
          }}
        >
          {" "}
          {/* Proficiency */}
          <div className="text_long">Proficiency</div>
          <div>+ {proficiency(item.level)}</div>
          <div className="text">Bonus</div>
        </div>
        <div
          className="display-vertical margin fun-small-border centre-content"
          style={{
            "--standard-margin": "0vw 0vw 1vw -0vw",
            width: "8vw",
            height: "5.3vw",
          }}
        >
          {" "}
          {/* Speed */}
          <div>Walking</div>
          <div>30. ft</div>
          <div>Speed</div>
        </div>
        <div
          className="display-vertical margin centre-content"
          style={{
            "--standard-margin": "0vw -0vw 0vw -0vw",
            width: "7.1vw",
            height: "5vw",
          }}
        >
          {" "}
          {/* Inspiration */}
          <div className="display-vertical fun-smallest-border centre-content">
            {" "}
            {/* Inspiration */}
          </div>
          <div>Heroic</div>
          <div>Inspiration</div>
        </div>
        <div
          className="display-horisontal margin fun-small-border centre-content health-container"
          style={{
            "--standard-margin": "0vw -0vw 1vw -0vw",
            width: "21.5vw",
            height: "5.3vw",
          }}
        >
          {" "}
          {/* HP */}
          <div>
            <div className="health">HEAL</div>
            <input className="health"></input>
            <div className="health">DAMAGE</div>
          </div>
          <div className="display-vertical container">
            <div className="position-end">Current</div>
            <div> </div>
            <div>Max</div>
            <div className="position-end">60</div> {/* current health */}
            <div>/</div>
            <div>60</div> {/* max health */}
            <div> </div>
            <div className="hp">Hit Points</div>
            <div> </div>
          </div>
          <div>
            <div>Temp</div>
            <div>--</div>
          </div>
        </div>
      </div>
      <div
        className="display-horisontal"
        style={{ margin: "-0.5vw 0vw 0vw 0vw", width: "78vw" }}
      >
        {" "}
        {/* last info block */}
        <div className="">
          {" "}
          {/* Left column */}
          <div
            className="fun-small-border"
            style={{
              margin: "0vw 0.5vw 0.3vw -0vw",
              width: "16vw",
              height: "12.4vw",
            }}
          >
            {" "}
            {/* Saving Throws */}
            <div className="display-horisontal">
              <div>
                {attributes.slice(0, 3).map((attr) => {
                  const modifier = getModifier(attr.value);
                  return (
                    <div
                      className="display-horisontal"
                      key={attr.name}
                      style={{}}
                    >
                      <div>○</div> {/*  */}
                      <div className="text">{attr.name}</div>
                      <div>
                        {modifier >= 0 ? `+${modifier}` : `${modifier}`}
                      </div>{" "}
                    </div>
                  );
                })}
              </div>
              <div>
                {attributes.slice(-3).map((attr) => {
                  const modifier = getModifier(attr.value);
                  return (
                    <div
                      className="display-horisontal"
                      key={attr.name}
                      style={{}}
                    >
                      <div>○</div>
                      <div className="text">{attr.name}</div>
                      <div>
                        {modifier >= 0 ? `+${modifier}` : `${modifier}`}
                      </div>{" "}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>Saving Throw Modifiers</div>
            <div>SAVING THROWS</div>
          </div>
          <div
            className="fun-small-border"
            style={{
              margin: "0vw 0.5vw 0.3vw -0vw",
              width: "16vw",
              height: "12.4vw",
            }}
          >
            {/* Senses */}
            {filteredSkills.map((skill) => {
              return (
                <div className="display-horisontal" key={skill.name} style={{}}>
                  <div>{skill.value + 10}</div>
                  <div className="text">{skill.name}</div>
                </div>
              );
            })}

          </div>
          <div
            className="fun-small-border"
            style={{
              margin: "0vw 0.5vw 0.3vw -0vw",
              width: "16vw",
              height: "18vw",
            }}
          >
            {" "}
            {/* Proficiencies */}
          </div>
        </div>
        <div
          className="fun-small-border"
          style={{
            margin: "0vw 0.5vw 0.3vw -0vw",
            width: "16vw",
            height: "43.4vw",
          }}
        >
          {" "}
          {/* Middle column / skills */}
          {getSkills(item).map((skill) => {
            const modifier = skill.value; 
            return (
              <div className="display-horisontal" key={skill.name} style={{}}>
                <div className="text">{skill.name}</div>
                <div>{modifier >= 0 ? `+${modifier}` : `${modifier}`}</div>
              </div>
            );
          })}
        </div>
        <div
          className=""
          style={{
            margin: "0vw 0vw 0vw -0vw",
            width: "41vw",
            height: "43.4vw",
          }}
        >
          {" "}
          {/* Right column */}
          <div
            className="display-horisontal"
            style={{ "margin-bottom": "1vw" }}
          >
            {" "}
            {/* Top Line */}
            <div>
              {" "}
              {/* Initiative */}
              <div className="centre-content">Initiative</div>
              <div
                className="fun-small-border"
                style={{
                  margin: "0vw 1.25vw 0vw 1.25vw",
                  width: "5vw",
                  height: "4vw",
                }}
              >{(() => {
                const modifier = getModifier(item.dexterity);
                return modifier >= 0 ? `+${modifier}` : `${modifier}`;
            })()}</div>
            </div>
            <div
              className="fun-small-border"
              style={{
                margin: "0vw 0.5vw 0vw 0.6vw",
                width: "7.7vw",
                height: "6vw",
              }}
            >
              {" "}
              {/* AC */}
              <div>ARMOUR</div>
              <div></div>
              <div>CLASS</div>
            </div>
            <div
              className="fun-small-border"
              style={{
                margin: "0vw 0vw 0vw -0vw",
                width: "27vw",
                height: "6vw",
              }}
            >
              {" "}
              {/* Defenses / Conditions */}
            </div>
          </div>
          <div
            className="fun-small-border"
            style={{
              margin: "0vw 0vw 0vw -0vw",
              width: "41vw",
              height: "36.3vw",
            }}
          >
            {" "}
            {/* Bottom Block */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowComponent;
