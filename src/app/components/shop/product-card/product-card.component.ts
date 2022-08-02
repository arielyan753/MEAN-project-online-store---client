import { UserModel } from './../../../models/user.model';
import { environment } from './../../../../environments/environment';
import { ProductModel } from './../../../models/product.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartDetailsModel } from 'src/app/models/cart-details.model';
import { NotifyService } from 'src/app/services/notify.service';
import { CartDetailsService } from 'src/app/services/cart-details.service';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

    public productImagesUrl = environment.productsImageUrl;
    public amount: number = 1;
    public cartId: string = '';
    public clicked: string = '';
    public user: UserModel = new UserModel();

    constructor(
        private notifyService: NotifyService,
        private cartDetailsService: CartDetailsService) { }

    @Input()
    public product: ProductModel;

    @Output()
    public report = new EventEmitter<ProductModel>();

    @Output()
    public test = new EventEmitter<boolean>();

    ngOnInit() {
        this.cartId = store.getState().cartsState.cart._id;
        this.user = store.getState().authState.user;
    }

    //add the product to cart
    async addProductToCart() {
        let productAddToCart = new CartDetailsModel();
        productAddToCart.productId = this.product._id;
        productAddToCart.name = this.product.name;
        productAddToCart.amount = this.amount;
        productAddToCart.cartId = this.cartId;
        productAddToCart.totalPrice = this.product.price * this.amount;
    }

    //handle the flag of the btn buy now and add cart product
    async buyNow() {
        if (!this.clicked) {
            this.clicked = '1';
            return
        }
        if (this.amount === null) {
            this.notifyService.error("Amount can't be empty");
            return
        }
        let productAddToCart = new CartDetailsModel();
        productAddToCart.productId = this.product._id;
        productAddToCart.name = this.product.name;
        productAddToCart.amount = this.amount;
        productAddToCart.cartId = this.cartId;
        productAddToCart.totalPrice = this.product.price * this.amount;

        this.clicked = '';
        try {
            await this.cartDetailsService.addCartProduct(productAddToCart);
        }
        catch (err: any) {
            this.notifyService.error(err);
        }


    }

    // need to emit the product Id to shop component so that cart would have the product Id
    public sendProductId(): void {
        this.report.emit(this.product);
        this.test.emit(false);
    }
}



