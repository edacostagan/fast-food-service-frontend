import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingsComponent } from './pendings.component';
import { AppModule } from '../../../../../app/app.module';

describe('PendingsComponent', () => {
  let component: PendingsComponent;
  let fixture: ComponentFixture<PendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingsComponent ],
      imports:[AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
