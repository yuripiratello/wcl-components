import {
  CONFIG,
  getActiveBuffs,
  getDeathByFights,
  getDefensiveStatuses,
  getResurrectionInfo,
} from "../util/deathUtils";
import { FightDeaths, PlayerDeath } from "../util/types";

import type { RpgLogs } from "../definitions/RpgLogs";
import { TimeUtils } from "../util/timeUtils";
import getAbilityMarkdown from "../util/getAbilityMarkdown";
import getPlayerMarkdown from "../util/getPlayerMarkdown";

// Column definitions for the death recap table
const TABLE_COLUMNS = {
  fightId: { header: "Fight ID" },
  player: { header: "Player" },
  ability: { header: "Ability" },
  timestamp: { header: "Death Time", textAlign: "right" },
  defensiveCasts: { header: "Defensive Cast" },
  availableDefensives: { header: "Available Defensives" },
  unavailableDefensives: { header: "Unavailable Defensives" },
  activeBuffs: { header: "Active Buffs", textAlign: "center" },
  resurrected: { header: "Resurrected", textAlign: "center" },
} as const;

// Configuration specific to death recap
const DEATH_RECAP_CONFIG = {
  CHECK_ONLY_ONE_FIGHT: false,
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
const formatAbilityWithTime = (
  skillTime: string,
  ability: RpgLogs.Ability
): string => {
  return `${skillTime} ${getAbilityMarkdown(ability)}`;
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
    .sort((a, b) => a.lastUsed! - b.lastUsed!)
    .map((status) =>
      getAbilityDescription({
        ability: status.ability,
        startFightTime: fight.startTime,
        abilityEvent: { timestamp: status.lastUsed! } as RpgLogs.AnyEvent,
        deathTime: playerDeath.timestamp,
        resurrected,
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

  // Get active buffs at time of death
  const activeBuffs = getActiveBuffs(fight, playerDeath, playerSpec);
  const activeBuffsList = activeBuffs.map(
    (event: RpgLogs.ApplyBuffOrDebuffEvent) =>
      `<Kill>${getAbilityMarkdown(event.ability!)}</Kill>`
  );

  return {
    fightId: fight.id,
    player: getPlayerMarkdown(playerDeath.target, playerSpec),
    ability: getAbilityDescription({
      ability: playerDeath.killingAbility,
      startFightTime: fight.startTime,
    }),
    timestamp: TimeUtils.formatTimestamp(
      fight.startTime,
      playerDeath.timestamp
    ),
    defensiveCasts: formatDefensivesList(
      defensiveInfo.usedDefensives,
      `<Wipe>No defensives${
        CONFIG.CHECK_BY_LAST_10_SECONDS
          ? " between death and last 10 seconds"
          : " the entire fight!!"
      }</Wipe>`
    ),
    availableDefensives: formatDefensivesList(
      defensiveInfo.availableDefensives,
      "<Wipe>No defensives available</Wipe>"
    ),
    unavailableDefensives: formatDefensivesList(
      defensiveInfo.unavailableDefensives,
      "<Wipe>No defensives on cooldown</Wipe>"
    ),
    activeBuffs: formatDefensivesList(activeBuffsList, "<Wipe>None</Wipe>"),
    resurrected: resInfo.wasResurrected
      ? `<Kill>Yes [${TimeUtils.formatTimestamp(
          fight.startTime,
          resInfo.timestamp!
        )}]</Kill>`
      : `<Wipe>No</Wipe>`,
  };
};

// Helper function to format a list of defensives
const formatDefensivesList = (list: string[], emptyMessage: string): string => {
  return list.length > 0 ? list.join("<br>") : emptyMessage;
};

// Main function to get death recap data
export const getDeathRecap = (): RpgLogs.TableComponent => {
  const component = getComponent();
  if (
    typeof component === "string" ||
    Array.isArray(component) ||
    typeof component === "number" ||
    !("component" in component)
  ) {
    throw new Error("Invalid component type");
  }
  if (component.component !== "Table") {
    throw new Error("Expected Table component");
  }
  return component;
};

// Main component function.
export default getComponent = ():
  | RpgLogs.TableComponent
  | RpgLogs.EnhancedMarkdownComponent => {
  // Ensure a single fight is selected.
  if (
    DEATH_RECAP_CONFIG.CHECK_ONLY_ONE_FIGHT &&
    reportGroup.fights.length !== 1
  ) {
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
      .map((death: RpgLogs.DeathEvent) =>
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

  const buildFlexComponentDivs = (seriesData: FightDeaths[]) => {
    const divs: any[] = [];
    seriesData.map((fightDeath) => {
      divs.push({
        data: {
          component: "Table",
          props: {
            columns: {
              title: {
                header: `Death Recap - Fight ID: ${fightDeath.fightId}`,
                textAlign: "center",
                colSpan: 5,
                columns: TABLE_COLUMNS,
              },
            },
            data: fightDeath.deaths,
          },
        },
      });
    });
    return divs;
  };

  return {
    component: "Flex",
    props: {
      direction: "column",
      gap: 8,
      divs: buildFlexComponentDivs(seriesData),
    },
  } as any;
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
  activeBuffs: fightId.toString(),
  resurrected: fightId.toString(),
});
