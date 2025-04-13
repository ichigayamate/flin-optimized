import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Header from "@/lib/components/headers";
import ChatbotPopover from "@/lib/components/chatbot/chatbot-popover";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <DefaultSeo titleTemplate="%s | FLIN" defaultTitle="FLIN" />
      <Header />
      <main className="py-4 mt-16 w-full">
        <Component {...pageProps} />
      </main>
      <div className="fixed bottom-4 right-4">
        <ChatbotPopover />
      </div>
    </>
  );
}
