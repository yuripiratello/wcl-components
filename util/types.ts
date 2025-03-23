import { RpgLogs } from "../definitions/RpgLogs";

type PlayerDeath = {
  fightId: number;
  player: string;
  ability: RpgLogs.Ability | string;
  timestamp: string;
  defensiveCasts: string;
  availableDefensives: string;
  unavailableDefensives: string;
};

type FightDeaths = {
  fightId: number;
  deaths: PlayerDeath[];
};

type FightsWithDeathEvents = {
  fight: RpgLogs.Fight;
  deaths: RpgLogs.DeathEvent[];
};

type DefensiveStatus = {
  ability:
    | RpgLogs.Ability
    | {
        id: number;
        name: string;
        type: number;
        icon: string;
        isExcludedFromDamageAndHealing: boolean;
        isOffGcd: boolean;
        isMelee: boolean;
        isStaggerAbsorb: boolean;
        isStaggerDamage: boolean;
        isStaggerDmaage: boolean;
      };
  lastUsed: number | null;
  available: boolean;
  cooldown: number;
};

export { PlayerDeath, FightDeaths, FightsWithDeathEvents, DefensiveStatus };
