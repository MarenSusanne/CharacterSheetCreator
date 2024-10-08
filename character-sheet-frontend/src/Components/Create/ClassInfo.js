const classes = [
    {
        Name: "Barbarian",
        Tagline: "A Fierce Warrior of Primal Rage",
        Description: "Barbarians are mighty warriors who are powered by primal forces of the multiverse that manifest as a Rage.",
        Hit_Die: "d12",
        Primary_Ability: "Strength",
        Saves: "Strength & Constitution",
        Abilities: [
            {Level_1: [
                {
                    Name: "Proficiencies",
                    Description: [
                        {
                            Type: "Armor",
                            Selected: "Light armor, medium armor, shields",
                        },
                        {
                            Type: "Weapons",
                            Selected: "Simple weapons, martial weapons",
                        },
                        {
                            Type: "Tools",
                            Selected: "None",
                        },
                        {
                            Type: "Saving Throws",
                            Selected: "Strength, Constitution",
                        },
                        {
                            Type: "Skills",
                            Selected: "Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival",
                        },
                    ],
                },
                {
                    Name: "Hit Points",
                    Description: [
                        {
                            Type: "Hit Dice",
                            Selected: "1d12 per barbarian level",
                        },
                        {
                            Type: "Hit Points at 1st Level",
                            Selected: "12 + your Constitution modifier",
                        },
                        {
                            Type: "Hit Points at Higher Levels",
                            Selected: "1d12 (or 7) + your Constitution modifier per barbarian level after 1st",
                        }
                    ],
                },
                {
                    Name: "Equipment",
                    Description: [
                        {
                            Text: "You start with the following equipment, in addition to the equipment granted by your background:",
                            List: [
                                "(a) a greataxe or (b) any martial melee weapon", "(a) two handaxes or (b) any simple weapon", "An explorer’s pack and four javelins"
                            ]
                        },
                    ]
                },
                {
                    Name: "Rage",
                    Description: [
                        {
                            Text1: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren’t wearing heavy armor:",
                            List: [
                                "You have advantage on Strength checks and Strength saving throws.", 
                                "When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.", 
                                "You have resistance to bludgeoning, piercing, and slashing damage."
                            ],
                            Text2: "If you are able to cast spells, you can’t cast them or concentrate on them while raging." + 
                            "Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action." + 
                            "Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again."
                        },
                    ],
                },
                {
                    Name: "Unarmored Defense",
                    Description: "While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.",
                },
            ]

            },
            {Level_2: [
                {
                    Name: "Reckless Attack",
                    Description: "Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn."
                },
                {
                    Name: "Danger Sense",
                    Description: "At 2nd level, you gain an uncanny sense of when things nearby aren’t as they should be, giving you an edge when you dodge away from danger." +
                    "You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can’t be blinded, deafened, or incapacitated."
                },
            ]

            },
            {Level_3: [
                {
                    Name: "Primal Path",
                    Description: "At 3rd level, you choose a path that shapes the nature of your rage. Your choice grants you features at 3rd level and again at 6th, 10th, and 14th levels."
                },
            ]
            },
            {Level_4: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_5: [
                {
                    Name: "Extra Attack",
                    Description: "Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.",
                },
                {
                    Name: "Fast Movement",
                    Description: "Starting at 5th level, your speed increases by 10 feet while you aren’t wearing heavy armor."
                }
            ]},
            {Level_7: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_8: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_9: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_10: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_11: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_12: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_13: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_14: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_15: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_16: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_17: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_18: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_19: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
            {Level_20: [
                {
                    Name: "Ability Score Improvement",
                    Description: "When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature." + 
                    "Using the optional feats rule, you can forgo taking this feature to take a feat of your choice instead.",
                },
            ]},
        ]
    },
    {

    },

]
export default classes;