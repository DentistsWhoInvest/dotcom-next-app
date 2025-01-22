export default function CPDPagesHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center bg-blue-primary text-white">
      {title}
      {title === "Congratulations" && (
        <p>You have successfully completed this CPD/CE</p>
      )}
    </div>
  );
}
