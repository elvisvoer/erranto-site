import { defineDb, defineTable, column, NOW } from "astro:db";

const Player = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    handicap: column.number({ default: 3 }),
    tier: column.number({ default: 8 }),
    active: column.boolean(),
    admin: column.boolean(),
  },
});

const Match = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    type: column.text({
      enum: ["8-ball", "9-ball", "10-ball"],
      default: "9-ball",
    }),
    raceTo: column.number({ default: 9 }),
    status: column.text({
      enum: ["pending", "active", "finished"],
      default: "pending",
    }),
    createdAt: column.date({ default: NOW }),
  },
});

const MatchStats = defineTable({
  columns: {
    matchId: column.text(),
    playerId: column.text({ references: () => Player.columns.id }),
    framesWon: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Player, Match, MatchStats },
});
