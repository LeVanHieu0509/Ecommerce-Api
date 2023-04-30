import { UserFoodRepository } from "./../../../../repositories/food-app/UserFoodRepositories";
import { CheckoutFood } from "./../../../entities/food_checkout";
import { CreateCheckoutInput } from "./CreateCheckoutInput";

import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { CheckoutFoodRepository } from "../../../../repositories/food-app/CheckoutFoodRepositories";
import { SendNotification } from "../../../../service/push-notification.service";

@Resolver((_type) => CheckoutFood) //sẽ biến class CreateGroup thành một rest API
export class CheckoutOrder {
  @Mutation((_type) => CheckoutFood) //Định nghĩa method create Post thành một graphql mutation
  public async createCheckout(
    @Arg("data") inputData: CreateCheckoutInput // @Arg: Sẽ đưa giá trị phía clent-side gửi lên params vào input data
  ): Promise<CheckoutFood> {
    const { bill_price, status, user_id } = inputData;

    let user_food;

    if (user_id) {
      const userRepository = getCustomRepository(UserFoodRepository);
      let user = await userRepository.findOne({
        where: { id: user_id },
      });

      if (user) {
        user_food = user;
      }
    }

    const orderRepository = getCustomRepository(CheckoutFoodRepository); //getCustomRepository: Sử dụng hàm này để tạo một thực thể và sử dụng các method của typeORM
    // và sử dụng các method của TypeOrm.
    const order = orderRepository.create({
      bill_price,
      user_food,
      status,
    });

    let sendingOrderMessage = `Đơn hàng ${order.id} đang được giao đến cho ${order.user_food.title};`;
    let sentOrderMessage = `Đơn hàng ${order.id} đã được giao đến cho ${order.user_food.title}`;

    setTimeout(() => {
      SendNotification(sendingOrderMessage, (error, results) => {
        if (error) {
          console.log(error);
        }
        console.log(results);
      });
    }, 5000);
    setTimeout(() => {
      SendNotification(sentOrderMessage, (error, results) => {
        if (error) {
          console.log(error);
        }
        console.log(results);
      });
    }, 10000);

    await orderRepository.save(order);

    return {
      ...order,
    };
  }
}
