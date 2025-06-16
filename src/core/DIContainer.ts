"server only";

// Services
import { StripeService } from "./infrastructure/services/StripeService";
import { SupabaseService } from "./infrastructure/services/SupabaseService";
import { DatabaseService } from "./infrastructure/services/DatabaseService";
import { ISupabaseService } from "./application/interfaces/services/ISupabaseService";
import { IPaymentService } from "./application/interfaces/services/IPaymentService";
import { IDatabaseService } from "./application/interfaces/services/IDatabaseService";

// Repositories
import { JobsRepository } from "./infrastructure/repositories/JobsRepository";
import { IJobsRepository } from "./application/interfaces/repositories/IJobsRepository";
import { ICustomerRepository } from "./application/interfaces/repositories/ICustomersRepository";
import { CustomersRepository } from "./infrastructure/repositories/CustomersRepository";

// Use Cases
import { JobsUseCases } from "./application/use-cases/JobsUseCases";
import { IJobsUseCases } from "./application/interfaces/use-cases/IJobsUseCases";
import { IAuthUseCases } from "./application/interfaces/use-cases/IAuthUseCases";
import { AuthUseCases } from "./application/use-cases/AuthUseCases";
import { ICustomersUseCases } from "./application/interfaces/use-cases/ICustomersUseCases";
import { CustomersUseCases } from "./application/use-cases/CustomersUseCases";

class DIContainer {
  // Services
  paymentService: IPaymentService;
  supabaseService: ISupabaseService;
  databaseService: IDatabaseService;

  // Repositories
  jobsRepository: IJobsRepository;
  customersRepository: ICustomerRepository;

  // Use Cases
  jobsUseCases: IJobsUseCases;
  authUseCases: IAuthUseCases;
  customersUseCases: ICustomersUseCases;

  constructor() {
    // Services
    this.paymentService = new StripeService();
    this.supabaseService = new SupabaseService();
    this.databaseService = new DatabaseService();

    // Repositories
    this.jobsRepository = new JobsRepository(this.databaseService);
    this.customersRepository = new CustomersRepository(this.databaseService);

    // Use Cases
    this.jobsUseCases = new JobsUseCases(this.jobsRepository);
    this.authUseCases = new AuthUseCases(this.supabaseService);
    this.customersUseCases = new CustomersUseCases(
      this.customersRepository,
      this.supabaseService,
    );
  }
}

export default new DIContainer();
