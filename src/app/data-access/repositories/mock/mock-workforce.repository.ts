import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { WorkforceRepository } from '../workforce.repository';
import { Worker, CreateWorkerDto } from '../../models/worker.model';
import { MOCK_WORKERS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class MockWorkforceRepository extends WorkforceRepository {
  private workers: Worker[] = [...MOCK_WORKERS];

  getWorkers(): Observable<Worker[]> {
    return of([...this.workers]).pipe(delay(200));
  }

  getWorkerById(id: string): Observable<Worker | undefined> {
    const worker = this.workers.find(w => w.id === id);
    return of(worker ? { ...worker } : undefined).pipe(delay(150));
  }

  createWorker(dto: CreateWorkerDto): Observable<Worker> {
    const newWorker: Worker = {
      id: `w-${Date.now()}`,
      name: dto.name,
      trade: dto.trade,
      secondarySkills: dto.secondarySkills,
      experienceYears: dto.experienceYears,
      rating: 5.0,
      dailyRate: dto.dailyRate,
      status: 'AVAILABLE',
      availableDate: new Date().toISOString().split('T')[0],
      location: dto.location,
      phone: dto.phone,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?auto=format&fit=crop&q=80&w=200`,
      contractorId: 'c-001',
      contractorName: 'Ramesh Constructions',
      attendanceRate: 100,
      retentionRate: 100,
      completedProjectsCount: 0,
      bio: `Newly registered ${dto.trade.toLowerCase()} with ${dto.experienceYears} years experience.`
    };
    this.workers = [newWorker, ...this.workers];
    return of(newWorker).pipe(delay(300));
  }

  updateWorkerStatus(id: string, status: Worker['status']): Observable<Worker> {
    this.workers = this.workers.map(w => w.id === id ? { ...w, status } : w);
    const updated = this.workers.find(w => w.id === id)!;
    return of(updated).pipe(delay(150));
  }

  assignWorkerToProject(workerId: string, projectId: string, projectName: string): Observable<Worker> {
    this.workers = this.workers.map(w => 
      w.id === workerId 
        ? { ...w, status: 'DEPLOYED', currentProjectId: projectId, currentProjectName: projectName } 
        : w
    );
    const updated = this.workers.find(w => w.id === workerId)!;
    return of(updated).pipe(delay(200));
  }
}
