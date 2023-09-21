import { createTRPCRouter } from "~/server/api/trpc";
import { rickAndMortyRouter } from "./routers/rickAndMorty";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  rickAndMorty: rickAndMortyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
