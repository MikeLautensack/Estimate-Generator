"server only";

// Services
import { StripeService } from "./infrastructure/services/StripeService";
import { SupabaseService } from "./infrastructure/services/SupabaseService";
import { DatabaseService } from "./infrastructure/services/DatabaseService";
import { ISupabaseService } from "./application/interfaces/services/ISupabaseService";
import { IStripeService } from "./application/interfaces/services/IStripeService";
import { IDatabaseService } from "./application/interfaces/services/IDatabaseService";

// Repositories
import { JobsRepository } from "./infrastructure/repositories/JobsRepository";
import { IJobsRepository } from "./application/interfaces/repositories/IJobsRepository";
import { ICustomerRepository } from "./application/interfaces/repositories/ICustomersRepository";
import { CustomersRepository } from "./infrastructure/repositories/CustomersRepository";
import { IStripeRepository } from "./application/interfaces/repositories/IStripeRepository";
import { StripeRepository } from "./infrastructure/repositories/StripeRepository";

// Use Cases
import { JobsUseCases } from "./application/use-cases/JobsUseCases";
import { IJobsUseCases } from "./application/interfaces/use-cases/IJobsUseCases";
import { IAuthUseCases } from "./application/interfaces/use-cases/IAuthUseCases";
import { AuthUseCases } from "./application/use-cases/AuthUseCases";
import { ICustomersUseCases } from "./application/interfaces/use-cases/ICustomersUseCases";
import { CustomersUseCases } from "./application/use-cases/CustomersUseCases";
import { IStripeUseCases } from "./application/interfaces/use-cases/IStripeUseCases";
import { StripeUseCases } from "./application/use-cases/StripeUseCases";

class DIContainer {
  // Services
  private stripeService: IStripeService;
  private supabaseService: ISupabaseService;
  private databaseService: IDatabaseService;

  // Repositories
  private jobsRepository: IJobsRepository;
  private customersRepository: ICustomerRepository;
  private stripeRepository: IStripeRepository;

  // Use Cases
  jobsUseCases: IJobsUseCases;
  authUseCases: IAuthUseCases;
  customersUseCases: ICustomersUseCases;
  stripeUseCases: IStripeUseCases;

  constructor() {
    // Services
    this.stripeService = new StripeService();
    this.supabaseService = new SupabaseService();
    this.databaseService = new DatabaseService();

    // Repositories
    this.jobsRepository = new JobsRepository(this.databaseService);
    this.customersRepository = new CustomersRepository(this.databaseService);
    this.stripeRepository = new StripeRepository();

    // Use Cases
    this.jobsUseCases = new JobsUseCases(this.jobsRepository);
    this.authUseCases = new AuthUseCases(this.supabaseService);
    this.customersUseCases = new CustomersUseCases(
      this.customersRepository,
      this.supabaseService,
    );
    this.stripeUseCases = new StripeUseCases(
      this.stripeRepository,
      this.stripeService,
      this.supabaseService,
    );
  }
}

export default new DIContainer();
