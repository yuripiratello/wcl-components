import {
  DefensiveStatus,
  FightDeaths,
  FightsWithDeathEvents,
  PlayerDeath,
} from "../util/types";

import type { RpgLogs } from "../definitions/RpgLogs";
import getAbilityInstanceById from "../util/getAbilityInstanceById";
import getAbilityMarkdown from "../util/getAbilityMarkdown";
import { getClassDefensives } from "../util/getDefensive";
import getPlayerMarkdown from "../util/getPlayerMarkdown";

// Configuration constants
const CONFIG = {
  CHECK_ONLY_ONE_FIGHT: false,
  CHECK_BY_LAST_10_SECONDS: false,
  MAX_DEATHS_COUNT: 5,
  LAST_SECONDS_THRESHOLD: 10000, // 10 seconds in ms
} as const;

// Column definitions for the death recap table
const TABLE_COLUMNS = {
  fightId: { header: "Fight ID" },
  player: { header: "Player" },
  ability: { header: "Ability" },
  timestamp: { header: "Death Time", textAlign: "right" },
  defensiveCasts: { header: "Defensive Cast" },
  availableDefensives: { header: "Available Defensives" },
  unavailableDefensives: { header: "Unavailable Defensives" },
  resurrected: { header: "Resurrected", textAlign: "center" },
} as const;

interface AbilityDescriptionOptions {
  ability: RpgLogs.Ability | null;
  startFightTime: number;
  abilityEvent?: RpgLogs.AnyEvent;
  deathTime?: number;
  resurrected?: boolean;
}

// Returns a formatted ability description with optional time and wipe markup.
const getAbilityDescription = ({
  ability,
  startFightTime,
  abilityEvent,
  deathTime,
  resurrected,
}: AbilityDescriptionOptions): string => {
  if (!ability) return "Unknown (Fall)";

  const skillTime = abilityEvent
    ? `[${TimeUtils.formatTimestamp(startFightTime, abilityEvent.timestamp)}]`
    : "";

  // Return early if we can't determine timing
  if (!deathTime || !abilityEvent) {
    return formatAbilityWithTime(skillTime, ability);
  }

  // Determine if the ability should be marked as a wipe
  const shouldMarkAsWipe =
    !resurrected &&
    deathTime - CONFIG.LAST_SECONDS_THRESHOLD <= abilityEvent.timestamp &&
    abilityEvent.timestamp <= deathTime;

  return shouldMarkAsWipe
    ? `<Wipe>${skillTime}</Wipe> ${getAbilityMarkdown(ability)}`
    : formatAbilityWithTime(skillTime, ability);
};

// Helper function to format ability with timestamp
const formatAbilityWithTime = (skillTime: string, ability: RpgLogs.Ability): string => {
  return `${skillTime} ${getAbilityMarkdown(ability)}`;
};

// Time formatting utilities
const TimeUtils = {
  // Pads a number with leading zeros
  pad: (num: number, size: number): string => {
    return num.toString().padStart(size, "0");
  },

  // Formats milliseconds into a readable duration
  formatDuration: (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    return `${minutes}:${TimeUtils.pad(seconds, 2)}.${milliseconds}`;
  },

  // Formats a timestamp relative to the start of the fight
  formatTimestamp: (startFightTime: number, eventTime: number): string => {
    return TimeUtils.formatDuration(eventTime - startFightTime);
  },
};

// Returns an array of fights with a limited number of death events per fight.
const getDeathByFights = (fights: RpgLogs.Fight[]): FightsWithDeathEvents[] =>
  fights.map((fight) => ({
    fight,
    deaths: fight.friendlyPlayerDeathEvents.slice(
      0,
      Math.min(fight.friendlyPlayerDeathEvents.length, CONFIG.MAX_DEATHS_COUNT)
    ),
  }));

// Checks if a player was resurrected after death
const getResurrectionInfo = (fight: RpgLogs.Fight, playerDeath: RpgLogs.DeathEvent) => {
  const resEvent = fight
    .eventsByCategoryAndDisposition("combatResurrects", "friendly")
    .find(
      (event) =>
        event.timestamp > playerDeath.timestamp &&
        event.target?.id === playerDeath.target?.id
    );

  return {
    wasResurrected: !!resEvent,
    text: resEvent
      ? `<Kill>Yes [${TimeUtils.formatTimestamp(
          fight.startTime,
          resEvent.timestamp
        )}]</Kill>`
      : `<Wipe>No</Wipe>`,
    event: resEvent,
  };
};

// Computes the status of each defensive ability for a given death event.
const getDefensiveStatuses = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent,
  playerSpec: string
): DefensiveStatus[] => {
  if (!playerDeath.target?.subType) return [];

  const allDefensives = getClassDefensives(
    playerDeath.target.subType,
    playerSpec
  );

  // Filter for casts by this player that match any defensive ability.
  const defensiveCasts = fight
    .eventsByCategoryAndDisposition("casts", "friendly")
    .filter((castEvent) => castEvent.source?.id === playerDeath.target!.id)
    .filter(
      (castEvent) =>
        castEvent.ability &&
        allDefensives.some((def) => def.spellId === castEvent.ability!.id)
    )
    .filter((castEvent) => castEvent.timestamp <= playerDeath.timestamp)
    .sort((a, b) => b.timestamp - a.timestamp);

  return allDefensives.map((defensive) => {
    // Find casts for the current defensive ability, sorted with the most recent first.
    const casts = defensiveCasts
      .filter((cast) => cast.ability?.id === defensive.spellId)
      .sort((a, b) => b.timestamp - a.timestamp);

    const lastCast = casts[0];
    const secondLastCast = casts[1];
    const lastUsed = lastCast ? lastCast.timestamp : null;

    let available = false;
    if (!lastUsed) {
      available = true; // Never used, so it's available.
    } else if (defensive.charges) {
      // For abilities with charges.
      if (!secondLastCast) {
        available = playerDeath.timestamp - lastUsed > defensive.baseCd;
      } else {
        const remainingFirstCharge =
          defensive.baseCd - (playerDeath.timestamp - secondLastCast.timestamp);
        const remainingSecondCharge =
          defensive.baseCd - (playerDeath.timestamp - lastCast.timestamp);
        available = remainingFirstCharge <= 0 || remainingSecondCharge <= 0;
      }
    } else {
      // Standard cooldown check.
      available = playerDeath.timestamp - lastUsed > defensive.baseCd;
    }

    return {
      ability: lastCast?.ability ||
        getAbilityInstanceById(defensive.spellId) || {
          id: defensive.spellId,
          name: defensive.name
            ? `${defensive.name} [Never used]`
            : "Unknown (Fall?)",
          type: 0,
          icon: "",
          isExcludedFromDamageAndHealing: false,
          isOffGcd: false,
          isMelee: false,
          isStaggerAbsorb: false,
          isStaggerDamage: false,
          isStaggerDmaage: false,
        },
      lastUsed,
      available,
      cooldown: defensive.baseCd,
    };
  });
};

// Computes the defensive casts details for a given death event.
const getDefensiveCasts = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent,
  playerSpec: string,
  resurrected: boolean
) => {
  const statuses = getDefensiveStatuses(fight, playerDeath, playerSpec);

  const usedDefensives = statuses
    .filter((status) => status.lastUsed !== null)
    .map((status) =>
      getAbilityDescription({
        ability: status.ability,
        startFightTime: fight.startTime,
        abilityEvent: { timestamp: status.lastUsed! } as RpgLogs.AnyEvent,
        deathTime: playerDeath.timestamp,
        resurrected
      })
    );

  const availableDefensives = statuses
    .filter((status) => status.available)
    .map((status) => `<Kill>${getAbilityMarkdown(status.ability)}</Kill>`);

  const unavailableDefensives = statuses
    .filter((status) => !status.available && status.lastUsed)
    .map((status) => {
      const remainingCd = Math.round(
        (status.cooldown - (playerDeath.timestamp - status.lastUsed!)) / 1000
      );
      return `<Wipe>${getAbilityMarkdown(
        status.ability
      )} (${remainingCd}s)</Wipe>`;
    });

  return {
    usedDefensives,
    availableDefensives,
    unavailableDefensives,
  };
};

// Processes a single death event and returns a PlayerDeath record
const processDeathEvent = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent,
  playerSpec: string
): PlayerDeath | null => {
  if (!playerDeath.target) return null;

  // Get resurrection information
  const resInfo = getResurrectionInfo(fight, playerDeath);

  // Get defensive cast information
  const defensiveInfo = getDefensiveCasts(
    fight,
    playerDeath,
    playerSpec,
    resInfo.wasResurrected
  );

  return {
    fightId: fight.id,
    player: getPlayerMarkdown(playerDeath.target, playerSpec),
    ability: getAbilityDescription({
      ability: playerDeath.killingAbility,
      startFightTime: fight.startTime,
    }),
    timestamp: TimeUtils.formatTimestamp(fight.startTime, playerDeath.timestamp),
    defensiveCasts: formatDefensivesList(
      defensiveInfo.usedDefensives,
      `<Wipe>No defensives${CONFIG.CHECK_BY_LAST_10_SECONDS
        ? " between death and last 10 seconds"
        : " the entire fight!!"}</Wipe>`
    ),
    availableDefensives: formatDefensivesList(
      defensiveInfo.availableDefensives,
      "<Wipe>No defensives available</Wipe>"
    ),
    unavailableDefensives: formatDefensivesList(
      defensiveInfo.unavailableDefensives,
      "<Wipe>No defensives on cooldown</Wipe>"
    ),
    resurrected: resInfo.text,
  };
};

// Helper function to format a list of defensives
const formatDefensivesList = (list: string[], emptyMessage: string): string => {
  return list.length > 0 ? list.join("<br>") : emptyMessage;
};

// Main component function.
export default getComponent = ():
  | RpgLogs.TableComponent
  | RpgLogs.EnhancedMarkdownComponent => {
  // Ensure a single fight is selected.
  if (CONFIG.CHECK_ONLY_ONE_FIGHT && reportGroup.fights.length !== 1) {
    return {
      component: "EnhancedMarkdown",
      props: {
        content: "Please select a single fight to check death recap.",
      },
    };
  }

  const deathByFights = getDeathByFights(reportGroup.fights);

  // Build table data rows.
  const seriesData: FightDeaths[] = deathByFights.map((fightWithDeaths) => {
    const deaths: PlayerDeath[] = fightWithDeaths.deaths
      .map((death) =>
        processDeathEvent(
          fightWithDeaths.fight,
          death,
          fightWithDeaths.fight.specForPlayer(death.target!)
        )
      )
      .filter((death): death is PlayerDeath => death !== null);

    return {
      fightId: fightWithDeaths.fight.id,
      deaths,
    };
  });

  // Create header rows and flatten the data
  const flatSeriesData = seriesData.flatMap((fightDeaths) => [
    // Header row for each fight
    createHeaderRow(fightDeaths.fightId),
    ...fightDeaths.deaths,
  ]);

  return {
    component: "Table",
    props: {
      columns: {
        title: {
          header: "Death Recap",
          textAlign: "center",
          colSpan: 5,
          columns: TABLE_COLUMNS,
        },
      },
      data: flatSeriesData,
    },
  } as RpgLogs.TableComponent;
};

// Helper function to create a header row
const createHeaderRow = (fightId: number): PlayerDeath => ({
  fightId,
  player: fightId.toString(),
  ability: fightId.toString(),
  timestamp: fightId.toString(),
  defensiveCasts: fightId.toString(),
  availableDefensives: fightId.toString(),
  unavailableDefensives: fightId.toString(),
  resurrected: fightId.toString(),
});
