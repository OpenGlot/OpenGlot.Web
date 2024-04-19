import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoAuthService } from '../services/cognito-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: CognitoAuthService) {}

  onSubmit() {
    this.authService.loginWithCognitoWithCreds(this.email, this.password)
      .subscribe({
        next: () => {
          // Login successful, navigate to a protected route or home page
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          // Display an error message to the user
        }
      });
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithCognito() {
    this.authService.loginWithCognito();
  }
}