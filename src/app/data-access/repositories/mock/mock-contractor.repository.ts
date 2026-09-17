import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ContractorRepository } from '../contractor.repository';
import { Contractor } from '../../models/contractor.model';
import { MOCK_CONTRACTORS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class MockContractorRepository extends ContractorRepository {
  private contractors: Contractor[] = [...MOCK_CONTRACTORS];

  getContractors(): Observable<Contractor[]> {
    return of([...this.contractors]).pipe(delay(200));
  }

  getContractorById(id: string): Observable<Contractor | undefined> {
    const c = this.contractors.find(item => item.id === id);
    return of(c ? { ...c } : undefined).pipe(delay(150));
  }

  toggleConnection(id: string): Observable<Contractor> {
    this.contractors = this.contractors.map(c => 
      c.id === id ? { ...c, connected: !c.connected } : c
    );
    const updated = this.contractors.find(c => c.id === id)!;
    return of(updated).pipe(delay(200));
  }
}
