export type MachineryType =
  | 'EXCAVATOR'
  | 'JCB_BACKHOE'
  | 'TOWER_CRANE'
  | 'MOBILE_CRANE'
  | 'CONCRETE_MIXER'
  | 'TRANSIT_MIXER'
  | 'DUMPER'
  | 'ROLLER'
  | 'GENERATOR'
  | 'SCAFFOLDING'
  | 'OTHER';

export type MachineryStatus = 'AVAILABLE' | 'ON_HIRE' | 'MAINTENANCE' | 'DEPLOYED';

export type MachineryCondition = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'NEEDS_SERVICE';

export interface Machinery {
  readonly id: string;
  readonly contractorId: string;
  readonly name: string;
  readonly type: MachineryType;
  readonly customType?: string;
  readonly quantity: number;
  readonly status: MachineryStatus;
  readonly location: string;
  readonly dailyHireRate: number;
  readonly condition: MachineryCondition;
  readonly notes?: string;
  readonly assignedProjectId?: string;
  readonly assignedProjectName?: string;
}

export interface CreateMachineryDto {
  readonly name: string;
  readonly type: MachineryType;
  readonly customType?: string;
  readonly quantity: number;
  readonly location: string;
  readonly dailyHireRate: number;
  readonly condition: MachineryCondition;
  readonly notes?: string;
}
