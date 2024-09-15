import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Defines the paths where the header and footer should not be displayed.
  // for the moment it's the informed investors club page, which is a landing page.
  // The 404 page has these components added in its own file, since it also has a bigger banner on top of the header.
  const noHeaderOrFooterRoute = ["/the-informed-investors-club", "/404"];

  const showHeaderAndFooter = !noHeaderOrFooterRoute.includes(router.pathname);

  return (
    <>
      <Script
        strategy="afterInteractive" // Ensure it's only loaded once after page load
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <main className={poppins.className}>
        {showHeaderAndFooter && <Header />}
        <Component {...pageProps} />
        {showHeaderAndFooter && <Footer />}
      </main>
    </>
  );
}
