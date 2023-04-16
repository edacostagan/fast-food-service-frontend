import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOptionComponent } from './menu-option.component';
import { AppModule } from '../../../../../app/app.module';
import { MenuEntity } from 'src/app/domain/models/entities/menu.entity';
import { IMenuRegister } from 'src/app/domain/models/interfaces/menu.interfaces';
import { MenuApiService } from 'src/app/infrastructure/services/menu.service';

describe('MenuOptionComponent', () => {
  let menuOptionsComponent: MenuOptionComponent;
  let fixture: ComponentFixture<MenuOptionComponent>;
  let menuService: MenuApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuOptionComponent ],
      providers: [
        { provide: menuService, useValue: jasmine.createSpyObj('menuService', ['addNewMenuOption']) },

      ],
      imports:[AppModule]
    })
    .compileComponents();

    menuService = TestBed.inject(MenuApiService);
    fixture = TestBed.createComponent(MenuOptionComponent);
    menuOptionsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(menuOptionsComponent).toBeTruthy();
  });

  it('should return form invalid when any field is invalid', () => {

    //Arrange
    const menuName = menuOptionsComponent.newOptionForm.controls['menuName'];
    const menuDescription = menuOptionsComponent.newOptionForm.controls['menuDescription'];
    const menuImageUrl = menuOptionsComponent.newOptionForm.controls['menuImageUrl'];
    const menuPrice = menuOptionsComponent.newOptionForm.controls['menuPrice'];

    //Act
    menuName.setValue('');
    menuDescription.setValue('a');
    menuImageUrl.setValue('');
    menuPrice.setValue('');

    //Assert
    expect(menuOptionsComponent.newOptionForm.invalid).toBeTrue();
  });

  /* it('should call addNewMenuOption and do something', () => {

    //Arrange
    const menuData: IMenuRegister = {
      menuName: 'mockName',
      menuDescription: 'mockDescription',
      menuPrice: 100,
      menuImageUrl: 'mockUrl'
    };

    const expectedResult: MenuEntity = {
      _id: '001',
      menuName: 'mockName',
      menuDescription: 'mockDescription',
      menuPrice: 100,
      menuImageUrl: 'mockUrl'
    };

    //Act

    //Assert
    expect(result).toEqual(expectedResult);
  }) */

})
