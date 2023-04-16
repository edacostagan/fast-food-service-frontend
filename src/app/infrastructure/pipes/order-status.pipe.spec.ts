import { OrderStatusEnum } from "src/app/domain/models/entities/order.entity";
import { OrderStatusNamePipe } from "./order-status.pipe";

describe('OrderStatusNamePipe', () => {

  it('create an instance', () => {
    const pipe = new OrderStatusNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the correct value when given valid status', () => {
    //Arrange
    const pipe = new OrderStatusNamePipe();
    const status = 10;
    const expectedResult = Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(status)];

    //Act
    const result = pipe.transform(status);

    //Assert
    expect(result).toEqual(expectedResult)
  });

  it('should return "UNKNOWN" when given invalid status value', () => {
    //Arrange
    const pipe = new OrderStatusNamePipe();
    const status = 100;
    const expectedResult = "UNKNOWN";

    //Act
    const result = pipe.transform(status);

    //Assert
    expect(result).toEqual(expectedResult)
  });


});
