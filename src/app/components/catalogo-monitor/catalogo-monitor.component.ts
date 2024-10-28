import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../models/catalogo';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/services/auth-service';

@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo-monitor.component.html',
    styleUrls: ['./catalogo-monitor.component.css']
})
export class CatalogoMonitorComponent {
    catalogos: Catalogo[] = [];
    errorMessage: string = '';
    expandedCatalogs: { [key: number]: boolean } = {};
    

    constructor(
        private catalogoService: CatalogoService,
        private authenticationService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getCatalogos(); 
    }

    createCatalogo() {
        this.router.navigate(['/catalogo/creation']);
    }

    deleteCatalogo(id: number) {
        const confirmation = confirm('¿Estás seguro de que deseas eliminar este catálogo?');
        if (confirmation) {
            this.catalogoService.deleteCatalogo(id).subscribe(
                response => {
                    alert('Catálogo eliminado con éxito.');
                    this. getCatalogos();
                },
                error => {
                    alert('Ocurrió un error al eliminar el catálogo.');
                }
            );
        }
    }

    toggleCatalog(catalogoId: number) {
        this.expandedCatalogs[catalogoId] = !this.expandedCatalogs[catalogoId];
    }

    getCatalogos(): void {
        this.catalogoService.getAllCatalogos().subscribe({
            next: (data) => {
                console.log("Respuesta recibida:", data);  // Verifica la estructura completa de data
                
                // Si los datos vienen encapsulados, accede a 'data.catalogos'
                this.catalogos = data.catalogos || data;
                
                console.log("Catálogos asignados:", this.catalogos); // Confirma que los catálogos tienen el formato esperado
            },
            error: (err) => {
                this.errorMessage = 'Error al cargar los catálogos: ' + err.message;
                console.error("Error en getCatalogos:", err);
            }
        });
    }

    logout(){
        this.authenticationService.logout();
      }
}
