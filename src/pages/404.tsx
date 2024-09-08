import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ErrorPage() {
  console.log("Reached a 404");
  return (
    <main className={`flex flex-col `}>
      <Header />

      <div>
        Actual 404 page that is somehow getting pulled even if apparently
        nothing needed to be setup for it?
      </div>

      <Footer />
    </main>
  );
}
