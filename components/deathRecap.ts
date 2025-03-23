import { FightDeaths, FightsWithDeathEvents, PlayerDeath } from "../util/types";

import type { RpgLogs } from "../definitions/RpgLogs";
import getAbilityInstanceById from "../util/getAbilityInstanceById";
import getAbilityMarkdown from "../util/getAbilityMarkdown";
import { getClassDefensives } from "../util/getDefensive";

const CHECK_BY_LAST_10_SECONDS = false;
const DEFAULT_CUT_ON_DEATHS = 3;

const getAbilityDescription = (
  ability: RpgLogs.Ability | null,
  startFightTime: number,
  abilityEvent?: RpgLogs.AnyEvent,
  deathTime?: number
): string => {
  if (ability === null) {
    return "Unknown (Fall)";
  }
  const skillTime = abilityEvent
    ? `[${formatTimestamp(startFightTime, abilityEvent.timestamp)}]`
    : "";
  if (!deathTime) return `${skillTime} ${getAbilityMarkdown(ability)}`;
  if (!abilityEvent) return `${skillTime} ${getAbilityMarkdown(ability)}`;
  if (deathTime - 10000 > abilityEvent.timestamp)
    return `${skillTime} ${getAbilityMarkdown(ability)}`;
  return `<Wipe>${skillTime}</Wipe> ${getAbilityMarkdown(ability)}`;
};

const getPlayerIcon = (player: RpgLogs.Actor, spec: string): string => {
  return `<ActorIcon type="${player.subType}-${spec}">${player.name}</ActorIcon>`;
};

const isDefensive = (
  castEv: RpgLogs.AnyEvent,
  deathEv: RpgLogs.DeathEvent,
  playerSpec: string
): { ability: RpgLogs.Ability; event: RpgLogs.AnyEvent } | null => {
  if (castEv.ability == null) return null;
  if (castEv.source == null) return null;
  const playerDefensives = getClassDefensives(
    castEv.source.subType,
    playerSpec
  );
  if (!playerDefensives) return null;
  const defensiveAbilitiesIds = playerDefensives.map(
    (defensive) => defensive.spellId
  );
  const isDefensive = defensiveAbilitiesIds.includes(castEv.ability.id);
  // Check if the cast is a defensive
  if (!isDefensive) return null;
  // Check if the cast happened after the death since the player can get a brez
  if (deathEv.timestamp < castEv.timestamp) return null;
  // Check if the cast happened in the last 10 seconds
  if (
    CHECK_BY_LAST_10_SECONDS &&
    (Math.abs(castEv.timestamp - deathEv.timestamp) < 10000 ||
      Math.abs(castEv.timestamp - deathEv.timestamp) < 16000)
  ) {
    return {
      ability: castEv.ability,
      event: castEv,
    };
  } else if (!CHECK_BY_LAST_10_SECONDS) {
    return {
      ability: castEv.ability,
      event: castEv,
    };
  }
  return null;
};

const pad = (num: number, size: number) => {
  let numStr = num.toString();
  while (numStr.length < size) numStr = "0" + numStr;
  return numStr;
};

const formatTimestamp = (startFightTime: number, eventTime: number) => {
  const diffTime = eventTime - startFightTime;
  const minutes = Math.floor(diffTime / 60000);
  const seconds = Number(((diffTime % 60000) / 1000).toFixed(0));
  const miliseconds = diffTime % 1000;
  const formattedDiffTime = `${minutes}:${pad(seconds, 2)}:${miliseconds}`;
  return formattedDiffTime;
};

const getDeathByFights = (fights: RpgLogs.Fight[]): FightsWithDeathEvents[] => {
  const fightsWithDeaths = fights.flatMap((fight) => {
    const CUT_ON_DEATHS =
      fight.friendlyPlayerDeathEvents.length > DEFAULT_CUT_ON_DEATHS
        ? DEFAULT_CUT_ON_DEATHS
        : fight.friendlyPlayerDeathEvents.length;
    const deaths = fight.friendlyPlayerDeathEvents.slice(0, CUT_ON_DEATHS);
    return {
      fight: fight,
      deaths: deaths,
    } as FightsWithDeathEvents;
  });
  return fightsWithDeaths;
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

const getDefensiveStatuses = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent,
  playerSpec: string
): DefensiveStatus[] => {
  if (!playerDeath.target?.subType) return [];

  // Get all available defensives for the class/spec
  const allDefensives = getClassDefensives(
    playerDeath.target.subType,
    playerSpec
  );

  // Get all defensive casts by the player
  const defensiveCasts = fight
    .eventsByCategoryAndDisposition("casts", "friendly")
    .filter((castEvent) => {
      if (castEvent.source == null) return false;
      return playerDeath.target?.id === castEvent.source.id;
    })
    .filter((castEvent) => {
      if (!castEvent.ability) return false;
      return allDefensives.some((def) => def.spellId === castEvent.ability?.id);
    });

  // Create status for each defensive
  return allDefensives.map((defensive) => {
    const lastCast = defensiveCasts
      .filter((cast) => cast.ability?.id === defensive.spellId)
      .sort((a, b) => b.timestamp - a.timestamp)[0];

    const lastUsed = lastCast ? lastCast.timestamp : null;
    const available =
      !lastUsed || playerDeath.timestamp - lastUsed > defensive.baseCd;

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

const getDefensiveCasts = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent,
  playerSpec: string
) => {
  const defensiveStatuses = getDefensiveStatuses(
    fight,
    playerDeath,
    playerSpec
  );

  const usedDefensives = defensiveStatuses
    .filter((status) => status.lastUsed !== null)
    .map((status) => {
      return getAbilityDescription(
        status.ability,
        fight.startTime,
        { timestamp: status.lastUsed! } as RpgLogs.AnyEvent,
        playerDeath.timestamp
      );
    });

  const availableDefensives = defensiveStatuses
    .filter((status) => status.available)
    .map((status) => `<Kill>${getAbilityMarkdown(status.ability)}</Kill>`);

  const unavailableDefensives = defensiveStatuses
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

export default getComponent = () => {
  const deathByFights = getDeathByFights(reportGroup.fights);

  // Get series data
  const seriesData = deathByFights.reduce((fightDeaths, fightWithDeaths) => {
    // Get deaths for each fight
    const deaths = fightWithDeaths.deaths.reduce(
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

        const startFightTime = fightWithDeaths.fight.startTime;
        const formattedDeathTime = formatTimestamp(
          startFightTime,
          playerDeath.timestamp
        );

        playerDeaths.push({
          fightId: fightWithDeaths.fight.id,
          player: playerDeath.target
            ? getPlayerIcon(playerDeath.target, playerSpec)
            : "Unknown",
          ability: getAbilityDescription(
            playerDeath.killingAbility,
            startFightTime
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
    fightDeaths.push({
      fightId: fightWithDeaths.fight.id,
      deaths: deaths,
    });
    return fightDeaths;
  }, [] as FightDeaths[]);

  const flatSeriesData = seriesData.flatMap((fightDeaths) => {
    return [
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
    ];
  });

  return {
    component: "Table",
    props: {
      columns: {
        title: {
          header: "Death Recap",
          textAlign: "center",
          colSpan: 5,
          columns: {
            fightId: {
              header: "Fight ID",
            },
            player: {
              header: "Player",
            },
            ability: {
              header: "Ability",
            },
            timestamp: {
              header: "Death Time",
              textAlign: "right",
            },
            defensiveCasts: {
              header: "Defensive Casts",
            },
            availableDefensives: {
              header: "Available Defensives",
            },
            unavailableDefensives: {
              header: "Unavailable Defensives",
            },
          },
        },
      },
      data: flatSeriesData,
    },
  } as RpgLogs.TableComponent;
};
