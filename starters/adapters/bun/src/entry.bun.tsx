/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Bun HTTP server when building for production.
 *
 * Learn more about the Bun integration here:
 * - https://qwik.builder.io/docs/deployments/bun/
 * - https://bun.sh/docs/api/http#bun-serve
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/bun";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";
import render from "./entry.ssr";

// Create the Qwik City Bun middleware
const { router, notFound, staticFile } = createQwikCity({
  // @ts-ignore
  render,
  qwikCityPlan,
  manifest,
});

// Allow for dynamic port
const port = Number(Bun.env["PORT"] ?? 3009);

/* eslint-disable */
console.log(`Server starter: http://localhost:${port}/`);

Bun.serve({
  port,
  async fetch(req: Request) {
    const staticResponse = staticFile(req);
    if (staticResponse) {
      return staticResponse;
    }

    // Server-side render this request with Qwik City
    const qwikCityResponse = await router(req);
    if (qwikCityResponse) {
      return qwikCityResponse;
    }

    // Path not found
    return notFound(req);
  },
});
