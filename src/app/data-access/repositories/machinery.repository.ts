import { Observable } from 'rxjs';
import { CreateMachineryDto, Machinery, MachineryStatus } from '../models/machinery.model';

export abstract class MachineryRepository {
  abstract getMachinery(): Observable<Machinery[]>;
  abstract createMachinery(dto: CreateMachineryDto): Observable<Machinery>;
  abstract updateStatus(id: string, status: MachineryStatus): Observable<Machinery>;
  abstract assignToProject(id: string, projectId: string, projectName: string): Observable<Machinery>;
}
