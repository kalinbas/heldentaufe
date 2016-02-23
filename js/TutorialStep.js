var TutorialStep = {

    SETUP_CONTACT: { ressourceKey: 'setup_contact', isSetup: true },

    SETUP_STARTPIECE: { ressourceKey: 'setup_startpiece', isSetup: true },
    SETUP_DUNGEON: { ressourceKey: 'setup_dungeon', isSetup: true },
    SETUP_TRAPS: { ressourceKey: 'setup_traps', isSetup: true },
    SETUP_TREASURE: { ressourceKey: 'setup_treasure', isSetup: true },
    SETUP_MONSTERTOKEN: { ressourceKey: 'setup_monstertoken', isSetup: true },
    SETUP_MONSTERCARDS: { ressourceKey: 'setup_monstercards', isSetup: true },
    SETUP_MONSTERTEETH: { ressourceKey: 'setup_monsterteeth', isSetup: true },
    SETUP_MONSTERHEARTS: { ressourceKey: 'setup_monsterhearts', isSetup: true },
    SETUP_PLAYERCARDS: { ressourceKey: 'setup_playercards', isSetup: true },
    SETUP_PLAYERHEARTS: { ressourceKey: 'setup_playerhearts', isSetup: true },
    SETUP_PLAYERTOKEN: { ressourceKey: 'setup_playertoken', isSetup: true },
    SETUP_MISSIONCARDS: { ressourceKey: 'setup_missioncards', isSetup: true },
    SETUP_PLAYERPOINTS: { ressourceKey: 'setup_playerpoints', isSetup: true },
    SETUP_ACTIONPOINTS: { ressourceKey: 'setup_actionpoints', isSetup: true },

    SETUP_MISSIONBUTTON: { ressourceKey: 'setup_missionbutton', isSetup: true },
    SETUP_ALCHEMY: { ressourceKey: 'setup_alchemy', isSetup: true },
    SETUP_OTHERPLAYERS: { ressourceKey: 'setup_otherplayers' },
    SETUP_GUIDE: { ressourceKey: 'setup_guide' },

    STEP_MOVEMENT: { ressourceKey: 'step_movement', noCloseButton: true },
    STEP_NOSTEPSLEFT: { ressourceKey: 'step_nostepsleft', hasTitle: true },
    STEP_MONSTERPLAYER: { ressourceKey: 'step_monsterplayer' },
    STEP_MONSTERPLAYERTURN: { ressourceKey: 'step_monsterplayerturn' },
    STEP_MONSTERPLAYERTURN2: { ressourceKey: 'step_monsterplayerturn2' },

    STEP_NEXTPLAYER: { ressourceKey: 'step_nextplayer' },
    
    STEP_LASTTILE: { ressourceKey: 'step_lasttile', hasTitle: true },

    STEP_BOOTFOUND: { ressourceKey: 'step_bootfound', hasTitle: true },
    STEP_SWORDFOUND: { ressourceKey: 'step_swordfound', hasTitle: true },
    STEP_RINGFOUND: { ressourceKey: 'step_ringfound', hasTitle: true },

    STEP_FOODAVAILABLE: { ressourceKey: 'step_foodavailable', hasTitle: true },
    STEP_POTIONAVAILABLE: { ressourceKey: 'step_potionavailable', hasTitle: true },
    STEP_MISSIONAVAILABLE: { ressourceKey: 'step_missionavailable', hasTitle: true },
    STEP_INVENTORYFULL: { ressourceKey: 'step_inventoryfull', hasTitle: true },
    
    STEP_POTIONCREATED: { ressourceKey: 'step_potioncreated', hasTitle: true },

    STEP_NOTRAP: { ressourceKey: 'step_notrap', hasTitle: true },
    
    STEP_LOSTLIFESDEF: { ressourceKey: 'step_lostlifesdef', inFront: true },
    STEP_LOSTLIFESATT: { ressourceKey: 'step_lostlifesatt', inFront: true },
    STEP_FEWLIFES: { ressourceKey: 'step_fewlifes', inFront: true },
    
    STEP_PVP: { ressourceKey: 'step_pvp' },
    STEP_ALLPVP: { ressourceKey: 'step_allpvp' },
   
    STEP_MONSTERKILLED: { ressourceKey: 'step_monsterkilled' },
    
    STEP_BERSERKER: { ressourceKey: 'step_berserker' },
    STEP_TELEPORT: { ressourceKey: 'step_teleport' },
    
    STEP_FIRSTTEETHCOLLECTED: { ressourceKey: 'step_firstteethcollected', hasTitle: true },
    STEP_TEETHCOLLECTED: { ressourceKey: 'step_teethcollected', hasTitle: true },

    STEP_LASTHEROLEAVESDUNGEON: { ressourceKey: 'step_lastheroleavesdungeon' },

    FIELD_DUNGEON: { ressourceKey: 'fields_dungeon', hasTitle: true },
    FIELD_DUNGEONEXIT: { ressourceKey: 'fields_dungeonexit', hasTitle: true },

    FIELDS: {}
};

TutorialStep.FIELDS[TileType.GRASS.name] = { ressourceKey: 'fields_grass', hasTitle: true };
TutorialStep.FIELDS[TileType.CASTLE.name] = { ressourceKey: 'fields_castle', hasTitle: true };
TutorialStep.FIELDS[TileType.TRADER.name] = { ressourceKey: 'fields_trader', hasTitle: true };
TutorialStep.FIELDS[TileType.SMITH.name] = { ressourceKey: 'fields_smith', hasTitle: true };
TutorialStep.FIELDS[TileType.APPLE.name] = { ressourceKey: 'fields_apple', hasTitle: true };
TutorialStep.FIELDS[TileType.MUSHROOM.name] = { ressourceKey: 'fields_mushroom', hasTitle: true };
TutorialStep.FIELDS[TileType.FISH.name] = { ressourceKey: 'fields_fish', hasTitle: true };

TutorialStep.FIELDS[TileType.DUNGEON1.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT1.name] = TutorialStep.FIELD_DUNGEONEXIT;
TutorialStep.FIELDS[TileType.DUNGEON2.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT2.name] = TutorialStep.FIELD_DUNGEONEXIT;
TutorialStep.FIELDS[TileType.DUNGEON3.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT3.name] = TutorialStep.FIELD_DUNGEONEXIT;
TutorialStep.FIELDS[TileType.DUNGEON4.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT4.name] = TutorialStep.FIELD_DUNGEONEXIT;
TutorialStep.FIELDS[TileType.DUNGEON5.name] = TutorialStep.FIELD_DUNGEON;
TutorialStep.FIELDS[TileType.DUNGEONEXIT5.name] = TutorialStep.FIELD_DUNGEONEXIT;

