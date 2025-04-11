import {Html, Head, Main, NextScript} from "next/document";
import Header from "@/lib/components/headers";

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body className="antialiased">
        <Header/>
        <main className="p-4">
          <Main/>
        </main>
        <NextScript/>
      </body>
    </Html>
  );
}
