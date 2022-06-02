import { AppRoutingModule } from './../../app-routing.module';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(), AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to home page after login', fakeAsync(() => {
    spyOn(router, 'navigate');

    tick(2000);

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  }));

  it('should go to register page after register', fakeAsync(() => {
    spyOn(router, 'navigate');

    tick(2000);

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  }));
});
