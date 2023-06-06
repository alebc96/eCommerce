import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartItem } from '../../../models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{

  cart: Cart = {items: [
    {
      product: "https://via.placeholder.com/200",
      name: "adidas shoes",
      price: 20,
      quantity: 1,
      id: 1
    },
    {
      product: "https://via.placeholder.com/200",
      name: "nike shoes",
      price: 50,
      quantity: 1,
      id: 2
    },
    {
      product: "https://via.placeholder.com/200",
      name: "puma shoes",
      price: 100,
      quantity: 2,
      id: 3
    }
  ]}
  dataSource: Array<CartItem> = []
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private cartService: CartService, private http: HttpClient){}

  ngOnInit(): void {
    this.cartService.cart.subscribe({
      next: (_cart: Cart) => {
        this.cart = _cart
        this.dataSource = this.cart.items
      },
      error: error => {
        console.log(error)
      }
    })
  }

  getTotal(items: CartItem[]): number{
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cartService.clearCart()
  }

  onRemoveFromCart({id}: CartItem): void{
    this.cartService.clearCartItem(id)
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)
  }

  onRemoveQuantity({id}: CartItem){
    this.cartService.removeQuantity(id)
  }

  onCheckout(): void{
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async ( res: any ) => {
      let stripe = await loadStripe('pk_test_51NG7JOFPWRtmd1gqFXkKdVJ5lXZXc6IhxYCwV76tOsEwkXL7fhRxQbuYTWUTDvO3kqtEIhKeMXPMblcZRCzmy3S900IgSnZy5S');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
