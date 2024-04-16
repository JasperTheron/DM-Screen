import { Creature } from "./creature";

const baseCreature: Creature = {
    id: '',
    name: '',
    hp: 0,
    ac: 0,
    movement: {
      walk: 30,
      burrow: 0,
      swim: 0,
      climb: 0,
      fly: 0
    },
    abilityScores: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intellegence: 10,
      wisdom: 10,
      charisma: 10

    },
    proficiencies: {
      athletics: 0,
      acrobatics: 0,
      sleightOfHand: 0,
      stealth: 0,
      arcana: 0,
      history: 0,
      investigation: 0,
      nature: 0,
      religion: 0,
      animalHandling: 0,
      insight: 0,
      medicine: 0,
      perception: 0,
      survival: 0,
      deception: 0,
      intimidation: 0,
      performance: 0,
      persuation: 0
    },
    savingThrows: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intellegence: 0,
      wisdom: 0,
      charisma: 0
    },
    resistances: {
      bludgeoning: false,
      piercing: false,
      slashing: false,
      acid: false,
      cold: false,
      lightning: false,
      poison: false,
      thunder: false,
      force: false,
      necrotic: false,
      psychic: false,
      radiant: false
    },
    damageImmunities: {
        bludgeoning: false,
        piercing: false,
        slashing: false,
        acid: false,
        cold: false,
        lightning: false,
        poison: false,
        thunder: false,
        force: false,
        necrotic: false,
        psychic: false,
        radiant: false
    },
    conditionImmunities: {
        blinded: false,
        charmed: false,
        deafened: false,
        frightened: false,
        grappled: false,
        incapacitated: false,
        invisible: false,
        paralyzed: false,
        petrified: false,
        poisoned: false,
        prone: false,
        restrained: false,
        stunned: false,
        unconscious: false,
        exhaustion: false
    },
    senses: {
      blindsight: 0,
      darkvision: 0,
      truesight: 0,
      passivePerception: 10
    },
    challengeRating: 0,
    abilities: [
      "_**Amphibious.**_ _The \"your creature\" can breathe air and water._", 
      "_**Trampling Charge.**_ _If the creature moves at least 20 feet straight toward a creature and then hits it with an attack on the same turn, that target must succeed a save of some sort, or else certain things happen._",
      "_**Two Heads.**_ _\"Your creature\" has advantage on saving throws against being blinded, deafened, stunned, or knocked unconscious._"],
    numberOfLegendaryResistances: 0,
    spellcasting: '',
    magicResisance: false,
    magicWeapons: false,
    attacks: [],
    actions: [],
    numberOfActions: '',
    numberOfLegendaryActions: 0,
    legendaryActions: [],
    lairActions: [],
    regionalEffects: [],
    thumbnailIamgeUrl: '',
    imageUrl: '',
    description: '',
};

export default baseCreature;