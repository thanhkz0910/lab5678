import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { User } from '../../../../types/User';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [NgFor, SidebarComponent, RouterLink],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {
  userSevice = inject(UserService);
  toastrService = inject(ToastrService) // inject vao bien
  userList: User[] = [];
  ngOnInit(): void {
    this.userSevice
      .getUserList()
      .subscribe((users) => (this.userList = users)); // callApi.then(cb fuc)
  }

  deleteUser(id: string){
    const isDelete = confirm('Are you sure you want to delete this product');
    if(isDelete){
      this.userSevice.deleteUser(id).subscribe(() => 
       (this.userList = this.userList.filter(
          (user) => user.id !== id
       )) 
      )
      this.toastrService.success("Successfully deleted", "Success")
    }
  }
} 
