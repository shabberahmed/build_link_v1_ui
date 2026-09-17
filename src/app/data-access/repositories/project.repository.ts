import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

export interface CreateProjectDto {
  readonly name: string;
  readonly location: string;
  readonly clientName: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly requiredWorkers: number;
}

export abstract class ProjectRepository {
  abstract getProjects(): Observable<Project[]>;
  abstract getProjectById(id: string): Observable<Project | undefined>;
  abstract createProject(dto: CreateProjectDto): Observable<Project>;
  abstract incrementDeployedWorkers(projectId: string, count: number): Observable<Project>;
}
