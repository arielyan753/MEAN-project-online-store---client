import { CategoryModel } from './../../../models/category.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from './../../../services/products.service';
import { ProductModel } from './../../../models/product.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductListComponent implements OnInit {

    @Output()
    public report = new EventEmitter<ProductModel>();

    @Output()
    public test = new EventEmitter<boolean>();

    public products: ProductModel[];
    public categories: CategoryModel[];
    public searchInput: string = "";
    public productsLen: number = 0;

    constructor(
        private productsService: ProductsService,
        private notifyService: NotifyService) { }

    async ngOnInit() {
        try {
            this.categories = await this.productsService.getCategories();
            this.products = await this.productsService.getAllProducts();
            this.productsLen = this.products.length
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    async getProductByCategory(categoryId: string) {
        try {
            this.products = await this.productsService.getProductsByCategory(categoryId);
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    async getAllProducts() {
        try {
            this.products = await this.productsService.getAllProducts();
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    async searchByInput(searchInput: string) {
        this.products = await this.productsService.getAllProducts();
        this.products = this.products.filter(p => { return p.name.toLowerCase().includes(searchInput.toLowerCase()) })
    }

    public handlerProductId(product: ProductModel) {
        this.report.emit(product);
    }

    public handlerProductId2(boolVal: boolean) {
        this.test.emit(false);
    }

}

