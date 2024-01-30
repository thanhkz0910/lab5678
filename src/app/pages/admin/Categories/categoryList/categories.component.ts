import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Category } from '../../../../types/Category';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, SidebarComponent, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categoryService = inject(CategoryService);
  toastrService = inject(ToastrService) // inject vao bien
  categoryList: Category[] = [];
  ngOnInit(): void {
    this.categoryService
      .getAllCate()
      .subscribe((categories) => (this.categoryList = categories)); // callApi.then(cb fuc)
  }

  deleteCategory(id: string){
    const isDelete = confirm('Are you sure you want to delete this product');
    if(isDelete){
      this.categoryService.deleteCate(id).subscribe(() => 
       (this.categoryList = this.categoryList.filter(
          (category) => category.id !== id
       )) 
      )
      this.toastrService.success("Successfully deleted", "Success")
    }
  }
}
