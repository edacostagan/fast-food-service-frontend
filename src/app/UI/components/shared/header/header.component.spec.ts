import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { UserApiService } from 'src/app/infrastructure/services/user.service';
import { UserEntity } from 'src/app/domain/models/entities/user.entity';
import { AppModule } from 'src/app/app.module';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  //Arrange
  let userData: UserEntity = {
    _id: '001',
    userFullname: 'John Doe',
    userAddress: 'main st 123',
    userMobilePhone: '087654321',
    userEmail: 'test@mail.com',
    userIsAdmin: false,
    token: 'ljkñnfdqjdmf23j23mpo3oj23lkñrkj23frji302jfi32'
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return user isAdmin value', () => {

    //Arrange
    component.user = userData;

    //Act
    const result = component.isAdmin;
    //Assert
    expect(result).toEqual(userData.userIsAdmin);
  });

  it('should return user isAuth value (has a valid token)', () => {

    //Arrange
    component.user = userData;

    //Act
    const result = component.isAuth;
    //Assert
    expect(result).toEqual(userData.token);
  });

});
