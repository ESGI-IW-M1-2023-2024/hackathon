export interface CustomPaginationParams {
  page: number;
  limit: number;
  archived: boolean;
}

export interface PaginatedResponse<ResultsType = any> {
  items: ResultsType[];
  pageCount: number;
  totalItemCount: number;
}
