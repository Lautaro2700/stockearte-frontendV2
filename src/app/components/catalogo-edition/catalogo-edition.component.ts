import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../models/catalogo';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/services/auth-service';

@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo-edition.component.html',
    styleUrls: ['./catalogo-edition.component.css']
})
export class CatalogoEditionComponent {

    catalogo: Catalogo = {
        titulo: '',
        tiendaID: 0,
        productos: []
    };

    constructor(
        private catalogoService: CatalogoService,
        private authenticationService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const catalogoId = this.route.snapshot.paramMap.get('id');
        if (catalogoId) {
            this.catalogoService.getCatalogoById(+catalogoId).subscribe({
                next: (data) => {
                    this.catalogo = data; 
                    console.log('Catálogo cargado:', this.catalogo);
                },
                error: (err) => {
                    console.error('Error al cargar el catálogo:', err);
                }
            });
        }
    }

    updateCatalogo() {
        this.catalogoService.updateCatalogo(this.catalogo).subscribe(
            () => {
                console.log('Catálogo actualizado correctamente');
                this.router.navigate(['/catalogo']);
            },
            (error) => {
                console.error('Error al actualizar el catálogo', error);
            }
        );
    }

    logout(){
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}