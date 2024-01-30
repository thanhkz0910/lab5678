import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule, RouterLink],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EditUserComponent {
  id!: string;
  form: FormGroup;
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService
  ){
    this.form = this.formBuilder.group({
      fullname: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.userService.getUserById(this.id).subscribe((data) => {
        console.log(this.form.status);
        this.form.patchValue({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
          role: data.role,
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
       this.userService
      .updateUser(this.id, data)
      .subscribe((data) => {
        this.toastrService.success('Successfully updated', "Success");
        this.router.navigateByUrl('admin/users');
      });
    }
    else {
      this.toastrService.error('Error Update, Error');
    }
  }
}
