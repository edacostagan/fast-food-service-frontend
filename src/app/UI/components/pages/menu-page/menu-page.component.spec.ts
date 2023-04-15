import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPageComponent } from './menu-page.component';
import { AppModule } from 'src/app/app.module';

describe('MenuPageComponent', () => {
  let component: MenuPageComponent;
  let fixture: ComponentFixture<MenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPageComponent ],
      imports:[AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
