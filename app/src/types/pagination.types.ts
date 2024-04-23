export interface CustomPaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<ResultsType = any> {
  items: ResultsType[];
  pageCount: number;
  totalItemCount: number;
}
