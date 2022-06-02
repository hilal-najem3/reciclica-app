import { AppRoutingModule } from './../../app-routing.module';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), AppRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to pickup calls after see all', fakeAsync(() => {
    spyOn(router, 'navigate');

    component.goToPickUpCalls();

    tick(2000);

    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']);
  }));

  it('should go to create pickup call after add call', fakeAsync(() => {
    spyOn(router, 'navigate');

    component.newPickUpCall();

    tick(2000);

    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  }));
});
