import { DefensiveStatus, FightsWithDeathEvents } from "./types";

import type { RpgLogs } from "../definitions/RpgLogs";
import getAbilityInstanceById from "./getAbilityInstanceById";
import { getClassDefensives } from "./getDefensive";

// Configuration constants
export const CONFIG = {
  CHECK_BY_LAST_10_SECONDS: false,
  MAX_DEATHS_COUNT: 5,
  LAST_SECONDS_THRESHOLD: 10000, // 10 seconds in ms
} as const;

// Returns an array of fights with death events
export const getDeathByFights = (
  fights: RpgLogs.Fight[]
): FightsWithDeathEvents[] =>
  fights.map((fight) => ({
    fight,
    deaths: fight.friendlyPlayerDeathEvents,
  }));

// Checks if a player was resurrected after death
export const getResurrectionInfo = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent
) => {
  const resEvent = fight
    .eventsByCategoryAndDisposition("combatResurrects", "friendly")
    .find(
      (event) =>
        event.timestamp > playerDeath.timestamp &&
        event.target?.id === playerDeath.target?.id
    );

  return {
    wasResurrected: !!resEvent,
    timestamp: resEvent?.timestamp,
    event: resEvent,
  };
};

// Computes the status of each defensive ability for a given death event.
export const getDefensiveStatuses = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent,
  playerSpec: string
): DefensiveStatus[] => {
  if (!playerDeath.target?.subType) return [];

  const allDefensives = getClassDefensives(
    playerDeath.target.subType,
    playerSpec
  );
  if (!allDefensives) return [];

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
