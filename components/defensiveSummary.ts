import { getDeathByFights, getDefensiveStatuses } from "../util/deathUtils";

import type { RpgLogs } from "../definitions/RpgLogs";
import { TimeUtils } from "../util/timeUtils";
import getPlayerMarkdown from "../util/getPlayerMarkdown";

// Column definitions for the defensive summary table
const TABLE_COLUMNS = {
  player: { header: "Player" },
  deathsWithDefensives: {
    header: "Deaths with Available Defensives",
    textAlign: "right",
  },
  totalDeaths: { header: "Total Deaths", textAlign: "right" },
  fightIds: { header: "Fight IDs" },
} as const;

interface PlayerSummaryData {
  player: string;
  deathsWithDefensives: number;
  totalDeaths: number;
  fightIds: Set<number>;
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
): { hadDefensives: boolean; fightId: number } | null => {
  if (!playerDeath.target) return null;

  const playerSpec = fight.specForPlayer(playerDeath.target);
  const defensiveStatuses = getDefensiveStatuses(
    fight,
    playerDeath,
    playerSpec
  );

  return {
    hadDefensives: defensiveStatuses.some((status) => status.available),
    fightId: fight.id,
  };
};

// Main component function
export default getComponent = (): RpgLogs.TableComponent => {
  const deathByFights = getDeathByFights(reportGroup.fights);
  const playerSummaries = new Map<string, PlayerSummaryData>();

  // Process all deaths and build player summaries
  deathByFights.forEach(({ fight, deaths }) => {
    deaths.forEach((death) => {
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
      };

      if (result.hadDefensives) {
        summary.deathsWithDefensives++;
        summary.fightIds.add(result.fightId);
      }
      summary.totalDeaths++;

      playerSummaries.set(playerKey, summary);
    });
  });

  // Convert summaries to table data
  const tableData = Array.from(playerSummaries.values()).map((summary) => ({
    player: summary.player,
    deathsWithDefensives: summary.deathsWithDefensives,
    totalDeaths: summary.totalDeaths,
    fightIds: Array.from(summary.fightIds).join(", "),
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
