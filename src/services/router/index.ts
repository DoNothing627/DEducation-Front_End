import { NextRouter } from "next/router";
import { getALS } from "../server";

let _router: NextRouter;
export function getRouter() {
  return _router;
}

export function setRouter(router: any) {
  _router = router;
}

export function getBaseUrl() {
  let host: string;

  if (typeof window === "undefined") {
    host = getALS()?.getStore()?.data.host as string;
  } else {
    host = window.__NEXT_DATA__.props.host;
  }

  return `https://${host}`;
}
