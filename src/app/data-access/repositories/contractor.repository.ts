import { Observable } from 'rxjs';
import { Contractor } from '../models/contractor.model';

export abstract class ContractorRepository {
  abstract getContractors(): Observable<Contractor[]>;
  abstract getContractorById(id: string): Observable<Contractor | undefined>;
  abstract toggleConnection(id: string): Observable<Contractor>;
}
