import { Component, OnInit, Inject } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  // Initialize variables
  user: User = {
    email: '',
    password: ''
  };
  errorToggle: boolean;
  errorMessage: string;

  constructor(
    private seo: SeoService,
    private userService: UserService,
    @Inject('LOCALSTORAGE') private localStorage: any) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Login',
      'Login to MEANkit.io',
      'article',
      'https://www.meankit.io/users/login'
    );
  }

  // Validate form
  validate(user) {
    if (user.email) {
      // Validate Email
      if (!this.userService.validateEmail(user.email)) {
        this.errorMessage = 'Please use a valid email address';
        return false;
      }
      if (user.password) {
        return true;
      } else {
        this.errorMessage = 'Please enter a password.';
      }
    } else {
      this.errorMessage = 'Please enter an email address.';
    }
  }

  // User login
  login() {
    if (this.validate(this.user)) {
      this.userService.loginUser(this.user.email, this.user.password)

        // If the username/password combination is correct, store token in localStorage
        .mergeMap((data: any) => {
          if (data.success) {
            this.localStorage.setItem('token', data.token);
            return this.userService.getUser();
          } else {
            this.errorMessage = data.message;
            this.errorToggle = true;
            return this.userService.getUser();
          }
        }).subscribe((res) => this.userService.redirectToHomePage(), (error) => {});

    } else {
      this.errorToggle = true;
    }
  }

}
