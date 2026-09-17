import { Injectable, inject, signal, computed } from '@angular/core';
import { MachineryRepository } from '../data-access/repositories/machinery.repository';
import {
  CreateMachineryDto,
  Machinery,
  MachineryStatus,
  MachineryType
} from '../data-access/models/machinery.model';

@Injectable({ providedIn: 'root' })
export class MachineryStore {
  private readonly repo = inject(MachineryRepository);

  private readonly _items = signal<Machinery[]>([]);
  private readonly _loading = signal(false);

  readonly searchQuery = signal('');
  readonly selectedType = signal<MachineryType | 'ALL'>('ALL');
  readonly selectedStatus = signal<MachineryStatus | 'ALL'>('ALL');

  readonly items = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly totalCount = computed(() => this._items().length);
  readonly availableCount = computed(() => this._items().filter(m => m.status === 'AVAILABLE').length);
  readonly deployedCount = computed(() => this._items().filter(m => m.status === 'DEPLOYED').length);
  readonly unitCount = computed(() => this._items().reduce((sum, m) => sum + m.quantity, 0));

  readonly filteredItems = computed(() => {
    let result = this._items();
    const query = this.searchQuery().toLowerCase().trim();
    const type = this.selectedType();
    const status = this.selectedStatus();

    if (query) {
      result = result.filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.type.toLowerCase().includes(query) ||
        (m.customType ?? '').toLowerCase().includes(query) ||
        m.location.toLowerCase().includes(query)
      );
    }

    if (type !== 'ALL') {
      result = result.filter(m => m.type === type);
    }

    if (status !== 'ALL') {
      result = result.filter(m => m.status === status);
    }

    return result;
  });

  constructor() {
    this.load();
  }

  load(): void {
    this._loading.set(true);
    this.repo.getMachinery().subscribe(list => {
      this._items.set(list);
      this._loading.set(false);
    });
  }

  addMachinery(dto: CreateMachineryDto): void {
    this._loading.set(true);
    this.repo.createMachinery(dto).subscribe(created => {
      this._items.update(prev => [created, ...prev]);
      this._loading.set(false);
    });
  }

  assignToProject(id: string, projectId: string, projectName: string): void {
    this.repo.assignToProject(id, projectId, projectName).subscribe(updated => {
      this._items.update(prev => prev.map(item => item.id === id ? updated : item));
    });
  }

  updateStatus(id: string, status: MachineryStatus): void {
    this.repo.updateStatus(id, status).subscribe(updated => {
      this._items.update(prev => prev.map(item => item.id === id ? updated : item));
    });
  }
}
