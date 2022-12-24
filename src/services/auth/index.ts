import Cookies from "js-cookie";
import { JWT_ACCESS_TOKEN } from "@app/const/common.const";
// import { getCurrentLang, getDefaultLang } from "../i18n";
// import { clearWalletCredential } from '@app/dekits/components/connect-wallet-modal/ultils/clear-wallet-auth';

interface UserCredentail {
  accessToken: string;
  expiredTime: number;
}

export function checkUserLogin() {
  return !!Cookies.get(JWT_ACCESS_TOKEN);
}

export function saveUserCredential(userCredential: UserCredentail) {
  Cookies.set(JWT_ACCESS_TOKEN, userCredential.accessToken, {
    expires: userCredential.expiredTime,
  });
}

export function getAccessToken() {
  return Cookies.get(JWT_ACCESS_TOKEN);
}

export function clearUserCredential() {
  Cookies.remove(JWT_ACCESS_TOKEN);
  // clearWalletCredential();
}

export function redirectToLogin() {
  clearUserCredential();
  // const currentLang = getCurrentLang();
  // const defaultLang = getDefaultLang();
  // const lang = currentLang === defaultLang ? "" : `/${currentLang}`;
  const url = `/auth?prev=${window.location.pathname}${window.location.search}`;

  window.location.href = url;
}
