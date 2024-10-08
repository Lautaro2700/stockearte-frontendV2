import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth-service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products : Product[] = [];
  filteredProducts: Product[] = [];
  filterForm: FormGroup;
  activeFilter: boolean = false;
  showElement: boolean = false;
  constructor(
    private authenticationService: AuthService,
    private productosService: ProductosService,
    private router: Router
  ){
    this.filterForm = new FormGroup({
      search: new FormControl('', [Validators.pattern(/^[^<>]+$/)])
    });
  }
  ngOnInit() {
    const storeId = localStorage.getItem('storeId');
    this.showElement = storeId == '0'
    this.getProducts(this.showElement);
  }  
  getProducts(showElement: boolean){
    const requestBody: Product = {
      nombre : "GetAllList"
    };
    if(showElement){
      this.productosService.filtrarProducto(requestBody).subscribe({
        next: (response) => {
          console.log(response);
          this.products = response.products;
          this.filteredProducts = this.products;
        },
        error: (error) => {
          console.error('Error al obtener productos', error);
        }
      });
    } else {
      this.productosService.filtrarProducto(requestBody).subscribe({
        next: (response) => {
          console.log(response);
          this.products = response.products;
          this.filteredProducts = this.products;
        },
        error: (error) => {
          console.error('Error al obtener productos', error);
        }
      });
    }
  }
  searchProduct() {
    const searchTerm = this.filterForm.get('search')?.value.toLowerCase();
    if (searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        (product.codigo?.toLowerCase().includes(searchTerm) || '') ||
        (product.nombre?.toLowerCase().includes(searchTerm) || '') ||
        (product.talle?.toLowerCase().includes(searchTerm) || '') ||
        (product.color?.toLowerCase().includes(searchTerm) || '')
      );
    } else {
      this.filteredProducts = this.products;
    }

    this.activeFilter = true;
  }
  cleanFilter() {
    this.filteredProducts = this.products;
    this.activeFilter = false;
    this.filterForm.reset();
  }
  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
            alert('Producto eliminado exitosamente');
          } else {
            alert('Error al eliminar el producto');
          }
        },
        error: (error) => {
          console.error('Error al eliminar el producto', error);
          alert('Ocurrió un error al intentar eliminar el producto.');
        }
      });
    }
  }
  createProduct(){
    this.router.navigate(['/product/creation']);
  }
  logout(){
    this.authenticationService.logout();
  }
}
