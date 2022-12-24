import { throwError } from "rxjs";
import { ajax, AjaxConfig, AjaxResponse } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { redirectToLogin, getAccessToken } from "@app/services/auth";
import { getALS } from "../server";
// import { getCurrentLang } from '../i18n';

export const handleError =
  (requestOpts: RequestOptions) => (error: AjaxResponse<JsonResponse<any>>) => {
    if (error.status === 401) {
      redirectToLogin();
    }

    if (requestOpts.onError === "throwOriginal") {
      return throwError(() => error);
    }

    return throwError(() => error.response);
  };

interface RequestOptions {
  url: string;
  body?: any;
  method: "POST" | "GET" | "PUT" | "DELETE";
  headers?: any;
  async?: boolean;

  /**
   * Strategy for error hanlding.
   * - 'throwRes': throw error payload  only.
   * - 'throwOriginal': throw original error object of Rxjs/ajax.
   *
   * Default: 'throwRes'.
   */
  onError?: "throwRes" | "throwOriginal";
}

interface JsonResponse<Data> {
  code?: number;
  msg?: string;
  data: Data;
}

const XHR2 =
  typeof XMLHttpRequest !== "undefined" ? XMLHttpRequest : require("xhr2");

export class Http {
  public static request<Data = any>(requestOpts: RequestOptions) {
    // const lang = getCurrentLang();
    let accessToken: string | undefined;

    // if (typeof window !== "undefined") {
    //   accessToken = getAccessToken();
    // } else {
    //   const store = getALS()?.getStore();
    //   accessToken = store?.data?.accessToken;
    // }

    accessToken = getAccessToken();

    const ajaxRequest: AjaxConfig = {
      ...requestOpts,
      createXHR: () => new XHR2(),
      async:
        requestOpts?.async === undefined || requestOpts?.async === null
          ? true
          : requestOpts.async,
      crossDomain: true,
      responseType: "json",
      timeout: 100000,
      withCredentials: false,
      headers: requestOpts.headers
        ? {
            // 'lang': lang,
            ...requestOpts.headers,
          }
        : {
            // 'lang': lang,
            "Content-Type": "application/json",
          },
    };

    if (accessToken) {
      (ajaxRequest as any).headers["x-auth"] = `Bearer ${accessToken}`;
    }

    return ajax(ajaxRequest).pipe(
      catchError(handleError(requestOpts)),
      map<AjaxResponse<any>, JsonResponse<Data>>((res) => res.response)
    );
  }
}
