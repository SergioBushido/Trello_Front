import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { CustomValidators } from '@utils/validators';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });

  form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.minLength(4), Validators.required]],
    name: ['', [Validators.maxLength(60), Validators.required]],
    lastname: ['', [Validators.maxLength(60), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(4), Validators.required]],
    confirmPassword: ['', [Validators.required]],
    roleId: [0],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  statusUser: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showRegister = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { username, name, lastname, email, password, roleId } = this.form.getRawValue();
      this.authService.registerAndLogin(username, name, lastname, email, password, roleId)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards']);
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
  
      this.authService.isAvailable(email)
        .subscribe({
          next: (isAvailable) => {
            this.statusUser = 'success';
            if (isAvailable) {  // Si el email está disponible
              this.showRegister = true;
              this.form.controls['email'].setValue(email);
            } else {
              // Navegar al login si el email ya está registrado
              this.router.navigate(['/login'], {
                queryParams: { email }
              });
            }
          },
          error: (error) => {
            this.statusUser = 'failed';
            console.log(error);
          }
        });
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
