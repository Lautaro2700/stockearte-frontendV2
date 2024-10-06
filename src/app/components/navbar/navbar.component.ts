import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() activeSection!: string;

  constructor(
    private router: Router
  ){ }

  sections: any = [
    {name: "TIENDAS", path: "/stores"},
    {name: "PRODUCTOS", path: "/products"},
    {name: "STOCKS", path: "/stocks"},
    {name: "USUARIOS", path: "/users"}
  ]

  navigateTo(path: string){
    this.router.navigate([path])
  }

}
