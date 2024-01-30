import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../../services/category.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-cate',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule, RouterLink],
  templateUrl: './edit-cate.component.html',
  styleUrl: './edit-cate.component.css'
})
export class EditCateComponent {
  id!: string;
  form: FormGroup;
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cateService: CategoryService,
    private toastrService: ToastrService
  ){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.cateService.getCateById(this.id).subscribe((data) => {
        console.log(this.form.status);
        this.form.patchValue({
          name: data.name,
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
       this.cateService
      .updateCate(this.id, data)
      .subscribe((data) => {
        this.toastrService.success('Successfully updated', "Success");
        this.router.navigateByUrl('admin/categories');
      });
    }
    else {
      this.toastrService.error('Error Update, Error');
    }
  }
}
