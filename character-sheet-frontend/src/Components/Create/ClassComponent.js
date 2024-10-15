import React, { useState } from 'react';
import classes from './ClassInfo';

function ClassComponent(){
    const classNames = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']
    const [selectedClass, setSelectedClass] = useState(null);
    const [expandedAbility, setExpandedAbility] = useState(null);


    const openDialog = (className) => {
        setSelectedClass(className);
        setExpandedAbility(null); // Reset expanded state when opening a new class
    };

    const closeDialog = () => {
        setSelectedClass(null);
    };
    const toggleAbility = (index) => {
        setExpandedAbility(expandedAbility === index ? null : index); // Toggle the ability's expanded state
    };

    const selectedClassInfo = classes.find(c => c.Name === selectedClass)

    return(
        <div>
            <h3>
                Choose a Class
            </h3>
            <div>
                {classNames.map((className, index) => (
                    <div key={index} className="class-item pointer" onClick={() => openDialog(className)}>
                    <span>{className}</span>
                </div>
                ))}
            </div>
            {selectedClass && (
                
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div>
                                <h4>{selectedClass}</h4>
                                <p><i>{classes.find(c => c.Name === selectedClass)?.Tagline}</i></p>
                                <p>{classes.find(c => c.Name === selectedClass)?.Description}</p>
                                <p>
                                    <div><b>Hit Die: </b>{selectedClassInfo.Hit_Die}</div>
                                    <div><b>Primary Ability: </b>{selectedClassInfo.Primary_Ability}</div>
                                    <div><b>Saves: </b>{selectedClassInfo.Saves}</div>
                                </p>
                            </div>
                            <div>
                                {selectedClassInfo?.Abilities.map((ability, index) => (
                                    <div key={index}>
                                        <h5>Level {1 + index}</h5>

                                        {ability[Object.keys(ability)[0]].map((abilityDetail, idx) => (
                                            <div key={idx}>
                                                <div
                                                    onClick={() => toggleAbility(`${index}-${idx}`)}
                                                    class="classAbility pointer"
                                                >
                                                    <b>{abilityDetail.Name}</b>
                                                </div>
                                                
                                                {expandedAbility === `${index}-${idx}` && (
                                                    <div >
                                                        {Array.isArray(abilityDetail.Description) ? (
                                                            abilityDetail.Description.map((desc, i) => (
                                                                <div key={i}>
                                                                    {desc.Type ? <b>{desc.Type}: </b> : null}
                                                                    {desc.Selected || desc.Text || desc.List?.join(", ")}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div>{abilityDetail.Description}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeDialog}>Close</button>
                            <button onClick="">Add Class</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ClassComponent;