import { IChangeOrdersRepository } from "../interfaces/repositories/IChangeOrdersRepository";
import { IChangeOrdersUseCases } from "../interfaces/use-cases/IChangeOrdersUseCases";

export class ChangeOrdersUseCases implements IChangeOrdersUseCases {
  constructor(
    private readonly changeOrdersRepository: IChangeOrdersRepository,
  ) {}

  //   async getChangeOrders(
  //     userId: string,
  //     page: string,
  //     size: string,
  //     filters: Record<string, string>,
  //   ): Promise<ChangeOrdersSelect[]> {
  //     return await this.changeOrdersRepository.getChangeOrders(
  //       userId,
  //       page,
  //       size,
  //       filters,
  //     );
  //   }
}
