import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const getStaticProps = async () => {

  const testResult = [
    {
      id: 1,
      attributes: {
        title: "Core mission",
        description:
          "...to create and share resources specifically designed to give dentists financial freedom",
      },
    },
  ];

  return {
    props: {
      result: testResult,
    },
  };
};

export default function Blog({ result }: { result: any[] }) {
  return (
    <main className={`flex flex-col`}>
      <Header />
      <div>Paginated pages linking to all blogs</div>
      <Footer />
    </main>
  );
}
