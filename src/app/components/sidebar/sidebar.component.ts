import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuList = [
    {
      label: 'Products',
      link: '/admin/products'
    },
  ]
}
