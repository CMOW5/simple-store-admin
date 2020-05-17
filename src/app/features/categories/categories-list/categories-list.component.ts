import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { CategoryService, CategoryRequest, DEFAULT_PAGE, DEFAULT_SIZE, DEFAULT_SEARCH_TERM } from '../services/category.service';
import { ApiPaginator } from 'src/app/shared/api-utils/api-paginator';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'parent', 'controls'];
  dataSource: Category[] = [];
  searchTerm = DEFAULT_SEARCH_TERM;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // MatPaginator Inputs
  pageSizeOptions: number[] = [5, 10, 20, 100];

  private searchCategoryByName$ = new Subject<string>();
  private searchCategoryByNameSubscription: Subscription;

  constructor(private categoryService: CategoryService) { }
  
  ngOnInit() { 
    this.listenForSearchText();
  }

  ngAfterViewInit() {
    this.getCategories();
  }

  getCategories(request?: CategoryRequest) {
    this.categoryService.getCategories(request).subscribe(response => {
      this.dataSource = response.content;
      this.mapPaginator(response.paginator);
    });
  }

  private mapPaginator(paginator: ApiPaginator) {
    this.paginator.length = paginator.totalElements;
    this.paginator.pageIndex = paginator.currentPage;
    this.paginator.pageSize = paginator.pageCount;
  } 

  listenForSearchText() {
    this.searchCategoryByNameSubscription = this.searchCategoryByName$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(searchTerm => {
        
        /* 
          there's a firstPage() method on the MatPaginator class
          but it triggers a pageEvent with results in an extra
          http request call
        */
        this.paginator.pageIndex = 0; // go to first page
        this.searchTerm = searchTerm;
        const request = {
          page: DEFAULT_PAGE,
          size: DEFAULT_SIZE,
          searchTerm: searchTerm,
        };
        this.getCategories(request);
        
      })
    ).subscribe();
  }

  onPageEvent(pageEvent: PageEvent) {
    const request = {
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize,
      searchTerm: this.searchTerm,
    };
    this.getCategories(request);
  }

  applyFilter(filterValue: string) {
    this.searchCategoryByName$.next(filterValue);
  }

  goToShowCategory(categoryId: number) {
    console.log('show = ', categoryId);
  }

  goToEditCategory(categoryId: number) {
    console.log('edit = ', categoryId);
  }

  ngOnDestroy(): void {
    this.searchCategoryByNameSubscription.unsubscribe();
  }

}
