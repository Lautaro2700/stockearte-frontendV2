import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service'; 
import { Product } from 'src/app/models/product';
@Component({
    selector:'app-manage-news',
    templateUrl: './manage-news.component.html',
    styleUrls: ['./manage-news.component.css']
})
export class ManageNewsComponent implements OnInit{
  
    novedades: any[] = [];

    constructor(
        private authenticationService: AuthService,
        private productosService: ProductosService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.getNovedades();
    }

    logout(){
        this.authenticationService.logout();
      }

    getNovedades() {
        this.productosService.getNovedades().subscribe(
            (response: any) => {
                if (Array.isArray(response.products)) {
                    this.novedades = response.products;
                } else if (response.product) {
                    this.novedades = [response.product];
                } else {
                    this.novedades = [];
                }
                console.log('Novedades recibidas:', this.novedades);
            },
            (error) => {
                console.error('Error al cargar novedades:', error);
            }
        );
    }

    darDeAlta(producto: Product): void {
        this.productosService.crearProductos(producto).subscribe(
          response => {
            console.log('Producto dado de alta correctamente', response);
            this.router.navigate(['/news']);
          },
          error => {
            console.error('Error al dar de alta el producto', error);
          }
        );
      }
    
}