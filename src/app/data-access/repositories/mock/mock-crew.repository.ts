import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CrewRepository, CreateCrewDto, CrewRequestDto } from '../crew.repository';
import { Crew, CrewComposition } from '../../models/crew.model';
import { WorkerTrade } from '../../models/worker.model';
import { MOCK_CREWS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class MockCrewRepository extends CrewRepository {
  private crews: Crew[] = [...MOCK_CREWS];

  getCrews(): Observable<Crew[]> {
    return of([...this.crews]).pipe(delay(200));
  }

  getCrewById(id: string): Observable<Crew | undefined> {
    const crew = this.crews.find(c => c.id === id);
    return of(crew ? { ...crew } : undefined).pipe(delay(150));
  }

  createCrew(dto: CreateCrewDto): Observable<Crew> {
    const memberIds = dto.memberWorkerIds ?? [];
    const newCrew: Crew = {
      id: `crew-${Date.now()}`,
      name: dto.name,
      contractorId: 'c-001',
      contractorName: 'Ramesh Constructions',
      supervisorName: dto.supervisorName || 'TBD',
      totalWorkers: memberIds.length || 1,
      composition: dto.compositionNotes
        ? dto.compositionNotes.split(',').map((part): CrewComposition => {
            const [trade, count] = part.trim().split(':');
            return { trade: (trade?.trim() || 'MASON') as WorkerTrade, count: Number(count) || memberIds.length || 1 };
          })
        : [{ trade: 'MASON', count: memberIds.length || 1 }],
      averageRating: 4.8,
      dailyRatePerWorker: dto.dailyRatePerWorker,
      availableFrom: dto.availableFrom,
      location: dto.location,
      status: 'AVAILABLE',
      memberWorkerIds: memberIds
    };
    this.crews = [newCrew, ...this.crews];
    return of({ ...newCrew }).pipe(delay(300));
  }

  requestCrew(req: CrewRequestDto): Observable<{ success: boolean; requestId: string }> {
    return of({ success: true, requestId: `REQ-${Date.now()}` }).pipe(delay(700));
  }
}
