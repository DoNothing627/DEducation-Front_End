import "../styles/globals.css";
import "../styles/homepage.css";
import "../styles/stat.css";
import "@app/styles/output.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
