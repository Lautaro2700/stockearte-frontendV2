import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { Store } from 'src/app/models/stores';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TiendasService } from 'src/app/services/tiendas.service';
import { StoreEdit } from 'src/app/models/storeEdit';

@Component({
  selector: 'app-manage-stores',
  templateUrl: './manage-stores.component.html',
  styleUrls: ['./manage-stores.component.css']
})
export class ManageStoresComponent implements OnInit {
  stores : Store[] = [];
  filteredStores: Store[] = [];
  filterForm: FormGroup;
  activeFilter: boolean = false;
  showElement: boolean = false;
  constructor(
    private authenticationService: AuthService,
    private tiendasService: TiendasService,
    private router: Router
  ){
    this.filterForm = new FormGroup({
      filter: new FormControl("", [Validators.required, Validators.pattern(/^[^<>]+$/)])
    });
  }
  ngOnInit() {
    const storeId = localStorage.getItem('storeId');
    this.showElement = storeId == '0'
    this.getStores();
  }  
  getStores(){
    this.tiendasService.obtenerTiendas().subscribe(
      (response) => {
          this.stores = response.stores; 
          this.filteredStores = this.stores;
      },
      (error) => {
          console.error('Error al obtener tiendas', error);
      }
  );
  }
  searchStore() {
    const searchTerm = this.filterForm.get('filter')?.value.toLowerCase();
    if (searchTerm) {
      this.filteredStores = this.stores.filter(store => 
        (store.code?.toLowerCase().includes(searchTerm) || '') || 
        (store.enabled ? 'true' : 'false') === searchTerm
      );
    } else {
      this.filteredStores = this.stores;
    }
    this.activeFilter = true;
  }
  cleanFilter() {
    this.filteredStores = this.stores;
    this.activeFilter = false;
    this.filterForm.get('filter')?.setValue('');
  }
  disableStore(id: number, code: string, enabled: boolean): void {
    const store: StoreEdit = {
      storeId: id,
      code: code,
      enabled: enabled,
    };
    this.tiendasService.editarTienda(store).subscribe(response => {
      if (response.success) {
        this.getStores()
      }
    });
  }
  createStore(){
    this.router.navigate(['/store/creation']);
  }
  logout(){
    this.authenticationService.logout();
  }
}
