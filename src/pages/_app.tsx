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
import { SessionContainer } from "@app/hooks/session";
import logo from "../../public/assets/images/logo.png";
import { createProvider } from "@app/eth/provider";
import { createInstance } from "@app/eth/deducation";
import { EthereumContext } from "@app/context/ethereum-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const provider = createProvider();
  const deducation = createInstance(provider);
  const ethereumContext = { provider, deducation };

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
      <SessionContainer userProfile={pageProps.userProfile}>
        <EthereumContext.Provider value={ethereumContext}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </EthereumContext.Provider>
      </SessionContainer>
      <ToastContainer hideProgressBar={true} />
    </>
  );
}
