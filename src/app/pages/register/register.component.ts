import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerform!: FormGroup;
  userList: any[] = [];
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.registerform = this.fb.group({
      fullname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  Registeration(): void{
    if(this.registerform.valid){
      this.userService.RegisterUser(this.registerform.value).subscribe((res: any) => {
        if(res){
          this.toast.success('Successfully Register', "Success");
          this.router.navigate(['login']);
        }
        else {
          this.toast.error('Error register');
        }
      })
    }else{
      this.toast.error('Please enter invalid');
     }
  }
}
