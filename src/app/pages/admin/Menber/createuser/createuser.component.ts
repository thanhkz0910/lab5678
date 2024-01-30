import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup,Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../types/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css'
})
export class CreateUserComponent {
  form!:FormGroup;
  userList: User[] | any[] = []; 
  constructor(
    private userService: UserService, 
    private toastrService:ToastrService, 
    private fb:FormBuilder,
    private router : Router){}
    ngOnInit():void {
    this.form = this.fb.group({
      fullname: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }



  onSubmit(): void {
   if(this.form.valid){
      this.userService.createUser(this.form.value).subscribe((res: any) => {
       if (res) {
         this.toastrService.success('Successfully created', "Success");
         this.router.navigate(['admin/users']);
       } else {
         this.toastrService.error('Error creating');
       }
     })
   }
  }
}
