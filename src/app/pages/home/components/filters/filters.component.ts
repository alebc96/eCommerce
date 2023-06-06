import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>()
  
  categories: Array<string> | undefined
  categoriesSubscription: Subscription | undefined

  constructor(private storeService: StoreService){}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getCategories().subscribe({
      next: (_categories: any) => {
        this.categories = _categories
      },
      error: error => {
        console.log(error)
      }
    })
  }

  onConsole(value: any){
    console.log(value)
  }

  onShowCategory(category: string): void {
    this.showCategory.next(category);
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }
}
