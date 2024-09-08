export default function ErrorPage() {
  console.log("Reached a 404");
  return (
    <main className={`flex flex-col `}>
      <div>
        Actual 404 page that is somehow getting pulled even if apparently
        nothing needed to be setup for it?
      </div>
    </main>
  );
}
