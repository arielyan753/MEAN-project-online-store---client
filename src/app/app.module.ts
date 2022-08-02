import { WelcomeComponent } from './components/auth-area/welcome/welcome.component';
import { ProductCardComponent } from './components/shop/product-card/product-card.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { LoadingComponent } from './components/layout-area/loading/loading.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { ProductListComponent } from './components/shop/products-list/products-list.component';
import { ShopComponentComponent } from './components/shop/shop-component/shop-component.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { CartDetailsRowComponent } from './components/shop/cart-details-row/cart-details-row.component';
import { JwtInterceptor } from './services/jwt.interceptor.service';
import { FinalCartComponent } from './components/order-area/final-cart/final-cart.component';
import { OrderFormComponent } from './components/order-area/order-form/order-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReceiptComponent } from './components/order-area/receipt/receipt.component';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { AddProductAdminComponent } from './components/admin-area/add-product-admin/add-product-admin.component';
import { UpdateProductAdminComponent } from './components/admin-area/update-product-admin/update-product-admin.component';
import { highlight } from './pipe/hight-light';
import { Loading2Component } from './components/layout-area/loading2/loading2.component';


@NgModule({
  declarations: [
    LayoutComponent,
    RegisterComponent,
    LoginComponent,
    AuthMenuComponent,
    LogoutComponent,
    MenuComponent,
    LoadingComponent,
    HeaderComponent,
    OrderComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductListComponent,
    ShopComponentComponent,
    CartComponent,
    CartDetailsRowComponent,
    WelcomeComponent,
    FinalCartComponent,
    OrderFormComponent,
    ReceiptComponent,
    AdminComponent,
    AddProductAdminComponent,
    UpdateProductAdminComponent,
    highlight,
    Loading2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSidenavModule
  ],
  providers: [{
    useClass: JwtInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
