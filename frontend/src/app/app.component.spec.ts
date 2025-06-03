import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PocketBaseService } from './services/pocketbase/pocket-base.service';
import {of, throwError} from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockPbService: jasmine.SpyObj<PocketBaseService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const pbSpy = jasmine.createSpyObj('PocketBaseService', ['signIn', 'register'], {
      isLoggedIn$: of(false)
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, FormsModule],
      providers: [
        { provide: PocketBaseService, useValue: pbSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockPbService = TestBed.inject(PocketBaseService) as jasmine.SpyObj<PocketBaseService>;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call login() and navigate on success', () => {
    mockPbService.signIn.and.returnValue(of({token: 'dummy'}));
    const navigateSpy = spyOn(component['router'], 'navigate');

    component.email = 'test@example.com';
    component.password = 'secret';
    component.login();

    expect(mockPbService.signIn).toHaveBeenCalledWith('test@example.com', 'secret');
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should alert on login failure', () => {
    spyOn(window, 'alert');
    mockPbService.signIn.and.returnValue(throwError(() => new Error('Invalid credentials')));

    component.email = 'test@example.com';
    component.password = 'wrong';
    component.login();

    expect(window.alert).toHaveBeenCalledWith('Login failed. Please check your credentials.');
  });

  it('should call register() and trigger login()', () => {
    spyOn(component, 'login');
    mockPbService.register.and.returnValue(of({id: 'abc'}));

    component.email = 'test@example.com';
    component.password = 'test123';
    component.repeatedPassword = 'test123';
    component.register();

    expect(mockPbService.register).toHaveBeenCalled();
    expect(component.login).toHaveBeenCalled();
  });

  it('should alert on registration failure', () => {
    spyOn(window, 'alert');
    mockPbService.register.and.returnValue(throwError(() => new Error('Already exists')));

    component.email = 'a@a.com';
    component.password = '123';
    component.register();

    expect(window.alert).toHaveBeenCalledWith('Registration failed. Please check your details.');
  });

  it('should toggle registration mode', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.isRegister = false;
    fixture.detectChanges();

    const link = compiled.querySelector('a');
    expect(link?.textContent).toContain('Hier geht\'s zur Registrierung');

    link?.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.isRegister).toBeTrue();
  });
});
