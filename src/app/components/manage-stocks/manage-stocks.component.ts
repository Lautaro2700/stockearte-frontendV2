import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { Stocks } from 'src/app/models/stocks';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-manage-stocks',
  templateUrl: './manage-stocks.component.html',
  styleUrls: ['./manage-stocks.component.css']
})
export class ManageStocksComponent implements OnInit {
  stocks : Stocks[] = [];
  showElement: boolean = false;
  constructor(
    private authenticationService: AuthService,
    private stockService: StockService
  ){}
  ngOnInit() {
    const storeId = localStorage.getItem('storeId');
    this.showElement = storeId !== '0'
    this.getStocks();
  }  
  getStocks(){
    this.stockService.obtenerStocks().subscribe(
      (response) => {
        console.log(response)
        this.stocks = response.stocks; 
      },
      (error) => {
        console.error('Error al obtener stocks', error);
      }
  );
  }
  logout(){
    this.authenticationService.logout();
  }
}
