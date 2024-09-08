import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Defines the paths where the header and footer should not be displayed
  const noHeaderOrFooterRoute = ["/the-informed-investors-club"]; 

  const showHeaderAndFooter = !noHeaderOrFooterRoute.includes(router.pathname);

  return (
    <main className={poppins.className}>
      {showHeaderAndFooter && <Header />}
      <Component {...pageProps} />
      {showHeaderAndFooter && <Footer />}
    </main>
  );
}
