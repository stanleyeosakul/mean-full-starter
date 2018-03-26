import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../../Shared/services/seo.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styles: []
})
export class EditProfileComponent implements OnInit {

  // Initialize variables
  currentUser: User = {
    email: '',
    password: '',
    confirmPassword: '',
    profile_pic: null
  };
  imageName: string;
  resetSwitch: boolean;
  errorToggle: boolean;
  errorMessage: string;

  constructor(
    private seo: SeoService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId,
    @Inject('LOCALSTORAGE') private localStorage: any) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Edit Profile',
      'Edit User Profile for user on MEANkit.io',
      'article',
      'https://www.meankit.io/users/edit-profile'
    );

    // Get the user profile
    if (isPlatformBrowser(this.platformId) && this.localStorage.getItem('token')) {
      this.userService.getUser().subscribe((data: any) => this.currentUser = data.user);
    }
  }

  // Show modal to confirm delete
  toggleReset() {
    this.resetSwitch = !this.resetSwitch;
  }

  // Validate form
  validate(user: User) {
    if (user.displayName) {
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
          this.errorMessage = 'Please enter confirmation password.';
        }
      } else {
        if (!user.confirmPassword) {
          return true;
        } else {
          this.errorMessage = 'Please enter new password.';
        }
      }
    } else {
      this.errorMessage = 'Please enter your Display Name.';
    }
  }

  // Retrieve file image from form
  fileChange(e: any) {
    this.currentUser.profile_pic = e.target.files[0];
    this.imageName = this.currentUser.profile_pic.name;
  }

  // Edit user's profile
  editProfile() {

    if (this.validate(this.currentUser)) {

      // Generate a new form to pass in the the request object for multer compatibility
      const form = new FormData();
      for (const key in this.currentUser) {
        if (this.currentUser.hasOwnProperty(key)) form.append(key, this.currentUser[key]);
      }

      // Save updates to the database and profile pic to AWS S3 storage
      this.userService.updateProfile(form)
        .subscribe((res) => this.userService.redirectToHomePage(), (error) => {});
    } else {
      this.errorToggle = true;
      return false;
    }

  }

  // Reset profile picture to default
  resetImage() {
    this.userService.resetProfilePicture('assets/images/anonymous.png')
      .subscribe((res) => this.userService.redirectToHomePage(), (error) => {});
  }

}
