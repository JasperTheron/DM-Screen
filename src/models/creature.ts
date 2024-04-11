export interface Creature{

    id: string;

    name: string;

    hp: number;

    ac: number;

    walk: number;

    swim: number;

    climb: number;

    burrow: number;

    strength: number;

    dexterity: number;

    constitution: number;

    intellegence: number;

    wisdom: number;

    charisma: number;

    proficiencies: CreatureSkills;

    skills: CreatureStats;

    savingThrows: CreatureStats;

    resistances: DamageTypes;

    immunities: string[],

    truesight: number;

    blindsight: number;

    darkvision: number;

    challengeRating: number;

    abilities: string[];

    numberOfLegendaryResistances: number;

    spellcasting: string;

    magicResisance: boolean;

    magicWeapons: boolean;

    attacks: string[];

    actions: string[];

    numberOfActions: string;

    numberOfLegendaryActions: number;

    legendaryActions: string[];

    lairActions: string[];

    regionalEffects: string[];

    thumbnailIamgeUrl: string;

    imageUrl: string;

    description: string;

}