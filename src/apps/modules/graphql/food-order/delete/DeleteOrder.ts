import { OrderFoodRepository } from "../../../../repositories/food-app/OrderFoodRepositories";
import { OrderFood } from "../../../entities/food_order";

import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { DeleteOrderInput } from "./DeleteOrderInput";

@Resolver((_type) => OrderFood) //sẽ biến class CreateGroup thành một rest API
export class DeleteOrder {
  @Mutation((type) => OrderFood) //Định nghĩa method create Post thành một graphql mutation
  public async deleteOrder(
    @Arg("data") inputData: DeleteOrderInput // @Arg: Sẽ đưa giá trị phía clent-side gửi lên params vào input data
  ): Promise<any> {
    const { id_order } = inputData;
    const orderRepository = getCustomRepository(OrderFoodRepository); //getCustomRepository: Sử dụng hàm này để tạo một thực thể và sử dụng các method của typeORM
    // và sử dụng các method của TypeOrm.
    await orderRepository.delete({
      id: id_order,
    });
  }
}
