import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { MachineryRepository } from '../machinery.repository';
import { CreateMachineryDto, Machinery, MachineryStatus } from '../../models/machinery.model';
import { MOCK_MACHINERY } from './mock-data';

@Injectable({ providedIn: 'root' })
export class MockMachineryRepository extends MachineryRepository {
  private items: Machinery[] = [...MOCK_MACHINERY];

  getMachinery(): Observable<Machinery[]> {
    return of([...this.items]).pipe(delay(200));
  }

  createMachinery(dto: CreateMachineryDto): Observable<Machinery> {
    const created: Machinery = {
      id: `m-${Date.now()}`,
      contractorId: 'c-001',
      name: dto.name,
      type: dto.type,
      customType: dto.customType,
      quantity: dto.quantity,
      status: 'AVAILABLE',
      location: dto.location,
      dailyHireRate: dto.dailyHireRate,
      condition: dto.condition,
      notes: dto.notes
    };
    this.items = [created, ...this.items];
    return of({ ...created }).pipe(delay(300));
  }

  updateStatus(id: string, status: MachineryStatus): Observable<Machinery> {
    this.items = this.items.map(item => item.id === id ? { ...item, status } : item);
    const updated = this.items.find(item => item.id === id)!;
    return of({ ...updated }).pipe(delay(150));
  }

  assignToProject(id: string, projectId: string, projectName: string): Observable<Machinery> {
    this.items = this.items.map(item =>
      item.id === id
        ? { ...item, status: 'DEPLOYED', assignedProjectId: projectId, assignedProjectName: projectName }
        : item
    );
    const updated = this.items.find(item => item.id === id)!;
    return of({ ...updated }).pipe(delay(200));
  }
}
