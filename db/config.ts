import { defineDb, defineTable, column } from "astro:db";

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
  },
});

const MatchStats = defineTable({
  columns: {
    matchId: column.text(),
    playerId: column.text(),
    framesWon: column.number()
  },
  foreignKeys: [
    {
      columns: ["matchId", "playerId"],
      references: () => [Match.columns.id, Player.columns.id],
    },
  ],
});

// https://astro.build/db/config
export default defineDb({
  tables: { Player },
});
