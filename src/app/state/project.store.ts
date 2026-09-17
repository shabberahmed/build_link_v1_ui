import { Injectable, inject, signal, computed } from '@angular/core';
import { ProjectRepository, CreateProjectDto } from '../data-access/repositories/project.repository';
import { Project } from '../data-access/models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectStore {
  private readonly projectRepo = inject(ProjectRepository);

  private readonly _projects = signal<Project[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly projects = this._projects.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly activeProjects = computed(() =>
    this._projects().filter(p => p.status === 'ACTIVE')
  );

  readonly activeProjectsCount = computed(() => this.activeProjects().length);

  constructor() {
    this.loadProjects();
  }

  loadProjects(): void {
    this._loading.set(true);
    this.projectRepo.getProjects().subscribe(list => {
      this._projects.set(list);
      this._loading.set(false);
    });
  }

  createProject(dto: CreateProjectDto): void {
    this._loading.set(true);
    this.projectRepo.createProject(dto).subscribe(created => {
      this._projects.update(prev => [created, ...prev]);
      this._loading.set(false);
    });
  }

  incrementDeployedWorkers(projectId: string, count: number): void {
    this.projectRepo.incrementDeployedWorkers(projectId, count).subscribe(updated => {
      this._projects.update(prev => prev.map(p => p.id === projectId ? updated : p));
    });
  }
}
