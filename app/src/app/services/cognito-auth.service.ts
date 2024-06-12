// cognito-auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoAuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private readonly AWS_REGION = environment.AWS_REGION;
  private readonly USER_POOL_ID = environment.USER_POOL_ID;
  private readonly CLIENT_ID = environment.CLIENT_ID;
  private readonly AUTH_URI = environment.AUTH_URI;
  private readonly REDIRECT_URI = environment.REDIRECT_URI;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      // Check if the access token is expired
      const isExpired = this.jwtHelper.isTokenExpired(accessToken);
      return !isExpired;
    }

    return false;
  }


  // Login with Facebook
  loginWithFacebook() {
    const facebookLoginUrl = `https://${this.AUTH_URI}/oauth2/authorize?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&identity_provider=Facebook`;
    window.location.href = facebookLoginUrl;
  }

  // Login with Google
  loginWithGoogle() {
    const googleLoginUrl = `https://${this.AUTH_URI}/oauth2/authorize?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&identity_provider=Google`;
    window.location.href = googleLoginUrl;
  }

  // Login with Cognito
  loginWithCognito() {
    console.log("++++++++++++++++++",this.REDIRECT_URI);
    const cognitoLoginUrl = `https://${this.AUTH_URI}/login?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}`;
    window.location.href = cognitoLoginUrl;
  }

  // Exchange authorization code for Cognito JWT tokens
  exchangeCodeForTokens(code: string): Observable<void> {
    const tokenEndpoint = `https://${this.AUTH_URI}/oauth2/token`;
    const requestBody = `grant_type=authorization_code&client_id=${encodeURIComponent(this.CLIENT_ID)}&redirect_uri=${encodeURIComponent(this.REDIRECT_URI)}&code=${encodeURIComponent(code)}`;

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<{ id_token: string, access_token: string, refresh_token: string }>(tokenEndpoint, requestBody, { headers })
      .pipe(
        tap(response => {
          const { id_token, access_token, refresh_token } = response;
          // Store the tokens securely (e.g., in local storage)
          localStorage.setItem('id_token', id_token);
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
        }),
        map(() => void 0)
      );
  }

  // Verify the Cognito JWT token
  async verifyToken(token: string) {

    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.USER_POOL_ID,
      tokenUse: 'access',
      clientId: this.CLIENT_ID
    })

    try {
      const payload = await verifier.verify(token);
      console.log("Token is valid. Payload:", payload);
    } catch {
      console.log("Token not valid!");
    }
  }

  // Refresh the Cognito JWT tokens
  refreshTokens(): Observable<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    const tokenEndpoint = `https://${this.AUTH_URI}/oauth2/token`;
    const requestBody = {
      grant_type: 'refresh_token',
      client_id: this.CLIENT_ID,
      refresh_token: refreshToken
    };

    return this.http.post<{ id_token: string, access_token: string }>(tokenEndpoint, requestBody)
      .pipe(
        tap(response => {
          const { id_token, access_token } = response;
          // Update the stored tokens
          localStorage.setItem('id_token', id_token);
          localStorage.setItem('access_token', access_token);
        }),
        map(() => void 0)
      );
  }

  // Logout
  logout() {
    // Clear the stored tokens
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Redirect to the Cognito logout URL
    const logoutUrl = `${this.AUTH_URI}/logout?client_id=${this.CLIENT_ID}&logout_uri=${this.REDIRECT_URI}`;
    window.location.href = logoutUrl;
  }

  // Login with Cognito user credentials
  loginWithCognitoWithCreds(email: string, password: string): Observable<any> {
    const loginEndpoint = `https://cognito-idp.${this.AWS_REGION}.amazonaws.com/us-east-1_sSfL2aipf/.well-known/jwks.json`;
    const requestBody = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    };

    return this.http.post<any>(loginEndpoint, requestBody)
      .pipe(
        tap(response => {
          const { IdToken, AccessToken, RefreshToken } = response.AuthenticationResult;
          // Store the tokens securely (e.g., in local storage)
          localStorage.setItem('id_token', IdToken);
          localStorage.setItem('access_token', AccessToken);
          localStorage.setItem('refresh_token', RefreshToken);
        }),
        map(() => void 0),
        catchError(error => {
          console.error('Cognito login failed:', error);
          return throwError(error);
        })
      );
  }

  // Register a new user with Cognito
  registerUser(email: string, password: string): Observable<void> {
    const signUpEndpoint = `https://cognito-idp.${this.AWS_REGION}.amazonaws.com/`;
    const requestBody = {
      ClientId: this.CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        }
      ]
    };

    return this.http.post<void>(signUpEndpoint, requestBody)
      .pipe(
        tap(response => console.log('User registration response:', response)),
        catchError(error => {
          console.error('User registration failed:', error);
          return throwError(error);
        })
      );
  }
}
