import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { RequestRepository } from '../request.repository';
import { WorkforceRequest } from '../../models/request.model';
import { MOCK_REQUESTS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class MockRequestRepository extends RequestRepository {
  private requests: WorkforceRequest[] = [...MOCK_REQUESTS];

  getRequests(): Observable<WorkforceRequest[]> {
    return of([...this.requests]).pipe(delay(200));
  }

  createRequest(dto: Partial<WorkforceRequest>): Observable<WorkforceRequest> {
    const newReq: WorkforceRequest = {
      id: `req-${Date.now()}`,
      requesterContractorId: 'c-001',
      requesterContractorName: 'Ramesh Constructions',
      targetContractorId: dto.targetContractorId || 'c-002',
      targetContractorName: dto.targetContractorName || 'Sri Sai Infra',
      trade: dto.trade || 'MASON',
      workerCount: dto.workerCount || 1,
      location: dto.location || 'Hyderabad',
      startDate: dto.startDate || new Date().toISOString().split('T')[0],
      endDate: dto.endDate || new Date().toISOString().split('T')[0],
      durationDays: dto.durationDays || 10,
      dailyRate: dto.dailyRate || 900,
      accommodationProvided: !!dto.accommodationProvided,
      transportProvided: !!dto.transportProvided,
      shiftType: dto.shiftType || 'DAY',
      notes: dto.notes || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      matchScore: Math.floor(Math.random() * 10) + 90 // 90-99%
    };

    this.requests = [newReq, ...this.requests];
    return of(newReq).pipe(delay(350));
  }

  updateRequestStatus(id: string, status: WorkforceRequest['status']): Observable<WorkforceRequest> {
    this.requests = this.requests.map(r => r.id === id ? { ...r, status } : r);
    const updated = this.requests.find(r => r.id === id)!;
    return of(updated).pipe(delay(200));
  }
}
