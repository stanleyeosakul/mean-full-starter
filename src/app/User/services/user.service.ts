import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('WINDOWLOCATION') private windowLocation: any,
    @Inject('LOCALSTORAGE') private localStorage: any) { }

  // Validate Email
  validateEmail(email): boolean {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email.toLowerCase());
  }

  // Validate Password
  validatePassword(password): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password);
  }

  // Redirect to Home Page
  redirectToHomePage(): void {
    this.windowLocation.href = 'http://localhost:4200/';
  }

  // Authorization header containing JWT
  getHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.localStorage.getItem('token');
      return (token) ? new HttpHeaders().set('Authorization', token) : null;
    }
  }

  // Get User Profile
  getUser(): Observable<object> {
    return this.http.get('http://localhost:3000/api/auth/profile', { headers: this.getHeaders() });
  }

  // Register User
  registerUser(email: string, password: string): Observable<object> {
    return this.http.post('http://localhost:3000/api/auth/register', { email, password }, { headers: this.getHeaders() });
  }

  // Login User
  loginUser(email: string, password: string): Observable<object> {
    return this.http.post('http://localhost:3000/api/auth/login', { email, password }, { headers: this.getHeaders() });
  }

  // Update Profile
  updateProfile(form: any): Observable<object> {
    return this.http.post('http://localhost:3000/api/auth/profile', form, { headers: this.getHeaders() });
  }

  // Reset Profile Picture
  resetProfilePicture(imageURL: string) {
    return this.http.post('http://localhost:3000/api/auth/reset', { imageURL }, { headers: this.getHeaders() });
  }

}
