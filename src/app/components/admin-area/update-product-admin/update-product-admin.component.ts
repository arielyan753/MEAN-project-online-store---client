import { ProductModel } from './../../../models/product.model';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-update-product-admin',
  templateUrl: './update-product-admin.component.html',
  styleUrls: ['./update-product-admin.component.css']
})
export class UpdateProductAdminComponent implements OnInit {

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>;

  @Input()
  public product: ProductModel;
  public categories: CategoryModel[];

  constructor(private productsService: ProductsService,
    private notifyService: NotifyService) {

  }

  async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.productsService.getCategories();
    }
    catch (err: any) {
      this.notifyService.error(err);
    }
  }

  // edit product
  async edit() {
    try {
      this.product.image = this.imageBoxRef.nativeElement.files[0];
      await this.productsService.updateProduct(this.product);
      this.notifyService.success("Product has been updated");
    }
    catch (err: any) {
      this.notifyService.error(err);
    }

  }
}
