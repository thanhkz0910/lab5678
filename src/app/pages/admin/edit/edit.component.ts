import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../services/product.service';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ToastModule, CommonModule,],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [MessageService],
})
export class EditComponent {
  id!: string;
  form: FormGroup;
  constructor(
    private productService: ProductService, 
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        this.messageService.add({
          severity: 'Successfully',
          summary: 'Successfully',
          detail: 'Add Successfully',
        });
        this.router.navigateByUrl('admin/products');
      });
    }
  }
}
