import { Observable } from 'rxjs';
import { WorkforceRequest } from '../models/request.model';

export abstract class RequestRepository {
  abstract getRequests(): Observable<WorkforceRequest[]>;
  abstract createRequest(request: Partial<WorkforceRequest>): Observable<WorkforceRequest>;
  abstract updateRequestStatus(id: string, status: WorkforceRequest['status']): Observable<WorkforceRequest>;
}
