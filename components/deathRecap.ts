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

const CHECK_ONLY_ONE_FIGHT = true;
const CHECK_BY_LAST_10_SECONDS = false;
const MAX_DEATHS_COUNT = 5;
const LAST_SECONDS_THRESHOLD = 10000; // 10 seconds in ms

// Returns a formatted ability description with optional time and wipe markup.
const getAbilityDescription = (
  ability: RpgLogs.Ability | null,
  startFightTime: number,
  abilityEvent?: RpgLogs.AnyEvent,
  deathTime?: number
): string => {
  if (!ability) return "Unknown (Fall)";

  const skillTime = abilityEvent
    ? `[${formatTimestamp(startFightTime, abilityEvent.timestamp)}]`
    : "";

  // If death time or ability event is missing, simply return the ability markdown.
  if (!deathTime || !abilityEvent) {
    return `${skillTime} ${getAbilityMarkdown(ability)}`;
  }

  // If the ability was cast well before the death (outside the threshold), show normally.
  if (deathTime - LAST_SECONDS_THRESHOLD > abilityEvent.timestamp) {
    return `${skillTime} ${getAbilityMarkdown(ability)}`;
  }

  // Otherwise mark it as a wipe (ability used too close to death).
  return `<Wipe>${skillTime}</Wipe> ${getAbilityMarkdown(ability)}`;
};

// Pads a number with leading zeros.
const pad = (num: number, size: number): string => {
  return num.toString().padStart(size, "0");
};

// Formats a timestamp relative to the start of the fight.
const formatTimestamp = (startFightTime: number, eventTime: number): string => {
  const diffTime = eventTime - startFightTime;
  const minutes = Math.floor(diffTime / 60000);
  const seconds = Math.floor((diffTime % 60000) / 1000);
  const milliseconds = diffTime % 1000;
  return `${minutes}:${pad(seconds, 2)}.${milliseconds}`;
};

// Returns an array of fights with a limited number of death events per fight.
const getDeathByFights = (fights: RpgLogs.Fight[]): FightsWithDeathEvents[] =>
  fights.map((fight) => ({
    fight,
    deaths: fight.friendlyPlayerDeathEvents.slice(
      0,
      Math.min(fight.friendlyPlayerDeathEvents.length, MAX_DEATHS_COUNT)
    ),
  }));

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
    );

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
  playerSpec: string
) => {
  const statuses = getDefensiveStatuses(fight, playerDeath, playerSpec);

  const usedDefensives = statuses
    .filter((status) => status.lastUsed !== null)
    .map((status) =>
      getAbilityDescription(
        status.ability,
        fight.startTime,
        { timestamp: status.lastUsed! } as RpgLogs.AnyEvent,
        playerDeath.timestamp
      )
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

// Main component function.
export default getComponent = ():
  | RpgLogs.TableComponent
  | RpgLogs.EnhancedMarkdownComponent => {
  // Ensure a single fight is selected.
  if (CHECK_ONLY_ONE_FIGHT && reportGroup.fights.length !== 1) {
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
    const deaths: PlayerDeath[] = fightWithDeaths.deaths.reduce(
      (playerDeaths, playerDeath) => {
        if (!playerDeath.target) return playerDeaths;

        const playerSpec = fightWithDeaths.fight.specForPlayer(
          playerDeath.target
        );
        const defensiveInfo = getDefensiveCasts(
          fightWithDeaths.fight,
          playerDeath,
          playerSpec
        );
        const formattedDeathTime = formatTimestamp(
          fightWithDeaths.fight.startTime,
          playerDeath.timestamp
        );

        playerDeaths.push({
          fightId: fightWithDeaths.fight.id,
          player: getPlayerMarkdown(playerDeath.target, playerSpec),
          ability: getAbilityDescription(
            playerDeath.killingAbility,
            fightWithDeaths.fight.startTime
          ),
          timestamp: formattedDeathTime,
          defensiveCasts:
            defensiveInfo.usedDefensives.length > 0
              ? defensiveInfo.usedDefensives.join("<br>")
              : `<Wipe>No defensives${
                  CHECK_BY_LAST_10_SECONDS
                    ? " between death and last 10 seconds"
                    : " the entire fight!!"
                }</Wipe>`,
          availableDefensives:
            defensiveInfo.availableDefensives.length > 0
              ? defensiveInfo.availableDefensives.join("<br>")
              : "<Wipe>No defensives available</Wipe>",
          unavailableDefensives:
            defensiveInfo.unavailableDefensives.length > 0
              ? defensiveInfo.unavailableDefensives.join("<br>")
              : "<Wipe>No defensives on cooldown</Wipe>",
        });
        return playerDeaths;
      },
      [] as PlayerDeath[]
    );

    return {
      fightId: fightWithDeaths.fight.id,
      deaths,
    };
  });

  // Flatten the data to include a header row per fight.
  const flatSeriesData = seriesData.flatMap((fightDeaths) => [
    {
      fightId: fightDeaths.fightId,
      player: fightDeaths.fightId,
      ability: fightDeaths.fightId,
      timestamp: fightDeaths.fightId,
      defensiveCasts: fightDeaths.fightId,
      availableDefensives: fightDeaths.fightId,
      unavailableDefensives: fightDeaths.fightId,
    },
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
          columns: {
            fightId: { header: "Fight ID" },
            player: { header: "Player" },
            ability: { header: "Ability" },
            timestamp: { header: "Death Time", textAlign: "right" },
            defensiveCasts: { header: "Defensive Casts" },
            availableDefensives: { header: "Available Defensives" },
            unavailableDefensives: { header: "Unavailable Defensives" },
          },
        },
      },
      data: flatSeriesData,
    },
  } as RpgLogs.TableComponent;
};
