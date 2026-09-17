import { Observable } from 'rxjs';
import { Worker, CreateWorkerDto } from '../models/worker.model';

export abstract class WorkforceRepository {
  abstract getWorkers(): Observable<Worker[]>;
  abstract getWorkerById(id: string): Observable<Worker | undefined>;
  abstract createWorker(dto: CreateWorkerDto): Observable<Worker>;
  abstract updateWorkerStatus(id: string, status: Worker['status']): Observable<Worker>;
  abstract assignWorkerToProject(workerId: string, projectId: string, projectName: string): Observable<Worker>;
}
