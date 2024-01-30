import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../services/product.service';
import { Category } from '../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  id!: string;
  form: FormGroup;
   cateList: Category[] | any[] = []; 
  constructor(
    private productService: ProductService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cateService: CategoryService,
    private toastSevice: ToastrService,
  ){
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.getAllCate();
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.productService.getProductById(this.id).subscribe((data) => {
        console.log(this.form.status);
        this.form.patchValue({
          category: data.category,
          title: data.title,
          price: data.price,
          image: data.image,
          description: data.description,
        });
      });
    }
  }
  onSubmit(): void{
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    if(this.id){
       this.productService
      .updateProductAdmin(this.id, data)
      .subscribe((data) => {
        this.toastSevice.success('Succeesfully Updated',"Success");
        this.router.navigateByUrl('admin/products');
      });
    }
  }
  getAllCate():void{
    this.cateService.getAllCate().subscribe(cates => {
      this.cateList = cates
    })
  }
}
