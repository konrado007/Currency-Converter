import Boarding from "@/components/Boarding";
import Layout from "@/components/Layout";
import { UserContextProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [boarding, setBoarding] = useState<boolean>(true);
  return (
    <UserContextProvider>
      {boarding ? (
        <Boarding setBoarding={setBoarding} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </UserContextProvider>
  );
}
