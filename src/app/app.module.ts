import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageStocksComponent } from './components/manage-stocks/manage-stocks.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageStoresComponent } from './components/manage-stores/manage-stores.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { StoreCreationComponent } from './components/store-creation/store-creation.component';
import { StoreModificationComponent } from './components/store-modification/store-modification.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';
import { UserModificationComponent } from './components/user-modification/user-modification.component';
import { ProductCreationComponent } from './components/product-creation/product-creation.component';
import { ProductModificationComponent } from './components/product-modification/product-modification.component';
import { StockModificationComponent } from './components/stock-modification/stock-modification.component';
import { StockCreationComponent } from './components/stock-creation/stock-creation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ManageProductsComponent,
    ManageStocksComponent,
    ManageStoresComponent,
    ManageUsersComponent,
    StoreCreationComponent,
    StoreModificationComponent,
    UserCreationComponent,
    UserModificationComponent,
    ProductCreationComponent,
    ProductModificationComponent,
    StockCreationComponent,
    StockModificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
