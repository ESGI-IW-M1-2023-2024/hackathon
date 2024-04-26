export interface CustomPaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderByDirection?: string;
  archived?: 0 | 1;
}

export interface NotPaginationParams extends CustomPaginationParams {
  pagination?: boolean;
}

export interface PaginatedResponse<ResultsType = any> {
  items: ResultsType[];
  pageCount: number;
  totalItemCount: number;
}
