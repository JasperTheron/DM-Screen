import { CreatureSkills } from "./creatureSkills";
import { AbilityScores } from "./abilityScores";
import { DamageTypes } from "./damageTypes";
import { MovementTypes } from "./movementTypes";
import { Senses } from "./senses";
import { Conditions } from "./conditions";

export interface Creature{

    id: string;

    name: string;

    hp: number;

    ac: number;

    movement: MovementTypes;

    abilityScores: AbilityScores;

    proficiencies: CreatureSkills;

    savingThrows: AbilityScores;

    resistances: DamageTypes;

    damageImmunities: DamageTypes,

    conditionImmunities: Conditions,

    senses: Senses;

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