import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canActivate(): boolean {
    const isValidToken = this.tokenService.isValidRefreshToken();
    console.log('isValidToken from AuthGuard ', isValidToken);
    if (!isValidToken) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
