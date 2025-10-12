import { defineDb, defineTable, column } from 'astro:db';

const Player = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    active: column.boolean(),
    admin: column.boolean(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {Player}
});
