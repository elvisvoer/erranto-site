import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import type { MiddlewareHandler } from 'astro';
import { sequence } from "astro:middleware";
import { DPK_ADMIN_EMAIL } from "astro:env/server";
import { db, eq, Player } from "astro:db";

const isProtectedRoute = createRouteMatcher(["/dkp(.*)"]);

const authMiddleware = clerkMiddleware((auth, context) => {
  const { isAuthenticated, redirectToSignIn, userId } = auth();

  if (!isAuthenticated && isProtectedRoute(context.request)) {
    return redirectToSignIn();
  }
});

const playerMiddleware: MiddlewareHandler = async function(context, next) {
  const user = await context.locals.currentUser();

  if (user?.id) {
    let result = await db.select().from(Player).where(eq(Player.id, user?.id));

    if (result.length === 0) {
      result = await db
        .insert(Player)
        .values({
          id: user.id,
          name: user.fullName!,
          admin: user.primaryEmailAddress?.emailAddress === DPK_ADMIN_EMAIL,
          active: user.primaryEmailAddress?.emailAddress === DPK_ADMIN_EMAIL,
        })
        .returning();
    }

    const player = result[0];

    if (!player.active) {
      return next("/activate");
    }

    context.locals.player = player;
  }

  return next();
}

export const onRequest = sequence(authMiddleware, playerMiddleware);
