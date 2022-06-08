import { show, hide } from './../../../store/loading/loading.actions';
import { AppState } from './../../../store/AppState';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  forgotEmailPassword(): void {
    this.store.dispatch(show());

    setTimeout(() => {
      this.store.dispatch(hide());
    }, 3000);
  }

  login(): void {
    this.router.navigate(['home']);
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
