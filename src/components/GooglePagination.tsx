"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export const GooglePagination = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  let numberOfPages = 3;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (pathname.includes("/explorar")) {
    numberOfPages = 6;
  }

  const initialPages = [1, 2, 3];
  const middlePages = [currentPage - 1, currentPage, currentPage + 1];
  const lastPages = [numberOfPages - 2, numberOfPages - 1, currentPage];

  return (
    <Pagination className="m-auto">
      <PaginationContent className="m-auto">
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <>
            <PaginationItem>
              <PaginationLink href={createPageUrl(1)}>1</PaginationLink>
            </PaginationItem>
            {currentPage - 2 !== 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {currentPage === 1 &&
          initialPages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === 1} href={createPageUrl(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {currentPage > 1 &&
          currentPage < numberOfPages &&
          middlePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                href={createPageUrl(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {currentPage === numberOfPages &&
          lastPages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                href={createPageUrl(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

        {currentPage < numberOfPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < numberOfPages && (
          <>
            {currentPage + 1 !== numberOfPages && (
              <PaginationItem>
                <PaginationLink href={createPageUrl(numberOfPages)}>
                  {numberOfPages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext href={createPageUrl(currentPage + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};
