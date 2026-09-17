import { Injectable, inject, signal, computed } from '@angular/core';
import { ContractorRepository } from '../data-access/repositories/contractor.repository';
import { Contractor } from '../data-access/models/contractor.model';

@Injectable({ providedIn: 'root' })
export class NetworkStore {
  private readonly contractorRepo = inject(ContractorRepository);

  private readonly _contractors = signal<Contractor[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly contractors = this._contractors.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly connectedContractors = computed(() =>
    this._contractors().filter(c => c.connected)
  );

  constructor() {
    this.loadNetwork();
  }

  loadNetwork(): void {
    this._loading.set(true);
    this.contractorRepo.getContractors().subscribe(list => {
      this._contractors.set(list);
      this._loading.set(false);
    });
  }

  toggleConnect(id: string): void {
    this.contractorRepo.toggleConnection(id).subscribe(updated => {
      this._contractors.update(prev => prev.map(c => c.id === id ? updated : c));
    });
  }
}
