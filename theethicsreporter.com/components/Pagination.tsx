import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  function getHref(page: number) {
    return page === 1 ? "/" : `/page/${page}`;
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={getHref(currentPage - 1)}
          className="px-3 py-2 text-sm font-sans border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          Previous
        </Link>
      )}

      {pages.map((page, i) =>
        typeof page === "string" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">...</span>
        ) : (
          <Link
            key={page}
            href={getHref(page)}
            className={`px-3 py-2 text-sm font-sans border rounded transition-colors ${
              page === currentPage
                ? "bg-brand text-white border-brand"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={getHref(currentPage + 1)}
          className="px-3 py-2 text-sm font-sans border border-gray-300 rounded hover:bg-gray-100 transition-colors"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
