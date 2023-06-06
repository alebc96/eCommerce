import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductForm } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup | undefined

  constructor(private fb: FormBuilder, private storeService: StoreService, private _snackBar: MatSnackBar, private router: Router){
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  onSubmitProduct(){
    const product: ProductForm = this.productForm?.value
    this.storeService.createProduct(product).subscribe({
      next: _res => {
        console.log(_res)
        this._snackBar.open("Item added to database", "Ok",{duration: 3000})
      },
      error: error => {
        console.log(error)
      }
    })
  }

  onCancel(): void {
    this.router.navigate(['/home'])
  }
}
