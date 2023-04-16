import { MenuApiService } from './menu.service';
import { MenuEntity } from '../../../app/domain/models/entities/menu.entity';
import { of } from 'rxjs';


describe('MenuService', () => {
  let menuService: MenuApiService;

  let HttpClientSpy: {
    post: jasmine.Spy,
    get: jasmine.Spy,
  };

  //Arrange
  const menuMock: MenuEntity = {
    _id: '01',
    menuName: 'menu01',
    menuDescription: 'mock description',
    menuPrice: 10,
    menuImageUrl: 'mock url'
  }

  beforeEach(() => {

    HttpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    menuService = new MenuApiService(HttpClientSpy as any);

  });

  it('should be created', () => {
    expect(menuService).toBeTruthy();
  });
  it('should Add a new Menu Option with the given data', (done) => {
    const returnValue: MenuEntity = menuMock;

    //Act
    HttpClientSpy.post.and.returnValue(of(returnValue) as any);

    //Assert
    menuService.addNewMenuOption(menuMock).subscribe((result) => {
      expect(result).toEqual(returnValue);
      done();
    })
  });

  it('should return the Menu data for the given ID', (done) => {
    //Arrange
    const menuId = '01';

    const menuMock: MenuEntity = {
      _id: '01',
      menuName: 'menu01',
      menuDescription: 'mock description',
      menuPrice: 10,
      menuImageUrl: 'mock url'
    }

    const returnValue: MenuEntity = menuMock;

    //Act
    HttpClientSpy.get.and.returnValue(of(returnValue) as any);

    //Assert
    menuService.getMenuById(menuId).subscribe((result) => {
      expect(result).toEqual(returnValue);
      done();
    })
  });
});
