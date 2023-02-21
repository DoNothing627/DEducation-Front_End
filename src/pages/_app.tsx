import "../styles/globals.css";
import "../styles/homepage.css";
import "../styles/stat.css";
import "@app/styles/output.css";

import type { AppProps } from "next/app";
import { Layout } from "@app/dekits/layout";
import { useRouter } from "next/router";
import { setRouter } from "@app/services/router";
import { useEffect } from "react";
import Head from "next/head";
import logo from "../../public/assets/images/logo.png";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    setRouter(router);
    console.log(router);
  }, [router]);
  return (
    <>
      <Head>
        <link href="../../public/assets/images/logo.png" />
        <title>DEducation</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
