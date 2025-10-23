import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import type { MiddlewareHandler } from "astro";
import { sequence } from "astro:middleware";
import { DPK_ADMIN_EMAIL } from "astro:env/server";
import { db, eq, Player } from "astro:db";

const imageUrlToBase64 = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");

  const contentType = response.headers.get("content-type") || "image/png";
  return `data:${contentType};base64,${base64}`;
};

const isProtectedRoute = createRouteMatcher(["/dpk(.*)", "/admin(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const authMiddleware = clerkMiddleware((auth, context) => {
  const { isAuthenticated, redirectToSignIn, userId } = auth();

  if (!isAuthenticated && isProtectedRoute(context.request)) {
    return redirectToSignIn();
  }
});

const playerMiddleware: MiddlewareHandler = async function (context, next) {
  const user = await context.locals.currentUser();

  if (user?.id) {
    let result = await db.select().from(Player).where(eq(Player.id, user?.id));
    const profileURI = user.hasImage
      ? await imageUrlToBase64(user.imageUrl)
      : "/assets/no-profile-picture.png";

    if (result.length === 0) {
      result = await db
        .insert(Player)
        .values({
          id: user.id,
          profileURI,
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

    if (!isProtectedRoute(context.request)) {
      return next("/dpk");
    }
  }

  return next();
};

const adminMiddleware: MiddlewareHandler = async function (context, next) {
  const player = context.locals.player;

  if (!player?.admin && isAdminRoute(context.request)) {
    return next("/404");
  }

  return next();
};

export const onRequest = sequence(
  authMiddleware,
  playerMiddleware,
  adminMiddleware
);
