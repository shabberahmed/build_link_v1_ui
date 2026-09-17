import { Injectable, inject, signal, computed } from '@angular/core';
import { RequestRepository } from '../data-access/repositories/request.repository';
import { ContractorRepository } from '../data-access/repositories/contractor.repository';
import { WorkforceRequest } from '../data-access/models/request.model';
import { Contractor } from '../data-access/models/contractor.model';
import { WorkerTrade } from '../data-access/models/worker.model';

export interface MarketplaceSearchFilter {
  trade: WorkerTrade | 'ALL';
  location: string;
  minWorkers: number;
  maxDailyRate: number;
  accommodationRequired: boolean;
}

@Injectable({ providedIn: 'root' })
export class MarketplaceStore {
  private readonly requestRepo = inject(RequestRepository);
  private readonly contractorRepo = inject(ContractorRepository);

  private readonly _requests = signal<WorkforceRequest[]>([]);
  private readonly _contractors = signal<Contractor[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly filters = signal<MarketplaceSearchFilter>({
    trade: 'ALL',
    location: '',
    minWorkers: 1,
    maxDailyRate: 1500,
    accommodationRequired: false
  });

  readonly requests = this._requests.asReadonly();
  readonly contractors = this._contractors.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly pendingRequests = computed(() =>
    this._requests().filter(r => r.status === 'PENDING')
  );

  readonly pendingRequestsCount = computed(() => this.pendingRequests().length);

  constructor() {
    this.loadMarketplace();
  }

  loadMarketplace(): void {
    this._loading.set(true);
    this.requestRepo.getRequests().subscribe(reqs => {
      this._requests.set(reqs);
      this._loading.set(false);
    });

    this.contractorRepo.getContractors().subscribe(list => {
      this._contractors.set(list);
    });
  }

  submitRequest(dto: Partial<WorkforceRequest>): void {
    this._loading.set(true);
    this.requestRepo.createRequest(dto).subscribe(newReq => {
      this._requests.update(prev => [newReq, ...prev]);
      this._loading.set(false);
    });
  }

  respondToRequest(id: string, status: WorkforceRequest['status']): void {
    this.requestRepo.updateRequestStatus(id, status).subscribe(updated => {
      this._requests.update(prev => prev.map(r => r.id === id ? updated : r));
    });
  }
}
