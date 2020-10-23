import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App2Component } from './app2.component';

describe('App2Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        App2Component
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App2Component);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'questnr-front-end'`, () => {
    const fixture = TestBed.createComponent(App2Component);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('questnr-front-end');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App2Component);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('questnr-front-end app is running!');
  });
});
