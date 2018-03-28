import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../Shared/services/seo.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  // Initialize variables
  user: User = {
    email: '',
    password: '',
    confirmPassword: ''
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
      'MEANkit.io | Register',
      'Register new user on MEANkit.io',
      'article',
      'https://www.meankit.io/users/register'
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
        // Validate Password
        if (!this.userService.validatePassword(user.password)) {
          this.errorMessage = 'Please enter a password between 6-20 characters which contains at least one numeric digit, one uppercase, and one lowercase letter';
          return false;
        }
        if (user.confirmPassword) {
          if (user.password === user.confirmPassword) {
            return true;
          } else {
            this.errorMessage = 'Passwords do not match.';
          }
        } else {
          this.errorMessage = 'Please enter a confirmation password.';
        }
      } else {
        this.errorMessage = 'Please enter a password.';
      }
    } else {
      this.errorMessage = 'Please enter an email address.';
    }
  }

  // Register User
  register() {
    if (this.validate(this.user)) {
      this.userService.registerUser(this.user.email, this.user.password)

        // If email is unique, token gets stored in localStorage
        .mergeMap((data: any) => {
          if (data.success) {
            this.localStorage.setItem('token', `Bearer ${data.token}`);
            return this.userService.getUser();
          } else {
            this.errorMessage = data.message;
            this.errorToggle = true;
            this.user = { email: this.user.email, password: '', confirmPassword: '' };
            return this.userService.getUser();
          }
        }).subscribe((res) => this.userService.redirectToHomePage(), (error) => {});

    } else {
      this.errorToggle = true;
      return false;
    }
  }

}
