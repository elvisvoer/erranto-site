/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    player: {
      id: string;
      profileURI: string;
      name: string;
      active: boolean;
      admin: boolean;
      tier: number;
      handicap: number;
    };
  }
}
