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
import { CustomersRepository } from "./infrastructure/repositories/CustomersRepository";
import { StripeRepository } from "./infrastructure/repositories/StripeRepository";
import { EstimatesRepository } from "./infrastructure/repositories/EstimatesRepository";
import { ChangeOrdersRepository } from "./infrastructure/repositories/ChangeOrdersRepository";
import { WorkOrdersRepository } from "./infrastructure/repositories/WorkOrdersRepository";
import { ProfilesRepository } from "./infrastructure/repositories/ProfilesRepository";
import { InvoicesRepository } from "./infrastructure/repositories/InvoicesRepository";
import { PDFRepository } from "./infrastructure/repositories/PDFRepository";
import { IJobsRepository } from "./application/interfaces/repositories/IJobsRepository";
import { ICustomerRepository } from "./application/interfaces/repositories/ICustomersRepository";
import { IStripeRepository } from "./application/interfaces/repositories/IStripeRepository";
import { IProfilesRepository } from "./application/interfaces/repositories/IProfilesRepository";
import { IEstimatesRepository } from "./application/interfaces/repositories/IEstimatesRepository";
import { IPDFRepository } from "./application/interfaces/repositories/IPDFRepository";
import { IWorkOrdersRepository } from "./application/interfaces/repositories/IWorkOrdersRepository";
import { IChangeOrdersRepository } from "./application/interfaces/repositories/IChangeOrdersRepository";
import { IInvoicesRepository } from "./application/interfaces/repositories/IInvoicesRepository";

// Use Cases
import { JobsUseCases } from "./application/use-cases/JobsUseCases";
import { AuthUseCases } from "./application/use-cases/AuthUseCases";
import { StripeUseCases } from "./application/use-cases/StripeUseCases";
import { CustomersUseCases } from "./application/use-cases/CustomersUseCases";
import { ProfilesUseCases } from "./application/use-cases/ProfilesUseCases";
import { EstimatesUseCases } from "./application/use-cases/EstimatesUseCases";
import { WorkOrdersUseCases } from "./application/use-cases/WorkOrdersUseCases";
import { ChangeOrdersUseCases } from "./application/use-cases/ChangeOrdersUseCases";
import { InvoicesUseCases } from "./application/use-cases/InvoicesUseCases";
import { IJobsUseCases } from "./application/interfaces/use-cases/IJobsUseCases";
import { IAuthUseCases } from "./application/interfaces/use-cases/IAuthUseCases";
import { ICustomersUseCases } from "./application/interfaces/use-cases/ICustomersUseCases";
import { IStripeUseCases } from "./application/interfaces/use-cases/IStripeUseCases";
import { IProfilesUseCases } from "./application/interfaces/use-cases/IProfilesUseCases";
import { IEstimatesUseCases } from "./application/interfaces/use-cases/IEstimatesUseCases";
import { IWorkOrdersUseCases } from "./application/interfaces/use-cases/IWorkOrdersUseCases";
import { IChangeOrdersUseCases } from "./application/interfaces/use-cases/IChangeOrdersUseCases";
import { IInvoicesUseCases } from "./application/interfaces/use-cases/IInvoicesUseCases";
import { ICustomersNotesRepository } from "./application/interfaces/repositories/ICustomersNotesRepository";
import { ICustomersNotesUseCases } from "./application/interfaces/use-cases/ICustomersNotesUseCases";
import { CustomersNotesRepository } from "./infrastructure/repositories/CustomersNotesRepository";
import { CustomersNotesUseCases } from "./application/use-cases/CustomersNotesUseCases";

class IoCContainer {
  // Services
  private stripeService: IStripeService;
  private supabaseService: ISupabaseService;
  private databaseService: IDatabaseService;

  // Repositories
  private jobsRepository: IJobsRepository;
  private customersRepository: ICustomerRepository;
  private customersNotesRepository: ICustomersNotesRepository;
  private stripeRepository: IStripeRepository;
  private profilesRepository: IProfilesRepository;
  private estimatesRepository: IEstimatesRepository;
  private pdfRepository: IPDFRepository;
  private workOrdersRepository: IWorkOrdersRepository;
  private changeOrdersRepository: IChangeOrdersRepository;
  private invoicesRepository: IInvoicesRepository;

  // Use Cases
  jobsUseCases: IJobsUseCases;
  authUseCases: IAuthUseCases;
  customersUseCases: ICustomersUseCases;
  customersNotesUseCases: ICustomersNotesUseCases;
  stripeUseCases: IStripeUseCases;
  profilesUseCases: IProfilesUseCases;
  estimatesUseCases: IEstimatesUseCases;
  workOrdersUseCases: IWorkOrdersUseCases;
  changeOrdersUseCases: IChangeOrdersUseCases;
  invoicesUseCases: IInvoicesUseCases;

  constructor() {
    // Services
    this.stripeService = new StripeService();
    this.supabaseService = new SupabaseService();
    this.databaseService = new DatabaseService();

    // Repositories
    this.jobsRepository = new JobsRepository(this.databaseService);
    this.customersRepository = new CustomersRepository(this.databaseService);
    this.customersNotesRepository = new CustomersNotesRepository(
      this.databaseService,
    );
    this.stripeRepository = new StripeRepository();
    this.profilesRepository = new ProfilesRepository(this.databaseService);
    this.estimatesRepository = new EstimatesRepository(this.databaseService);
    this.pdfRepository = new PDFRepository(this.databaseService);
    this.workOrdersRepository = new WorkOrdersRepository(this.databaseService);
    this.changeOrdersRepository = new ChangeOrdersRepository(
      this.databaseService,
    );
    this.invoicesRepository = new InvoicesRepository(this.databaseService);

    // Use Cases
    this.jobsUseCases = new JobsUseCases(this.jobsRepository);
    this.authUseCases = new AuthUseCases(this.supabaseService);
    this.customersUseCases = new CustomersUseCases(
      this.customersRepository,
      this.supabaseService,
    );
    this.customersNotesUseCases = new CustomersNotesUseCases(
      this.customersNotesRepository,
    );
    this.stripeUseCases = new StripeUseCases(
      this.stripeRepository,
      this.stripeService,
      this.supabaseService,
    );
    this.profilesUseCases = new ProfilesUseCases(this.profilesRepository);
    this.estimatesUseCases = new EstimatesUseCases(
      this.estimatesRepository,
      this.pdfRepository,
    );
    this.workOrdersUseCases = new WorkOrdersUseCases(this.workOrdersRepository);
    this.changeOrdersUseCases = new ChangeOrdersUseCases(
      this.changeOrdersRepository,
    );
    this.invoicesUseCases = new InvoicesUseCases(this.invoicesRepository);
  }
}

export default new IoCContainer();
