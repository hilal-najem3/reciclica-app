import { recoverPasswordSuccess, recoverPasswordFail } from './../../../store/login/login.actions';
/* eslint-disable @typescript-eslint/member-ordering */
import { LoginState } from './../../../store/login/LoginState';
import { ToastController } from '@ionic/angular';
import { recoverPassword } from './../../../store/login/login.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  loadingStateSubscription: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loadingStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveringPassword(loginState);
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoverPasswordFailed(loginState);
    });
  }

  ngOnDestroy() {
    if(this.loadingStateSubscription) {
      this.loadingStateSubscription.unsubscribe();
    }
  }

  private async onIsRecoverPasswordFailed(loginState: LoginState) {
    if(loginState.error) {
      this.store.dispatch(hide());

      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger'
      });
      toaster.present();
    }
  }

  private onIsRecoveringPassword(loginState: LoginState) {
    if(loginState.isRecoveringPassword) {
      this.store.dispatch(show());

      this.authService.recoverEmailPassword(this.form.get('email').value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess());
      }, error => {
        this.store.dispatch(recoverPasswordFail({error}));
      });
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if(loginState.isRecoveredPassword) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery email sent',
        color: 'primary'
      });
      toaster.present();
    }
  }

  forgotEmailPassword(): void {
    this.store.dispatch(recoverPassword());
  }

  login(): void {
    this.router.navigate(['home']);
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
