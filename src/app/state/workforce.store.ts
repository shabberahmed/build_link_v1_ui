import { Injectable, inject, signal, computed } from '@angular/core';
import { WorkforceRepository } from '../data-access/repositories/workforce.repository';
import { CrewRepository, CreateCrewDto, CrewRequestDto } from '../data-access/repositories/crew.repository';
import { Worker, CreateWorkerDto, WorkerStatus, WorkerTrade } from '../data-access/models/worker.model';
import { Crew } from '../data-access/models/crew.model';

@Injectable({ providedIn: 'root' })
export class WorkforceStore {
  private readonly workforceRepo = inject(WorkforceRepository);
  private readonly crewRepo = inject(CrewRepository);

  private readonly _workers = signal<Worker[]>([]);
  private readonly _crews = signal<Crew[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _crewLoading = signal<boolean>(false);
  private readonly _crewRequestSuccess = signal<string | null>(null);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedTrade = signal<WorkerTrade | 'ALL'>('ALL');
  readonly selectedStatus = signal<WorkerStatus | 'ALL'>('ALL');

  readonly workers = this._workers.asReadonly();
  readonly crews = this._crews.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly crewLoading = this._crewLoading.asReadonly();
  readonly crewRequestSuccess = this._crewRequestSuccess.asReadonly();

  // Metrics
  readonly totalWorkersCount = computed(() => this._workers().length);
  readonly deployedCount = computed(() => this._workers().filter(w => w.status === 'DEPLOYED').length);
  readonly availableCount = computed(() => this._workers().filter(w => w.status === 'AVAILABLE').length);
  readonly onLeaveCount = computed(() => this._workers().filter(w => w.status === 'ON_LEAVE').length);
  readonly comingAvailableCount = computed(() => this._workers().filter(w => w.status === 'COMING_AVAILABLE').length);

  readonly comingAvailableWorkers = computed(() =>
    this._workers().filter(w => w.status === 'COMING_AVAILABLE' || w.status === 'AVAILABLE')
  );

  readonly filteredWorkers = computed(() => {
    let result = this._workers();
    const query = this.searchQuery().toLowerCase().trim();
    const trade = this.selectedTrade();
    const status = this.selectedStatus();

    if (query) {
      result = result.filter(w =>
        w.name.toLowerCase().includes(query) ||
        w.trade.toLowerCase().includes(query) ||
        w.location.toLowerCase().includes(query) ||
        w.secondarySkills.some(s => s.toLowerCase().includes(query))
      );
    }

    if (trade !== 'ALL') {
      result = result.filter(w => w.trade === trade);
    }

    if (status !== 'ALL') {
      result = result.filter(w => w.status === status);
    }

    return result;
  });

  constructor() {
    this.loadWorkforce();
  }

  loadWorkforce(): void {
    this._loading.set(true);
    this.workforceRepo.getWorkers().subscribe(data => {
      this._workers.set(data);
      this._loading.set(false);
    });

    this.crewRepo.getCrews().subscribe(data => {
      this._crews.set(data);
    });
  }

  addWorker(dto: CreateWorkerDto): void {
    this._loading.set(true);
    this.workforceRepo.createWorker(dto).subscribe(newWorker => {
      this._workers.update(prev => [newWorker, ...prev]);
      this._loading.set(false);
    });
  }

  updateStatus(id: string, status: WorkerStatus): void {
    this.workforceRepo.updateWorkerStatus(id, status).subscribe(updated => {
      this._workers.update(prev => prev.map(w => w.id === id ? updated : w));
    });
  }

  assignWorkerToProject(workerId: string, projectId: string, projectName: string): void {
    this.workforceRepo.assignWorkerToProject(workerId, projectId, projectName).subscribe(updated => {
      this._workers.update(prev => prev.map(w => w.id === workerId ? updated : w));
    });
  }

  createCrew(dto: CreateCrewDto): void {
    this._crewLoading.set(true);
    this.crewRepo.createCrew(dto).subscribe(newCrew => {
      this._crews.update(prev => [newCrew, ...prev]);
      this._crewLoading.set(false);
    });
  }

  requestCrew(req: CrewRequestDto): void {
    this._crewLoading.set(true);
    this._crewRequestSuccess.set(null);
    this.crewRepo.requestCrew(req).subscribe(result => {
      this._crewLoading.set(false);
      if (result.success) {
        this._crewRequestSuccess.set(result.requestId);
      }
    });
  }

  clearCrewRequestSuccess(): void {
    this._crewRequestSuccess.set(null);
  }
}
