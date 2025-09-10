import { IWorkOrdersRepository } from "../interfaces/repositories/IWorkOrdersRepository";
import { IWorkOrdersUseCases } from "../interfaces/use-cases/IWorkOrdersUseCases";

export class WorkOrdersUseCases implements IWorkOrdersUseCases {
  constructor(private readonly workOrdersRepository: IWorkOrdersRepository) {}

  //   async getWorkOrders(
  //     userId: string,
  //     page: string,
  //     size: string,
  //     filters: Record<string, string>,
  //   ): Promise<WorkOrdersSelect[]> {
  //     return await this.workOrdersRepository.getWorkOrders(
  //       userId,
  //       page,
  //       size,
  //       filters,
  //     );
  //   }
}
