import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStocksComponent } from './components/manage-stocks/manage-stocks.component';
import { ManageStoresComponent } from './components/manage-stores/manage-stores.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AuthService } from './services/auth-service';
import { LoginComponent } from './components/login/login.component';
import { StoreCreationComponent } from './components/store-creation/store-creation.component';
import { StoreModificationComponent } from './components/store-modification/store-modification.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';
import { UserModificationComponent } from './components/user-modification/user-modification.component';
import { ProductCreationComponent } from './components/product-creation/product-creation.component';
import { ProductModificationComponent } from './components/product-modification/product-modification.component';
import { StockCreationComponent } from './components/stock-creation/stock-creation.component';
import { StockModificationComponent } from './components/stock-modification/stock-modification.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'stores', component: ManageStoresComponent, canActivate: [AuthService]},
  {path: 'products', component: ManageProductsComponent, canActivate: [AuthService]},
  {path: 'stocks', component: ManageStocksComponent, canActivate: [AuthService]},
  {path: 'users', component: ManageUsersComponent, canActivate: [AuthService]},
  {path: 'store/creation', component: StoreCreationComponent, canActivate: [AuthService]},
  {path: 'store/edit/:storeId', component: StoreModificationComponent, canActivate: [AuthService]},
  {path: 'user/creation', component: UserCreationComponent, canActivate: [AuthService]},
  {path: 'user/edit/:userId', component: UserModificationComponent, canActivate: [AuthService]},
  {path: 'product/creation', component: ProductCreationComponent, canActivate: [AuthService]},
  {path: 'product/edit/:productId', component: ProductModificationComponent, canActivate: [AuthService]},
  {path: 'stock/creation', component: StockCreationComponent, canActivate: [AuthService]},
  {path: 'stock/edit/:stockId', component: StockModificationComponent, canActivate: [AuthService]},
  {path: '**', redirectTo: '/stores'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
