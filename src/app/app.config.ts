import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { WorkforceRepository } from './data-access/repositories/workforce.repository';
import { MockWorkforceRepository } from './data-access/repositories/mock/mock-workforce.repository';
import { CrewRepository } from './data-access/repositories/crew.repository';
import { MockCrewRepository } from './data-access/repositories/mock/mock-crew.repository';
import { ContractorRepository } from './data-access/repositories/contractor.repository';
import { MockContractorRepository } from './data-access/repositories/mock/mock-contractor.repository';
import { ProjectRepository } from './data-access/repositories/project.repository';
import { MockProjectRepository } from './data-access/repositories/mock/mock-project.repository';
import { RequestRepository } from './data-access/repositories/request.repository';
import { MockRequestRepository } from './data-access/repositories/mock/mock-request.repository';
import { WorkerJobRepository } from './data-access/repositories/worker-job.repository';
import { MockWorkerJobRepository } from './data-access/repositories/mock/mock-worker-job.repository';
import { MachineryRepository } from './data-access/repositories/machinery.repository';
import { MockMachineryRepository } from './data-access/repositories/mock/mock-machinery.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    { provide: WorkforceRepository, useClass: MockWorkforceRepository },
    { provide: CrewRepository, useClass: MockCrewRepository },
    { provide: ContractorRepository, useClass: MockContractorRepository },
    { provide: ProjectRepository, useClass: MockProjectRepository },
    { provide: RequestRepository, useClass: MockRequestRepository },
    { provide: WorkerJobRepository, useClass: MockWorkerJobRepository },
    { provide: MachineryRepository, useClass: MockMachineryRepository }
  ]
};
