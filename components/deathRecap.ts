import type { RpgLogs } from "../definitions/RpgLogs";

const dpsTankCds = [
  48743, 49039, 48792, 51052, 48707, 49998, 196718, 196555, 198589, 319454,
  108238, 124974, 22812, 22842, 5487, 61336, 374227, 363916, 374348, 360827,
  186265, 109304, 264735, 388035, 414658, 45438, 55342, 110960, 414660, 342245,
  342247, 235450, 235313, 235219, 11426, 115203, 122783, 122470, 471195, 1022,
  642, 6940, 498, 403876, 184662, 108968, 15286, 19236, 586, 47585, 5277, 31224,
  185311, 1966, 198103, 108271, 108281, 108270, 104773, 108416, 452930, 6789,
  234153, 383762, 97462, 202168, 23920, 386208, 118038, 190456, 184364, 6262,
  431416,
];
const dpsHealerCds = [8936, 116670, 85673, 2061, 974, 8004];

const tankSpecs = [
  "Blood Death Knight",
  "Vengeance Demon Hunter",
  "Guardian Druid",
  "Brewmaster Monk",
  "Protection Paladin",
  "Protection Warrior",
];
const dpsSpecs = [
  // Death Knight
  "Frost Death Knight",
  "Unholy Death Knight",

  // Demon Hunter
  "Havoc Demon Hunter",

  // Druid
  "Balance Druid",
  "Feral Druid",

  // Evoker
  "Devastation Evoker",
  "Augmentation Evoker",

  // Hunter
  "Beast Mastery Hunter",
  "Marksmanship Hunter",
  "Survival Hunter",

  // Mage
  "Arcane Mage",
  "Fire Mage",
  "Frost Mage",

  // Monk
  "Windwalker Monk",

  // Paladin
  "Retribution Paladin",

  // Priest
  "Shadow Priest",

  // Rogue
  "Assassination Rogue",
  "Outlaw Rogue",
  "Subtlety Rogue",

  // Shaman
  "Elemental Shaman",
  "Enhancement Shaman",

  // Warlock
  "Affliction Warlock",
  "Demonology Warlock",
  "Destruction Warlock",

  // Warrior
  "Arms Warrior",
  "Fury Warrior",
];

const healerSpecs = [
  "Preservation Evoker",
  "Restoration Druid",
  "Mistweaver Monk",
  "Holy Paladin",
  "Discipline Priest",
  "Holy Priest",
  "Restoration Shaman",
];

const defensives = [
  // Old shared component on discord
  //   49998, 48707, 48743, 49039, 48792, 198589, 196555, 5487, 22842, 22812, 108238,
  //   319454, 61336, 363916, 374348, 109304, 272679, 264735, 18265, 342245, 55342,
  //   110959, 45438, 235450, 235313, 11426, 235219, 122783, 122278, 22630, 122470,
  //   498, 403876, 1022, 642, 633, 184662, 586, 19236, 47585, 1966, 185311, 5277,
  //   31224, 974, 108271, 198103, 234153, 6789, 108416, 104773, 34428, 386208,
  //   202168, 23920, 383762, 190456, 118038, 184364, 6262, 370511,

  // Spreadsheet - https://docs.google.com/spreadsheets/d/16nNpKOoKr-RW_lRkIUUqU5jAyuWCn8L77KFndin7hLs/edit?gid=1279775008#gid=1279775008
  //   48743, 49039, 48792, 51052, 48707, 49998, 196718, 196555, 198589, 319454,
  //   108238, 124974, 22812, 22842, 5487, 61336, 374227, 363916, 374348, 360827,
  //   186265, 109304, 264735, 388035, 414658, 45438, 55342, 110960, 414660, 342245,
  //   342247, 235450, 235313, 235219, 11426, 115203, 122783, 122470, 471195, 1022,
  //   642, 6940, 498, 403876, 184662, 108968, 15286, 19236, 586, 47585, 5277, 31224,
  //   185311, 1966, 198103, 108271, 108281, 108270, 104773, 108416, 452930, 6789,
  //   234153, 383762, 97462, 202168, 23920, 386208, 118038, 190456, 184364, 6262,
  //   431416, 8936, 116670, 85673, 2061, 974, 8004,

  // Final merge
  115203, 2061, 264735, 184364, 55342, 124974, 48707, 586, 374348, 22630, 48743,
  122470, 196718, 6262, 633, 34428, 642, 6789, 48792, 471195, 5277, 386208,
  11426, 234153, 85673, 97462, 108238, 235219, 342245, 342247, 8936, 108270,
  108271, 109304, 108281, 383762, 118038, 22812, 6940, 19236, 272679, 235313,
  431416, 22842, 452930, 8004, 104773, 49998, 370511, 184662, 18265, 51052,
  5487, 110959, 23920, 110960, 360827, 45438, 108416, 363916, 49039, 61336,
  186265, 122783, 403876, 122278, 31224, 108968, 1966, 15286, 202168, 235450,
  198589, 116670, 414658, 388035, 414660, 196555, 974, 374227, 198103, 319454,
  185311, 47585, 498, 190456, 1022,
];

const longDurationDefensives = [115203];

type PlayerDeath = {
  fightId: number;
  player: string;
  ability: RpgLogs.Ability | string;
  timestamp: string;
  defensiveCasts: string;
};

type FightDeaths = {
  fightId: number;
  deaths: PlayerDeath[];
};

type FightsWithDeathEvents = {
  fight: RpgLogs.Fight;
  deaths: RpgLogs.DeathEvent[];
};

const getAbilityDescription = (
  ability: RpgLogs.Ability | null,
  startFightTime: number,
  abilityEvent?: RpgLogs.AnyEvent
): string => {
  if (ability === null) {
    return "Unknown (Fall)";
  }
  const skillTime = abilityEvent
    ? ` [${formatTimestamp(startFightTime, abilityEvent.timestamp)}]`
    : "";

  return `<AbilityIcon id="${ability.id}" icon="${ability.icon}" type="${ability.type}">${ability.name}${skillTime}</AbilityIcon>`;
};

const getPlayerIcon = (player: RpgLogs.Actor, spec: string): string => {
  return `<ActorIcon type="${player.subType}-${spec}">${player.name}</ActorIcon>`;
};

const isDefensive = (
  castEv: RpgLogs.AnyEvent,
  deathEv: RpgLogs.DeathEvent
): { ability: RpgLogs.Ability; event: RpgLogs.AnyEvent } | null => {
  if (castEv.ability == null) return null;
  if (
    (defensives.includes(castEv.ability.id) &&
      Math.abs(castEv.timestamp - deathEv.timestamp) < 10000) ||
    (longDurationDefensives.includes(castEv.ability.id) &&
      Math.abs(castEv.timestamp - deathEv.timestamp) < 16000)
  ) {
    return {
      ability: castEv.ability,
      event: castEv,
    };
  }
  return null;
};

const formatTimestamp = (startFightTime: number, eventTime: number) => {
  const diffTime = eventTime - startFightTime;
  const minutes = Math.floor(diffTime / 60000);
  const seconds = ((diffTime % 60000) / 1000).toFixed(0);
  const miliseconds = diffTime % 1000;
  const formattedDiffTime = `${minutes}:${seconds}:${miliseconds}`;
  return formattedDiffTime;
};

const getDeathByFights = (fights: RpgLogs.Fight[]): FightsWithDeathEvents[] => {
  const fightsWithDeaths = fights.flatMap((fight) => {
    const deaths = fight.friendlyPlayerDeathEvents.slice(0, 3);
    return {
      fight: fight,
      deaths: deaths,
    } as FightsWithDeathEvents;
  });
  return fightsWithDeaths;
};

const getDefensiveCasts = (
  fight: RpgLogs.Fight,
  playerDeath: RpgLogs.DeathEvent,
  playerSpec: string
) => {
  const playerSpecClass = `${playerSpec} ${playerDeath.target?.subType}`;
  return fight
    .eventsByCategoryAndDisposition("casts", "friendly")
    .filter((castEvent) => {
      if (castEvent.source == null) return false;
      return playerDeath.target?.id === castEvent.source.id;
    })
    .map((castEvent) => {
      return isDefensive(castEvent, playerDeath);
    })
    .filter((abilityEvent) => abilityEvent !== null)
    .filter((abilityEvent) => {
      if (!abilityEvent) return false;
      if (dpsSpecs.includes(playerSpecClass))
        return (
          dpsTankCds.includes(abilityEvent.ability.id) ||
          dpsHealerCds.includes(abilityEvent.ability.id)
        );
      return false;
    })
    .reduce((defensiveAbilities, abilityEvent) => {
      if (abilityEvent !== null) {
        defensiveAbilities.push(
          getAbilityDescription(
            abilityEvent.ability,
            fight.startTime,
            abilityEvent.event
          )
        );
      }
      return defensiveAbilities;
    }, [] as string[]);
};

export default getComponent = () => {
  const deathByFights = getDeathByFights(reportGroup.fights);

  const seriesData = deathByFights.reduce((fightDeaths, fightWithDeaths) => {
    const deaths = fightWithDeaths.deaths.reduce(
      (playerDeaths, playerDeath) => {
        if (!playerDeath.target) return playerDeaths;
        const playerSpec = fightWithDeaths.fight.specForPlayer(
          playerDeath.target
        );
        const defensiveCasts = getDefensiveCasts(
          fightWithDeaths.fight,
          playerDeath,
          playerSpec
        );

        // Miliseconds to minutes:seconds:miliseconds format
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
            defensiveCasts.join(",") ?? `<Wipe><Icon type="close"></Wipe>`,
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
              header: "Timestamp",
              textAlign: "right",
            },
            defensiveCasts: {
              header: "Defensive Casts",
            },
          },
        },
      },
      // data: seriesData,
      data: flatSeriesData,
    },
  } as RpgLogs.TableComponent;
};
