import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-headers',
  templateUrl: './products-headers.component.html',
  styleUrls: ['./products-headers.component.css']
})
export class ProductsHeadersComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() countChange = new EventEmitter<number>();
  sort = "asc"
  itemsShowCount = 12

  constructor(){}

  ngOnInit(): void {
      
  }

  onSortUpdated(newSort: string): void{
    this.sort = newSort
    this.sortChange.emit(newSort)
  }

  onItemsUpdated(count: number): void{
    this.itemsShowCount = count
    this.countChange.emit(count)
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum)
  }
}
