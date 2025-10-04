import { db, User } from "astro:db";

export default async function () {
  await db.insert(User).values([
    { id: 1, phoneNumber: "1234", name: "Elvis", handicap: 3, admin: true },
    { id: 2, phoneNumber: "0000", name: "Mina", handicap: 2, admin: false },
  ]);
}
