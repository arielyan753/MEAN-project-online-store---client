import { CategoryModel } from './../models/category.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { firstValueFrom } from 'rxjs';
import store from '../redux/store';
import { addProductAction, deleteProductAction, fetchProductsAction, updateProductAction } from '../redux/products-state';
import { getCategoriesAction } from '../redux/categories-state';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    public async getCategories(): Promise<CategoryModel[]> {
        let categories = store.getState().categoriesState.categories;
        if (categories.length === 0) {
            categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl));
            store.dispatch(getCategoriesAction(categories))
        }
        return categories;
    }

    public async getProductsByCategory(categoryId: string): Promise<ProductModel[]> {
        let products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsByCategoryUrl + categoryId));
        return products
    }

    public async getAllProducts(): Promise<ProductModel[]> {
        let products = store.getState().productsState.products;
        if (products.length === 0) {
            products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl));
            store.dispatch(fetchProductsAction(products));
        }
        return products;
    }

    public async getOneProduct(_id: string): Promise<ProductModel> {
        let products = await this.getAllProducts();
        const product = products.find(p => p._id === _id);
        return product;
    }

    public async addProduct(product: ProductModel): Promise<ProductModel> {

        // Convert ProductModel into FormData:
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("categoryId", product.categoryId);
        formData.append("image", product.image);

        const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, formData));

        store.dispatch(addProductAction(addedProduct));

        return addedProduct;
    }

    public async updateProduct(product: ProductModel): Promise<ProductModel> {
        const formData = new FormData();
        formData.append("_id", product._id);
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("categoryId", product.categoryId);
        formData.append("image", product.image);

        const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.productsUrl + product._id, formData));

        store.dispatch(updateProductAction(updatedProduct));

        return updatedProduct;
    }

    public async deleteProduct(_id: string): Promise<void> {
        await firstValueFrom(this.http.delete(environment.productsUrl + _id));
        store.dispatch(deleteProductAction(_id));
    }

}
