import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'
import { Product, ProductForm } from '../models/product.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json ' }),
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor( private http: HttpClient ) { }

  getProducts(limit = '12', sort = 'desc', category? : string): Observable<Array<Product>>{
    const url = `${environment.baseUrl}/products${
      category ? "/category/" + category : ''
    }?sort=${sort}&limit=${limit}`
    return  this.http.get<Array<Product>>(url)
  }

  getCategories(){
    const url = `${environment.baseUrl}/products/categories`
    return this.http.get(url)
  }

  createProduct(product: ProductForm){
    const url = `${environment.baseUrl}/products`
    return this.http.post(url, product, httpOptions)
  }
}
