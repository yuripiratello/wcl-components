import { DefensiveStatus, FightsWithDeathEvents } from "./types";

import type { RpgLogs } from "../definitions/RpgLogs";
import getAbilityInstanceById from "./getAbilityInstanceById";
import { getClassDefensives } from "./getDefensive";

// Configuration constants
export const CONFIG = {
  CHECK_BY_LAST_10_SECONDS: false,
  MAX_DEATHS_COUNT: eventFilters.deathsCutoff || 5,
  LAST_SECONDS_THRESHOLD: 10000, // 10 seconds in ms
} as const;

// Returns an array of fights with death events
export const getDeathByFights = (
  fights: RpgLogs.Fight[]
): FightsWithDeathEvents[] =>
  fights.map((fight) => ({
    fight,
    deaths: fight.friendlyPlayerDeathEvents.slice(0, CONFIG.MAX_DEATHS_COUNT),
  }));

// Gets active defensive buffs at the time of death
export const getActiveBuffs = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent,
  playerSpec: string
): RpgLogs.ApplyBuffOrDebuffEvent[] => {
  if (!playerDeath.target) return [];

  const defensives = getClassDefensives(playerDeath.target.subType, playerSpec);
  const defensiveIds = defensives.map((d) => d.spellId);

  // Track buff stacks
  const buffStacks: { [key: number]: number } = {};

  // Get all buff events before death with a small buffer window
  const BUFFER_WINDOW = 500; // 500ms buffer for event timing
  const allBuffEvents = fight
    .eventsByCategoryAndDisposition("aurasGained", "friendly")
    .filter(
      (event) =>
        event.target?.id === playerDeath.target?.id &&
        // For removebuff events, add a buffer window to account for concurrency
        (event.type === "removebuff" || event.type === "removebuffstack"
          ? event.timestamp <= playerDeath.timestamp + BUFFER_WINDOW
          : event.timestamp <= playerDeath.timestamp) &&
        event.ability &&
        defensiveIds.includes(event.ability.id)
    );

  // Process events chronologically to track buff stacks
  allBuffEvents.sort((a, b) => a.timestamp - b.timestamp);

  for (const event of allBuffEvents) {
    if (!event.ability?.id) continue;

    const spellId = event.ability.id;

    // Only process removebuff events if they're not within the buffer window
    if (event.type === "removebuff" || event.type === "removebuffstack") {
      if (event.timestamp > playerDeath.timestamp + BUFFER_WINDOW) {
        continue; // Skip removal events that are too far after death
      }
      if (Math.abs(event.timestamp - playerDeath.timestamp) <= BUFFER_WINDOW) {
        continue; // Skip removal events that are too close to death
      }
    }

    if (event.type === "applybuff") {
      buffStacks[spellId] = 1;
    } else if (event.type === "applybuffstack") {
      buffStacks[spellId] = (buffStacks[spellId] || 0) + 1;
    } else if (event.type === "removebuffstack") {
      buffStacks[spellId] = Math.max(0, (buffStacks[spellId] || 0) - 1);
    } else if (event.type === "removebuff") {
      buffStacks[spellId] = 0;
    }
  }

  // Get the most recent application of each active buff
  const activeBuffs = allBuffEvents
    .filter(
      (event) =>
        event.ability?.id &&
        buffStacks[event.ability.id] > 0 &&
        (event.type === "applybuff" || event.type === "applybuffstack")
    )
    .reduce((acc, event) => {
      if (!event.ability?.id) return acc;

      const existing = acc.find((e) => e.ability?.id === event.ability?.id);
      if (!existing || event.timestamp > existing.timestamp) {
        // Replace or add the most recent application
        if (existing) {
          acc.splice(acc.indexOf(existing), 1);
        }
        acc.push(event as RpgLogs.ApplyBuffOrDebuffEvent);
      }
      return acc;
    }, [] as RpgLogs.ApplyBuffOrDebuffEvent[]);

  return activeBuffs;
};

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
