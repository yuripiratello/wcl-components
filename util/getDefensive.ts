type Defensive = {
  spellId: number;
  baseCd: number;
  cdReduction: boolean;
  charges: boolean;
  spec: string | null;
};

type ClassDefensive = {
  class: string;
  defensives: Defensive[];
};
const DEFENSIVES: ClassDefensive[] = [
  {
    class: "Death Knight",
    defensives: [
      {
        spellId: 48743,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 49039,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 48792,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 51052,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 48707,
        baseCd: 60000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 49998,
        baseCd: 0,
        cdReduction: false,
        charges: false,
        spec: null,
      },
    ],
  },
  {
    class: "Demon Hunter",
    defensives: [
      {
        spellId: 196718,
        baseCd: 300000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 196555,
        baseCd: 180000,
        cdReduction: false,
        charges: false,
        spec: "Havoc",
      },
      {
        spellId: 198589,
        baseCd: 60000,
        cdReduction: false,
        charges: false,
        spec: "Havoc",
      },
    ],
  },
  {
    class: "Druid",
    defensives: [
      {
        spellId: 319454,
        baseCd: 300000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 108238,
        baseCd: 90000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 124974,
        baseCd: 90000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 22812,
        baseCd: 60000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 22842,
        baseCd: 36000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 5487,
        baseCd: 0,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 61336,
        baseCd: 180000,
        cdReduction: false,
        charges: false,
        spec: "Feral",
      },
    ],
  },
  {
    class: "Evoker",
    defensives: [
      {
        spellId: 374227,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 363916,
        baseCd: 90000,
        cdReduction: true,
        charges: true,
        spec: null,
      },
      {
        spellId: 374348,
        baseCd: 90000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 360827,
        baseCd: 30000,
        cdReduction: false,
        charges: false,
        spec: "Augmentation",
      },
    ],
  },
  {
    class: "Hunter",
    defensives: [
      {
        spellId: 186265,
        baseCd: 180000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 109304,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 264735,
        baseCd: 120000,
        cdReduction: true,
        charges: true,
        spec: null,
      },
      {
        spellId: 388035,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
    ],
  },
  {
    class: "Mage",
    defensives: [
      {
        spellId: 414658,
        baseCd: 240000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 45438,
        baseCd: 240000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 55342,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 110960,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 414660,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 342245,
        baseCd: 60000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 342247,
        baseCd: 60000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 235450,
        baseCd: 25000,
        cdReduction: false,
        charges: false,
        spec: "Arcane",
      },
      {
        spellId: 235313,
        baseCd: 25000,
        cdReduction: false,
        charges: false,
        spec: "Fire",
      },
      {
        spellId: 235219,
        baseCd: 300000,
        cdReduction: false,
        charges: false,
        spec: "Frost",
      },
      {
        spellId: 11426,
        baseCd: 25000,
        cdReduction: false,
        charges: false,
        spec: "Frost",
      },
    ],
  },
  {
    class: "Monk",
    defensives: [
      {
        spellId: 115203,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 122783,
        baseCd: 90000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 122470,
        baseCd: 90000,
        cdReduction: false,
        charges: false,
        spec: "Windwalker",
      },
    ],
  },
  {
    class: "Paladin",
    defensives: [
      {
        spellId: 471195,
        baseCd: 600000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 1022,
        baseCd: 300000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 642,
        baseCd: 300000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 6940,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 498,
        baseCd: 90000,
        cdReduction: true,
        charges: false,
        spec: "Holy",
      },
      {
        spellId: 403876,
        baseCd: 90000,
        cdReduction: true,
        charges: false,
        spec: "Retribution",
      },
      {
        spellId: 184662,
        baseCd: 90000,
        cdReduction: false,
        charges: false,
        spec: "Retribution",
      },
    ],
  },
  {
    class: "Priest",
    defensives: [
      {
        spellId: 108968,
        baseCd: 300000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 15286,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 19236,
        baseCd: 90000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 586,
        baseCd: 30000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 47585,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: "Shadow",
      },
    ],
  },
  {
    class: "Rogue",
    defensives: [
      {
        spellId: 5277,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 31224,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 185311,
        baseCd: 30000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 1966,
        baseCd: 15000,
        cdReduction: true,
        charges: true,
        spec: null,
      },
    ],
  },
  {
    class: "Shaman",
    defensives: [
      {
        spellId: 198103,
        baseCd: 300000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 108271,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 108281,
        baseCd: 120000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 108270,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
    ],
  },
  {
    class: "Warlock",
    defensives: [
      {
        spellId: 104773,
        baseCd: 180000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 108416,
        baseCd: 60000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 452930,
        baseCd: 60000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 6789,
        baseCd: 45000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 234153,
        baseCd: 0,
        cdReduction: false,
        charges: false,
        spec: null,
      },
    ],
  },
  {
    class: "Warrior",
    defensives: [
      {
        spellId: 383762,
        baseCd: 180000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 97462,
        baseCd: 180000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 202168,
        baseCd: 25000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 23920,
        baseCd: 25000,
        cdReduction: true,
        charges: false,
        spec: null,
      },
      {
        spellId: 386208,
        baseCd: 3000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 118038,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: "Arms",
      },
      {
        spellId: 190456,
        baseCd: 11000,
        cdReduction: false,
        charges: false,
        spec: "Arms",
      },
      {
        spellId: 184364,
        baseCd: 120000,
        cdReduction: true,
        charges: false,
        spec: "Fury",
      },
    ],
  },
  {
    class: "Everyone",
    defensives: [
      {
        spellId: 6262,
        baseCd: 0,
        cdReduction: false,
        charges: false,
        spec: null,
      },
      {
        spellId: 431416,
        baseCd: 300000,
        cdReduction: false,
        charges: false,
        spec: null,
      },
    ],
  },
];

const getClassDefensives = (
  className: string,
  spec: string | null
): Defensive[] => {
  const classData = DEFENSIVES.find((d) => d.class === className);
  if (!classData) {
    return [];
  }
  const classDefensives = spec
    ? classData.defensives.filter((d) => d.spec === spec || d.spec === null)
    : classData.defensives.filter((d) => d.spec === null);

  return classDefensives.concat(
    DEFENSIVES.find((d) => d.class === "Everyone")!.defensives
  );
};

export { getClassDefensives };
