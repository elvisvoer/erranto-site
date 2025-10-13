import { db, Player } from "astro:db";

export default async function () {
  await db.insert(Player).values([
    {
      id: "1",
      name: "Claus Julius",
      tier: 1,
      handicap: 2,
      active: true,
      admin: false,
    },
    {
      id: "2",
      name: "Martin Hermansen",
      tier: 2,
      handicap: 1,
      active: true,
      admin: false,
    },
    {
      id: "3",
      name: "Claus (Godzilla)",
      tier: 2,
      handicap: 2,
      active: true,
      admin: false,
    },
    {
      id: "4",
      name: "Troels (Tornado)",
      tier: 3,
      handicap: 3,
      active: true,
      admin: false,
    },
    {
      id: "5",
      name: "Naim",
      tier: 3,
      handicap: 3,
      active: true,
      admin: false,
    },
    {
      id: "6",
      name: "Taha",
      tier: 3,
      handicap: 3,
      active: true,
      admin: false,
    },
    {
      id: "7",
      name: "Seb",
      tier: 4,
      handicap: 1,
      active: true,
      admin: false,
    },
    {
      id: "8",
      name: "Steve",
      tier: 4,
      handicap: 1,
      active: true,
      admin: false,
    },
    {
      id: "9",
      name: "Chak",
      tier: 4,
      handicap: 3,
      active: true,
      admin: false,
    },
  ]);
}
