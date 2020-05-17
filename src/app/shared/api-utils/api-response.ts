import { ApiPaginator } from './api-paginator';

export interface ApiResponse <T> {
    content: T,
    paginator: ApiPaginator
}