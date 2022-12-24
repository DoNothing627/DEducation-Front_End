import type { AsyncLocalStorage } from "node:async_hooks";

export interface AlsValues {
  data: {
    host: string;
    fullUrl: string;
    langCnf: { [k: string]: string };
    accessToken?: string;
    lang: string;
    defaultLocale: string;
    locales: string[];
  };
}

/**
 * ___IMPORTANT__: This function is for server side **ONLY**, **DO NOT** use it in client side._
 *
 * ```ts
 * // Usage
 * function x() {
 *   if (typeof window !== 'undefined') return;
 *
 *   getALS()
 * }
 * ```
 */
export function getALS(): AsyncLocalStorage<AlsValues> | undefined {
  return global.ALS;
}
