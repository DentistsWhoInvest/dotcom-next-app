import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Defines the paths where the header and footer should not be displayed.
  // For the moment it's the courses pages and landing pages.
  // Landing pages include the informed investors club and targeted landing pages.
  // The 404 page has these components added in its own file, since it also has a bigger banner on top of the header.
  const noHeaderOrFooterRoute = [
    "/cash-flow-for-dentists",
    "/the-academy",
    "/100k",
    "/the-informed-investors-club",
    "/404",
    "/[targetedlandingpage]",
    "/special-invite",
    "/facebook-group",
    "/podcastreport",
    "/boost-your-income-with-james-martin",
    "/thankyou",
    "/free-report",
    "/crypto-ebook",
    "/free-nhs-checklist",
    "/subscribe-to-our-newsletter",
    "/congrats"
  ];

  const showHeaderAndFooter = !noHeaderOrFooterRoute.includes(router.pathname);

  return (
    <>
      {/* Google Tag Manager - Global base code */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KMBJ6G57');
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KMBJ6G57"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <main className={poppins.className}>
        {showHeaderAndFooter && <Header />}
        <Component {...pageProps} />
        {showHeaderAndFooter && <Footer />}
      </main>
    </>
  );
}
