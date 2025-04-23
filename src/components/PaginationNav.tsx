import Link from "next/link";

type NavPath = "podcast" | "articles" | "videos";

export const PaginationNav = ({
    navPath,
  currentPage,
  totalPages,
}: {
  navPath: NavPath;
  currentPage: number;
  totalPages: number;
}) => {
  const pagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  return (
    <nav className="pagination-nav">
      <ul className="flex flex-row space-x-2 text-blue-primary text-lg">
        {currentPage > 1 && (
          <li>
            <Link href={`/${navPath}/${currentPage - 1}`}>
              <span>« Previous</span>
            </Link>
          </li>
        )}

        {startPage > 1 && (
          <>
            <li>
              <Link href={`/${navPath}/1`}>
                <span>1</span>
              </Link>
            </li>
            {startPage > 2 && (
              <li>
                <span>…</span>
              </li>
            )}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <li key={startPage + i}>
            <Link href={`/${navPath}/${startPage + i}`}>
              <span
                className={
                  currentPage === startPage + i ? "text-blue-secondary" : ""
                }
              >
                {startPage + i}
              </span>
            </Link>
          </li>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li>
                <span>…</span>
              </li>
            )}
            <li>
              <Link href={`/${navPath}/${totalPages}`}>
                <span>{totalPages}</span>
              </Link>
            </li>
          </>
        )}

        {currentPage < totalPages && (
          <li>
            <Link href={`/${navPath}/${currentPage + 1}`}>
              <span>Next »</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
