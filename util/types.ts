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

export { PlayerDeath, FightDeaths, FightsWithDeathEvents };
