import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    phoneNumber: column.text(),
    name: column.text(),
    handicap: column.number(),
    admin: column.boolean(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {User}
});
