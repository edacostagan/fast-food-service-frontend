import { OrderStatusEnum } from "src/app/domain/models/entities/order.entity";
import { OrderStatusNamePipe } from "./order-status.pipe";

describe('OrderStatusNamePipe', () => {

  let pipe: OrderStatusNamePipe;

  beforeEach(() => {
    pipe = new OrderStatusNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the correct value when given valid status', () => {
    //Arrange
    const status = 10;
    const expectedResult = Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(status)];

    //Act
    const result = pipe.transform(status);

    //Assert
    expect(result).toEqual(expectedResult)
  });

  it('should return "UNKNOWN" when given invalid status value', () => {
    //Arrange
    const status = 100;
    const expectedResult = "UNKNOWN";

    //Act
    const result = pipe.transform(status);

    //Assert
    expect(result).toEqual(expectedResult)
  });


  it('should return "UNKNOWN" when an error is thrown', () => {
    // Arrange
    const invalidValue = 'invalidValue';

    // Act
    const result = pipe.transform(invalidValue as any);

    // Assert
    expect(result).toEqual('UNKNOWN');
  });

});
