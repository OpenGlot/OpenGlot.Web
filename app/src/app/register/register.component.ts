import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoAuthService } from '../services/cognito-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private authService: CognitoAuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      // Passwords do not match, display an error message
      console.error('Passwords do not match');
      return;
    }

    this.authService.registerUser(this.email, this.password)
      .subscribe({
        next: () => {
          // Registration successful, navigate to the login page
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
          // Display an error message to the user
        }
      });
  }
}