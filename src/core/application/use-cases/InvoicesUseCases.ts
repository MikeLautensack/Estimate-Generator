import { IInvoicesRepository } from "../interfaces/repositories/IInvoicesRepository";
import { IInvoicesUseCases } from "../interfaces/use-cases/IInvoicesUseCases";

export class InvoicesUseCases implements IInvoicesUseCases {
  constructor(private readonly invoicesRepository: IInvoicesRepository) {}

  //   async getInvoices(
  //     userId: string,
  //     page: string,
  //     size: string,
  //     filters: Record<string, string>,
  //   ): Promise<InvoicesSelect[]> {
  //     return await this.invoicesRepository.getInvoices(
  //       userId,
  //       page,
  //       size,
  //       filters,
  //     );
  //   }
}
