import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { onErrorResumeNext } from 'rxjs-compat/operator/onErrorResumeNext';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      console.log('test');
    } else {
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        (errorRes) => {
          console.log(errorRes.error.error.message);
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'This email exists already!';
          }
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
