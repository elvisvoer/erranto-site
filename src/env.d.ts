/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    player: {
      id: string;
      name: string;
      active: boolean;
      admin: boolean;
    };
  }
}
