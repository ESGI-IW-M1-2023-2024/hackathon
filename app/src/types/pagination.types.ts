export interface CustomPaginationParams {
  page: number;
  limit: number;
  orderBy?: string;
  orderByDirection?: string;
  archived: boolean;
}

export interface PaginatedResponse<ResultsType = any> {
  items: ResultsType[];
  pageCount: number;
  totalItemCount: number;
}
