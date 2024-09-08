export const getStaticProps = async () => {
  const testResult = [
    {
      id: 1,
      attributes: {
        title: "Terms and conditions",
        description: "Lorem ipsum...",
      },
    },
  ];

  return {
    props: {
      result: testResult,
    },
  };
};

export default function TermsAndConditions({ result }: { result: any[] }) {
  return (
    <main className={`flex flex-col`}>
      <div>
        <div>
          {result[0].attributes.title}
          {result[0].attributes.description}
        </div>
      </div>
    </main>
  );
}
