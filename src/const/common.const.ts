export const APP_NAME = "Discord";
export const JWT_ACCESS_TOKEN = "JWT_ACCESS_TOKEN" as string;
export const API_END_POINT = "http://localhost:9009";
export const SOCKET_END_POINT = process.env.SOCKET_END_POINT as string;
export const REACT_APP_INFURA_PROJECT_ID = "2FNb2g1ja7QipIKNj5sNhZkImNU";
export const REACT_APP_INFURA_PROJECT_SECRET =
  "aa0697f7b0edd1e8e5f3485bde04a911";
export const SOCKET_NOTIFY_END_POINT = process.env
  .SOCKET_NOTIFY_END_POINT as string;
export const ENV: "development" | "production" = process.env.ENV as
  | "development"
  | "production";

/* tam thoi, sau nay co the update lai */
export const defaultDEducationLogo = "/assets/images/logo.png";
export const defaultMetamaskLogo = "/assets/images/metamask-icon.png";
export const defaultGroupAvatar = "";
export const limitLogoOrAvatarSize = 10 * 1000000;
export const limitBannerSize = 10 * 1000000;
