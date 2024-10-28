import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { Catalogo } from 'src/app/models/catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
    selector: 'app-catalogo-creation',
    templateUrl: './catalogo-creation.component.html',
    styleUrls: ['./catalogo-creation.component.css']
})
export class CatalogoCreationComponent {

    constructor(
        private authenticationService: AuthService,
        private catalogoService: CatalogoService,
        private router: Router
    ){}


    catalogo: Catalogo = {
        titulo: '',
        tiendaID: 0,
        productos: []
    };



    addProduct(): void {
        const newProduct: Product = { nombre: '', codigo: '' };
        this.catalogo.productos!.push(newProduct);
    }

    removeProduct(index: number): void {
        this.catalogo.productos!.splice(index, 1);
    }

    onSubmit(): void {
        if (this.catalogo.titulo && this.catalogo.productos?.length) {
            this.catalogoService.createCatalogo(this.catalogo).subscribe(
                response => {
                    console.log('Catálogo creado:', response);
                    this.router.navigate(['/catalogo']);
                },
                error => {
                    console.error('Error al crear el catálogo:', error);
                }
            );
        }
    }

    logout(){
        this.authenticationService.logout();
      }
}