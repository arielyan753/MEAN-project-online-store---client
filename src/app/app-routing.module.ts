import { OrderComponent } from './components/order-area/order/order.component';
import { AuthGuard } from './services/auth.guard';
import { WelcomeComponent } from './components/auth-area/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponentComponent } from './components/shop/shop-component/shop-component.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { ReceiptComponent } from './components/order-area/receipt/receipt.component';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { AdminGuard } from './services/admin.guard';
import { OrderGuard } from './services/order.guard';



const routes: Routes = [
  { path: "shop", component: ShopComponentComponent, canActivate: [AuthGuard] },
  { path: "welcome", component: WelcomeComponent },
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "logout", component: LogoutComponent },
  { path: "order", component: OrderComponent, canActivate: [OrderGuard] },
  { path: "receipt", component: ReceiptComponent },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  { path: "**", redirectTo: "/welcome" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
