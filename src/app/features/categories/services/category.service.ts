import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from 'src/app/shared/api-utils/api-response';
import { Observable } from 'rxjs';

const GET_CATEGORIES_URL = `${environment.apiAdminUrl}/categories`;
export const DEFAULT_PAGE = 0;
export const DEFAULT_SIZE = 20;
export const DEFAULT_SEARCH_TERM = '';
const PAGE_PARAM = 'page';
const SIZE_PARAM = 'size';
const SEARCH_TERM_PARAM = 'search';

/**
 * the request params to fetch paginated categories from the api
 */
export interface CategoryRequest {
  // the page number 
  page: number;

  // the number of elements per page
  size: number;

  // the search term (by name)
  searchTerm?: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  
  getCategories(request: CategoryRequest = {page: DEFAULT_PAGE, size: DEFAULT_SIZE, searchTerm: DEFAULT_SEARCH_TERM}): Observable<ApiResponse<Category[]>> {
    const options = { 
      params: this.buildRequestParams(request) 
    };

    return this.httpClient.get<ApiResponse<Category[]>>(GET_CATEGORIES_URL, options);
  }

  private buildRequestParams(request: CategoryRequest): HttpParams {
    const page = request.page ? String(request.page) : String(DEFAULT_PAGE);
    const size = request.size ? String(request.size) : String(DEFAULT_SIZE);
    const searchTerm = request.searchTerm ? request.searchTerm : DEFAULT_SEARCH_TERM;

    return new HttpParams()
              .set(PAGE_PARAM, page)
              .set(SIZE_PARAM, size)
              .set(SEARCH_TERM_PARAM, searchTerm);
  }
}
