import { Observable } from 'rxjs';
import { Crew } from '../models/crew.model';

export interface CreateCrewDto {
  readonly name: string;
  readonly location: string;
  readonly dailyRatePerWorker: number;
  readonly availableFrom: string;
  readonly compositionNotes: string;
  readonly supervisorName?: string;
  readonly memberWorkerIds?: readonly string[];
}

export interface CrewRequestDto {
  readonly crewId: string;
  readonly startDate: string;
  readonly durationDays: number;
  readonly notes: string;
}

export abstract class CrewRepository {
  abstract getCrews(): Observable<Crew[]>;
  abstract getCrewById(id: string): Observable<Crew | undefined>;
  abstract createCrew(dto: CreateCrewDto): Observable<Crew>;
  abstract requestCrew(req: CrewRequestDto): Observable<{ success: boolean; requestId: string }>;
}
