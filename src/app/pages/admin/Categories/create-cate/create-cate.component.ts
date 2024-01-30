import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-create-cate',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './create-cate.component.html',
  styleUrl: './create-cate.component.css'
})
export class CreateCateComponent {
  form!:FormGroup;
  constructor(
    private cateService: 
    CategoryService, 
    private toastrService:ToastrService, 
    private fb:FormBuilder,
    private router : Router){}
    ngOnInit():void {
    this.form = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
    });
  }



  onSubmit(): void {
   if(this.form.valid){
      this.cateService.createCate(this.form.value).subscribe((res: any) => {
       if (res) {
        console.log(res);
         this.toastrService.success('Successfully created', "Success");
         this.router.navigate(['admin/categories']);
       } else {
         this.toastrService.error('Error creating');
       }
     })
   }else{
    this.toastrService.error('Error creating');
   }
  }
}
