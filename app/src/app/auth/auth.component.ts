import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CognitoAuthService } from '../services/cognito-auth.service';

@Component({
  selector: 'app-auth',
  template: '<div>Processing authentication...</div>'
})
export class AuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: CognitoAuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.exchangeCodeForTokens(code).subscribe({
          next: () => {
            // Tokens exchanged successfully, navigate to a protected route or home page
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            console.error('Failed to exchange code for tokens:', error);
            // Handle the error, display an error message, or redirect to an error page
            this.router.navigate(['/error']);
          }
        });
      } else {
        console.error('Authorization code not found in the URL');
        // Handle the case when the code is missing, redirect to an error page or login page
        this.router.navigate(['/login']);
      }
    });
  }
}