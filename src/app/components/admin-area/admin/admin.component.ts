import { ProductModel } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public product: ProductModel
  public opened = !true;
  fixedBottomGap: number = 0;
  fixedTopGap: number = 0;
  fixedInViewport = true;
  public flag = '';
  public flagSec = '';

  constructor() { }

  ngOnInit(): void {
  }

  // handle the flags and insert product inside this product
  public handlerProductId(product: ProductModel) {
    this.flagSec = '';
    this.product = product;
    this.flag = 'a';
  }

  // handle flags to show the form and open and close drawer
  public showAddForm() {
    this.flag = '';
    this.flagSec = 'a';
    this.opened = true;

  }

    // handle button to open and close drawer
  public handlerProductId2(boolVal: boolean) {
    if (!boolVal) {
      this.opened = true;
    }
    else {
      this.opened = false;
    }
  }

}
