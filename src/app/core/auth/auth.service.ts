import { Injectable, signal, computed } from '@angular/core';

export type UserRole = 'CONTRACTOR' | 'WORKER' | 'ADMIN' | 'SUPERVISOR' | 'BUILDER' | 'SUBCONTRACTOR';

export interface UserSession {
  readonly id: string;
  readonly name: string;
  readonly role: UserRole;
  readonly email: string;
  readonly companyOrTrade: string;
  readonly avatar: string;
}

const CONTRACTOR_SESSION: UserSession = {
  id: 'user-001',
  name: 'Ahmed Shaik',
  role: 'CONTRACTOR',
  email: 'ahmed@rameshconstructions.com',
  companyOrTrade: 'Ramesh Constructions',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
};

const WORKER_SESSION: UserSession = {
  id: 'w-101',
  name: 'Ravi Kumar',
  role: 'WORKER',
  email: 'ravi.kumar@worker.buildlink.in',
  companyOrTrade: 'Senior Mason',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<UserSession | null>(null);
  private readonly _isLoggedIn = signal<boolean>(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn = this._isLoggedIn.asReadonly();
  readonly role = computed(() => this._currentUser()?.role ?? null);
  readonly isContractor = computed(() => this._currentUser()?.role === 'CONTRACTOR');
  readonly isWorker = computed(() => this._currentUser()?.role === 'WORKER');

  login(role: UserRole): void {
    const session = role === 'WORKER' ? WORKER_SESSION : CONTRACTOR_SESSION;
    this._currentUser.set(session);
    this._isLoggedIn.set(true);
  }

  logout(): void {
    this._currentUser.set(null);
    this._isLoggedIn.set(false);
  }

  switchRole(role: UserRole): void {
    const session = role === 'WORKER' ? WORKER_SESSION : CONTRACTOR_SESSION;
    this._currentUser.set(session);
    this._isLoggedIn.set(true);
  }
}
