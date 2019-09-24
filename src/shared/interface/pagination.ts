export interface Pagination {
  toNextPage: (url: string) => void;
  nextPage?: string
}
