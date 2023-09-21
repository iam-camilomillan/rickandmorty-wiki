import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const baseUrl = "https://rickandmortyapi.com/api";

export const rickAndMortyRouter = createTRPCRouter({
  getCustomUrl: publicProcedure
    .input(
      z.object({
        customUrl: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(`${input.customUrl}`);
      const jsonData = response.json();

      return jsonData;
    }),
  getSingle: publicProcedure
    .input(
      z.object({
        categorie: z.string(),
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(`${baseUrl}/${input.categorie}/${input.id}`);
      const jsonData = response.json();

      return jsonData;
    }),
  getAll: publicProcedure
    .input(z.object({ categorie: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(`${baseUrl}/${input.categorie}`);
      const jsonData = response.json();

      return jsonData;
    }),
  getMultiple: publicProcedure
    .input(z.object({ categorie: z.string(), ids: z.array(z.number()) }))
    .query(async ({ input }) => {
      const idsString = input.ids.join(",");

      const response = await fetch(
        `${baseUrl}/${input.categorie}/[${idsString}]`,
      );
      const jsonData = response.json();

      return jsonData;
    }),
  getFilteredCharacters: publicProcedure
    .input(
      z.object({
        page: z.number(),
        name: z.string(),
        status: z.string(),
        species: z.string(),
        type: z.string(),
        gender: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `${baseUrl}/character/?page=${input.page}&name=${input.name}&status=${input.status}&species=${input.species}&type=${input.type}&gender=${input.gender}`,
      );
      const jsonData = response.json();

      return jsonData;
    }),
  getFilteredLocations: publicProcedure
    .input(
      z.object({
        page: z.number(),
        name: z.string(),
        type: z.string(),
        dimension: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `${baseUrl}/location/?page=${input.page}&name=${input.name}&type=${input.type}&dimension=${input.dimension}`,
      );
      const jsonData = response.json();

      return jsonData;
    }),
  getFilteredEpisodes: publicProcedure
    .input(
      z.object({
        page: z.number(),
        name: z.string(),
        episode: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response = await fetch(
        `${baseUrl}/episode/?page=${input.page}&name=${input.name}&type=${input.episode}`,
      );
      const jsonData = response.json();

      return jsonData;
    }),
});
