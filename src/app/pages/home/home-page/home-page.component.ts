import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs'

const ROWS_HEIGHT: {[id: number]: number} = {1: 400, 3: 335, 4: 350}


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  
  cols = 3
  category: string | undefined
  rowHeight = ROWS_HEIGHT[this.cols]
  sort = "desc"
  count = "12"
  products: Array<Product> | undefined
  productsSubscription: Subscription | undefined

  constructor(private cartService: CartService, private storeService: StoreService){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productsSubscription = this.storeService.getProducts(this.count, this.sort, this.category).subscribe({
      next: _products => {
        this.products = _products
      },
      error: error => {
        console.log(error)
      }
    })
  }

  onColumnsCountChange(colsNum: number): void{
    this.cols = colsNum
  }

  onCountChange(count: number): void{
    this.count = count.toString()
    this.getProducts()
  }

  onSortChange(sort: string): void {
    this.sort = sort
    this.getProducts()
  }

  onShowCategory(category: string): void {
    this.category = category
    this.getProducts()
  }

  onAddToCart(porduct: Product): void{
    this.cartService.addToCart({
      product: porduct.image,
      name: porduct.title,
      price: porduct.price,
      quantity: 1,
      id: porduct.id
    })
  }

  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }
}
