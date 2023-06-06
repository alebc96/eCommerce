import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []})
  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void{
    const items = [...this.cart.value.items]
    const itemInCart = items.find((_item) => _item.id === item.id)
    if(!itemInCart){
      items.push(item)
    }else{
      itemInCart.quantity += 1
    }
    this.cart.next({items})
    this._snackBar.open('Item added to cart.', 'Ok', {duration: 2000})
    console.log(this.cart.value)
  }

  removeQuantity(id: number): void {
    this.cart.value.items.map((_item) => {
      if(_item.id === id){
        if(_item.quantity <= 1){
          this.clearCartItem(_item.id)
        }else{
          _item.quantity --;
        }
      }
    }) 
  }

  getTotal(items: CartItem[]): number{
    return items.map((item) => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }

  clearCart(){
    this.cart.next({items: []})
    this._snackBar.open('Cart is cleared.', 'Ok', {duration: 2000})
  }

  clearCartItem(id: number): void{
    const filtereditems = this.cart.value.items.filter((_item) => {
      return _item.id !== id
    })
    this.cart.next({items: filtereditems})
    this._snackBar.open("Item remove from cart", "Ok", {duration: 3000})
  } 

}
