import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ProjectRepository, CreateProjectDto } from '../project.repository';
import { Project } from '../../models/project.model';
import { MOCK_PROJECTS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class MockProjectRepository extends ProjectRepository {
  private projects: Project[] = [...MOCK_PROJECTS];

  getProjects(): Observable<Project[]> {
    return of([...this.projects]).pipe(delay(200));
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const p = this.projects.find(item => item.id === id);
    return of(p ? { ...p } : undefined).pipe(delay(150));
  }

  createProject(dto: CreateProjectDto): Observable<Project> {
    const newProject: Project = {
      id: `p-${Date.now()}`,
      name: dto.name,
      location: dto.location,
      clientName: dto.clientName,
      startDate: dto.startDate,
      endDate: dto.endDate,
      requiredWorkers: dto.requiredWorkers,
      deployedWorkers: 0,
      status: 'PLANNING',
      progressPercentage: 0,
      assignedCrewNames: []
    };
    this.projects = [newProject, ...this.projects];
    return of({ ...newProject }).pipe(delay(250));
  }

  incrementDeployedWorkers(projectId: string, count: number): Observable<Project> {
    this.projects = this.projects.map(p =>
      p.id === projectId
        ? {
            ...p,
            deployedWorkers: p.deployedWorkers + count,
            status: p.status === 'PLANNING' ? 'ACTIVE' : p.status
          }
        : p
    );
    const updated = this.projects.find(p => p.id === projectId)!;
    return of({ ...updated }).pipe(delay(150));
  }
}
