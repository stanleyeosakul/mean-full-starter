import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../User/services/user.service';
import { User } from '../../../User/models/User';

@Component({
  selector: 'app-hero-navbar',
  templateUrl: './hero-navbar.component.html',
  styleUrls: ['./hero-navbar.component.scss']
})
export class HeroNavbarComponent implements OnInit {

  // Navbar Switch
  burgerSwitch: boolean;

  // User object
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
    @Inject('LOCALSTORAGE') private localStorage: any) { }

  ngOnInit() {
    // Get the user profile
    if (isPlatformBrowser(this.platformId) && this.localStorage.getItem('token')) {
      this.userService.getUser().subscribe((data: any) => this.user = data.user);
    }
  }

  // Toggles Navbar Hamburger
  toggleBurger() {
    this.burgerSwitch = !this.burgerSwitch;
  }

  // Logout
  logout() {
    this.user = null;
    this.localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
