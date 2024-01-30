import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProductsComponent } from '../../pages/admin/Productss/products/products.component';
import { CreateComponent } from '../../pages/admin/Productss/create/create.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ProductsComponent, CreateComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  
}
