import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {DefaultSeo} from "next-seo";
import Header from "@/lib/components/headers";

export default function App({Component, pageProps}: AppProps) {
  return <>
    <DefaultSeo titleTemplate="%s | FLIN" defaultTitle="FLIN"/>
    <Header/>
    <main className="p-4 mt-16 max-w-[1500px]">
      <Component {...pageProps} />
    </main>
  </>;
}
