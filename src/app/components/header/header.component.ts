import { Component, OnInit  } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor,RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}
  menuList = [
    {
      label: 'Home',
      link: '/home',
    },
    {
      label: 'About Us',
      link: '/about-us',
    },
    {
      label: 'Shop',
      link: '/shop',
    },
    {
      label: 'Contact',
      link: '/',
    },
    {
      label: 'Admin',
      link: '/login',
    },
  ]; 
  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }
  logout() {
    this.userService.logout();
    this.isLoggedIn = false; // Cập nhật trạng thái đăng nhập sau khi đăng xuất
  }
}
