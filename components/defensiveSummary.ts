import {
  CONFIG,
  getActiveBuffs,
  getDeathByFights,
  getDefensiveStatuses,
} from "../util/deathUtils";

import type { RpgLogs } from "../definitions/RpgLogs";
import { TimeUtils } from "../util/timeUtils";
import getAbilityMarkdown from "../util/getAbilityMarkdown";
import getPlayerMarkdown from "../util/getPlayerMarkdown";

// Column definitions for the defensive summary table
const TABLE_COLUMNS = {
  player: { header: "Player" },
  deathsWithDefensives: {
    header: "Deaths with Unused Available Defensives",
    textAlign: "right",
  },
  totalDeaths: { header: "Total Deaths", textAlign: "right" },
  fightIds: { header: "Fight IDs" },
  killingAbilities: { header: "Killed By" },
} as const;

interface KillingAbilityInfo {
  abilityId: number;
  abilityName: string;
  fightIds: Set<number>;
}

interface PlayerSummaryData {
  player: string;
  deathsWithDefensives: number;
  totalDeaths: number;
  fightIds: Set<number>;
  killingAbilities: Map<number, KillingAbilityInfo>;
}

interface PlayerSummary {
  player: string;
  deathsWithDefensives: number;
  totalDeaths: number;
  fightIds: string;
}

// Process a single death event and check for available defensives
const processDeathEvent = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent
): {
  hadAvailableDefensivesButDidntUse: boolean;
  fightId: number;
  killingAbility: RpgLogs.Ability | null;
} | null => {
  if (!playerDeath.target) return null;

  const playerSpec = fight.specForPlayer(playerDeath.target);
  const defensiveStatuses = getDefensiveStatuses(
    fight,
    playerDeath,
    playerSpec
  );

  // Get active buffs at time of death
  const activeBuffs = getActiveBuffs(fight, playerDeath, playerSpec);
  const activeDefensiveIds = new Set(
    activeBuffs
      .map((buff: RpgLogs.ApplyBuffOrDebuffEvent) => buff.ability?.id)
      .filter(Boolean)
  );

  // Check if player had available defensives but didn't use any
  const hasAvailableDefensives = defensiveStatuses.some(
    (status) => status.available
  );
  const usedSomeDefensive = defensiveStatuses.some(
    (status) => !status.available && activeDefensiveIds.has(status.ability.id)
  );

  return {
    hadAvailableDefensivesButDidntUse:
      hasAvailableDefensives && !usedSomeDefensive,
    fightId: fight.id,
    killingAbility: playerDeath.killingAbility,
  };
};

// Main component function
export default getComponent = (): RpgLogs.TableComponent => {
  const deathByFights = getDeathByFights(reportGroup.fights);
  const playerSummaries = new Map<string, PlayerSummaryData>();

  // Process all deaths and build player summaries
  deathByFights.forEach(({ fight, deaths }) => {
    // Limit deaths to CONFIG.MAX_DEATHS_COUNT
    deaths.slice(0, CONFIG.MAX_DEATHS_COUNT).forEach((death) => {
      if (!death.target) return;

      const result = processDeathEvent(fight, death);
      if (!result) return;

      const playerKey = death.target.id.toString();
      const playerName = getPlayerMarkdown(
        death.target,
        fight.specForPlayer(death.target)
      );

      const summary: PlayerSummaryData = playerSummaries.get(playerKey) || {
        player: playerName,
        deathsWithDefensives: 0,
        totalDeaths: 0,
        fightIds: new Set<number>(),
        killingAbilities: new Map<number, KillingAbilityInfo>(),
      };

      if (result.hadAvailableDefensivesButDidntUse) {
        summary.deathsWithDefensives++;
        summary.fightIds.add(result.fightId);
      }
      summary.totalDeaths++;

      // Track killing ability information
      if (result.killingAbility) {
        const abilityId = result.killingAbility.id;
        const existingAbility = summary.killingAbilities.get(abilityId) || {
          abilityId,
          abilityName: getAbilityMarkdown(result.killingAbility),
          fightIds: new Set<number>(),
        };
        existingAbility.fightIds.add(result.fightId);
        summary.killingAbilities.set(abilityId, existingAbility);
      }

      playerSummaries.set(playerKey, summary);
    });
  });

  // Convert summaries to table data
  const tableData = Array.from(playerSummaries.values()).map((summary) => ({
    player: summary.player,
    deathsWithDefensives: summary.deathsWithDefensives,
    totalDeaths: summary.totalDeaths,
    fightIds: Array.from(summary.fightIds).join(", "),
    killingAbilities: Array.from(summary.killingAbilities.values())
      .map(
        (ability) =>
          `${ability.abilityName} (${Array.from(ability.fightIds).join(", ")})`
      )
      .join("<br>"),
  }));

  // Sort by deaths with defensives available (descending)
  tableData.sort((a, b) => b.deathsWithDefensives - a.deathsWithDefensives);

  return {
    component: "Table",
    props: {
      columns: {
        title: {
          header: "Deaths with Available Defensives Summary",
          textAlign: "center",
          colSpan: 4,
          columns: TABLE_COLUMNS,
        },
      },
      data: tableData,
    },
  } as RpgLogs.TableComponent;
};
