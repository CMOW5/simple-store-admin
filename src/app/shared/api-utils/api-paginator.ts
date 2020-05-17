export interface ApiPaginator {
    currentPage: number;
    currentPageUrl: string;
    hasMorePages: boolean;
    nextPage: number,
    nextPageUrl: string,
    hasPrevious: boolean;
    previousPage: number;
    previousPageUrl: string;
    pageCount: number;
    lastPage: number;
    totalPages: number;
    path: string;
    totalElements: number;
}