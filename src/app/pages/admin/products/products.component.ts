import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductAdmin } from '../../../types/Product';
import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router'; // import service
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, RouterLink, SidebarComponent, ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productService = inject(ProductService); // inject vao bien
  productList: ProductAdmin[] = [];
  ngOnInit(): void {
    this.productService
      .getProductListAdmin()
      .subscribe((products) => (this.productList = products)); // callApi.then(cb fuc)
  }

  handleDeleteProduct(id: string) {
    const isDelete = confirm('Are you sure you want to delete this product');
    if (isDelete) {
      this.productService
        .deleteProductAdmin(id)
        .subscribe(
          () =>
          (this.productList = this.productList.filter(
            (product) => product.id !== id
          ))
        );
    }
  }
  
}
