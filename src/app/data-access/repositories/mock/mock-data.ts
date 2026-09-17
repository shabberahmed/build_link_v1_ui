import { Worker } from '../../models/worker.model';
import { Crew } from '../../models/crew.model';
import { Contractor } from '../../models/contractor.model';
import { Project } from '../../models/project.model';
import { WorkforceRequest } from '../../models/request.model';
import { AttendanceRecord } from '../../models/attendance.model';
import { PaymentRecord } from '../../models/payment.model';
import { AppNotification } from '../../models/notification.model';
import { Machinery } from '../../models/machinery.model';

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'w-101',
    name: 'Ravi Kumar',
    trade: 'MASON',
    secondarySkills: ['Tile Fitting', 'Plastering', 'Stone Work'],
    experienceYears: 8,
    rating: 4.8,
    dailyRate: 900,
    status: 'AVAILABLE',
    availableDate: '2026-09-03',
    location: 'Hyderabad',
    phone: '+91 98490 12345',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    contractorId: 'c-001',
    contractorName: 'Ramesh Constructions',
    attendanceRate: 96,
    retentionRate: 92,
    completedProjectsCount: 14,
    bio: 'Expert mason with 8+ years experience in high-rise RCC framework and decorative brick masonry.'
  },
  {
    id: 'w-102',
    name: 'Suresh Reddy',
    trade: 'SUPERVISOR',
    secondarySkills: ['Site Safety', 'Blueprint Reading', 'Crew Management'],
    experienceYears: 12,
    rating: 4.9,
    dailyRate: 1400,
    status: 'DEPLOYED',
    availableDate: '2026-09-25',
    location: 'Hyderabad',
    phone: '+91 98490 54321',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    contractorId: 'c-001',
    contractorName: 'Ramesh Constructions',
    currentProjectId: 'p-101',
    currentProjectName: 'Commercial Tower A',
    attendanceRate: 98,
    retentionRate: 95,
    completedProjectsCount: 22,
    bio: 'Senior site supervisor specializing in commercial tower construction and multi-crew coordination.'
  },
  {
    id: 'w-103',
    name: 'Mahesh Yadav',
    trade: 'MASON',
    secondarySkills: ['Concrete Pouring', 'Formwork'],
    experienceYears: 6,
    rating: 4.7,
    dailyRate: 850,
    status: 'DEPLOYED',
    availableDate: '2026-09-18',
    location: 'Hyderabad',
    phone: '+91 98490 67890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    contractorId: 'c-001',
    contractorName: 'Ramesh Constructions',
    currentProjectId: 'p-101',
    currentProjectName: 'Commercial Tower A',
    attendanceRate: 94,
    retentionRate: 89,
    completedProjectsCount: 10
  },
  {
    id: 'w-104',
    name: 'Venkat Rao',
    trade: 'ELECTRICIAN',
    secondarySkills: ['Conduit Wiring', 'DB Dressing', 'Transformer Fitting'],
    experienceYears: 7,
    rating: 4.8,
    dailyRate: 950,
    status: 'AVAILABLE',
    availableDate: '2026-09-03',
    location: 'Hyderabad',
    phone: '+91 98490 11223',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    contractorId: 'c-001',
    contractorName: 'Ramesh Constructions',
    attendanceRate: 97,
    retentionRate: 94,
    completedProjectsCount: 16
  },
  {
    id: 'w-105',
    name: 'Prakash Sharma',
    trade: 'PLUMBER',
    secondarySkills: ['CPVC Piping', 'Sanitary Fitting', 'Hydraulic Testing'],
    experienceYears: 9,
    rating: 4.6,
    dailyRate: 900,
    status: 'COMING_AVAILABLE',
    availableDate: '2026-09-10',
    location: 'Hyderabad',
    phone: '+91 98490 33445',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    contractorId: 'c-001',
    contractorName: 'Ramesh Constructions',
    currentProjectId: 'p-102',
    currentProjectName: 'Residential Enclave',
    attendanceRate: 93,
    retentionRate: 88,
    completedProjectsCount: 12
  },
  {
    id: 'w-106',
    name: 'Chandra Sekhar',
    trade: 'SHUTTERING',
    secondarySkills: ['Ply Shuttering', 'Aluminum Formwork', 'Scaffolding'],
    experienceYears: 10,
    rating: 4.9,
    dailyRate: 1000,
    status: 'AVAILABLE',
    availableDate: '2026-09-03',
    location: 'Hyderabad',
    phone: '+91 98490 55667',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    contractorId: 'c-001',
    contractorName: 'Ramesh Constructions',
    attendanceRate: 99,
    retentionRate: 96,
    completedProjectsCount: 18
  },
  {
    id: 'w-107',
    name: 'Kalyan Ram',
    trade: 'HELPER',
    secondarySkills: ['Material Handling', 'Site Cleanup', 'Mixing'],
    experienceYears: 3,
    rating: 4.5,
    dailyRate: 600,
    status: 'ON_LEAVE',
    availableDate: '2026-09-12',
    location: 'Hyderabad',
    phone: '+91 98490 77889',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    contractorId: 'c-001',
    contractorName: 'Ramesh Constructions',
    attendanceRate: 91,
    retentionRate: 85,
    completedProjectsCount: 6
  },
  {
    id: 'w-108',
    name: 'Anil Kumar',
    trade: 'WELDER',
    secondarySkills: ['ARC Welding', 'TIG Welding', 'Structural Steel Fabrication'],
    experienceYears: 9,
    rating: 4.8,
    dailyRate: 1100,
    status: 'AVAILABLE',
    availableDate: '2026-09-03',
    location: 'Bengaluru',
    phone: '+91 98800 44321',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=200',
    contractorId: 'c-002',
    contractorName: 'Sri Sai Infra',
    attendanceRate: 95,
    retentionRate: 93,
    completedProjectsCount: 15
  }
];

export const MOCK_CREWS: Crew[] = [
  {
    id: 'crew-01',
    name: 'Ramesh Masonry Crew Alpha',
    contractorId: 'c-001',
    contractorName: 'Ramesh Constructions',
    supervisorName: 'Suresh Reddy',
    totalWorkers: 12,
    composition: [
      { trade: 'SUPERVISOR', count: 1 },
      { trade: 'MASON', count: 7 },
      { trade: 'HELPER', count: 4 }
    ],
    averageRating: 4.9,
    dailyRatePerWorker: 880,
    availableFrom: '2026-09-15',
    location: 'Hyderabad',
    status: 'COMING_AVAILABLE',
    currentProjectName: 'Commercial Tower A',
    memberWorkerIds: ['w-101', 'w-102', 'w-103']
  },
  {
    id: 'crew-02',
    name: 'Sri Sai Shuttering Experts',
    contractorId: 'c-002',
    contractorName: 'Sri Sai Infra',
    supervisorName: 'Murali Mohan',
    totalWorkers: 15,
    composition: [
      { trade: 'SUPERVISOR', count: 1 },
      { trade: 'SHUTTERING', count: 9 },
      { trade: 'HELPER', count: 5 }
    ],
    averageRating: 4.8,
    dailyRatePerWorker: 950,
    availableFrom: '2026-09-03',
    location: 'Bengaluru',
    status: 'AVAILABLE',
    memberWorkerIds: ['w-106']
  },
  {
    id: 'crew-03',
    name: 'Deccan MEP Specialist Crew',
    contractorId: 'c-003',
    contractorName: 'Deccan Builders & Infra',
    supervisorName: 'Nageshwar Rao',
    totalWorkers: 8,
    composition: [
      { trade: 'SUPERVISOR', count: 1 },
      { trade: 'ELECTRICIAN', count: 4 },
      { trade: 'PLUMBER', count: 3 }
    ],
    averageRating: 4.7,
    dailyRatePerWorker: 980,
    availableFrom: '2026-09-05',
    location: 'Hyderabad',
    status: 'AVAILABLE',
    memberWorkerIds: ['w-104', 'w-105']
  }
];

export const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: 'c-001',
    companyName: 'Ramesh Constructions',
    contactPerson: 'Ahmed Shaik (You)',
    email: 'ahmed@rameshconstructions.com',
    phone: '+91 98490 99999',
    verified: true,
    rating: 4.8,
    completedProjects: 48,
    workforceCount: 84,
    experienceYears: 14,
    specializations: ['Civil & RCC', 'Commercial Towers', 'Masonry', 'Structural Steel'],
    location: 'Hyderabad',
    trustScore: {
      overall: 92,
      paymentReliability: 98,
      workforceReliability: 94,
      projectCompletion: 91,
      professionalism: 93,
      verificationScore: 100
    },
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    connected: true
  },
  {
    id: 'c-002',
    companyName: 'Sri Sai Infra',
    contactPerson: 'Venkatesh Rao',
    email: 'venkat@srisaiinfra.com',
    phone: '+91 98800 88888',
    verified: true,
    rating: 4.9,
    completedProjects: 62,
    workforceCount: 120,
    experienceYears: 18,
    specializations: ['High-rise Formwork', 'Pre-cast Concrete', 'RCC Infra'],
    location: 'Bengaluru',
    trustScore: {
      overall: 95,
      paymentReliability: 99,
      workforceReliability: 96,
      projectCompletion: 94,
      professionalism: 96,
      verificationScore: 100
    },
    avatarUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=200',
    connected: true
  },
  {
    id: 'c-003',
    companyName: 'Deccan Builders & Infra',
    contactPerson: 'Rajesh Goud',
    email: 'rajesh@deccanbuilders.in',
    phone: '+91 98480 77777',
    verified: true,
    rating: 4.7,
    completedProjects: 35,
    workforceCount: 65,
    experienceYears: 10,
    specializations: ['MEP Systems', 'Plumbing Networks', 'Electrical Contracting'],
    location: 'Hyderabad',
    trustScore: {
      overall: 89,
      paymentReliability: 92,
      workforceReliability: 90,
      projectCompletion: 88,
      professionalism: 91,
      verificationScore: 100
    },
    avatarUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=200',
    connected: false
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p-101',
    name: 'Commercial Tower A (Gachibowli)',
    location: 'Hyderabad',
    clientName: 'Aparna Cyber Life',
    startDate: '2026-05-01',
    endDate: '2026-11-30',
    requiredWorkers: 35,
    deployedWorkers: 28,
    status: 'ACTIVE',
    progressPercentage: 68,
    assignedCrewNames: ['Ramesh Masonry Crew Alpha']
  },
  {
    id: 'p-102',
    name: 'Residential Enclave Phase 2',
    location: 'Hyderabad',
    clientName: 'My Home Group',
    startDate: '2026-06-15',
    endDate: '2026-12-20',
    requiredWorkers: 20,
    deployedWorkers: 17,
    status: 'ACTIVE',
    progressPercentage: 45,
    assignedCrewNames: ['Deccan MEP Specialist Crew']
  },
  {
    id: 'p-103',
    name: 'IT Park Block 4 Flyover',
    location: 'Hyderabad',
    clientName: 'TSIIC Infrastructure',
    startDate: '2026-08-01',
    endDate: '2027-02-28',
    requiredWorkers: 15,
    deployedWorkers: 12,
    status: 'ACTIVE',
    progressPercentage: 25,
    assignedCrewNames: ['Sri Sai Shuttering Experts']
  }
];

export const MOCK_REQUESTS: WorkforceRequest[] = [
  {
    id: 'req-201',
    requesterContractorId: 'c-003',
    requesterContractorName: 'Deccan Builders & Infra',
    targetContractorId: 'c-001',
    targetContractorName: 'Ramesh Constructions',
    trade: 'MASON',
    workerCount: 10,
    location: 'Hyderabad (Financial District)',
    startDate: '2026-09-10',
    endDate: '2026-09-30',
    durationDays: 20,
    dailyRate: 950,
    accommodationProvided: true,
    transportProvided: true,
    shiftType: 'DAY',
    notes: 'Urgent demand for high-grade brickwork and plastering.',
    status: 'PENDING',
    createdAt: '2026-09-02T10:30:00Z',
    matchScore: 96
  },
  {
    id: 'req-202',
    requesterContractorId: 'c-001',
    requesterContractorName: 'Ramesh Constructions',
    targetContractorId: 'c-002',
    targetContractorName: 'Sri Sai Infra',
    trade: 'SHUTTERING',
    workerCount: 8,
    location: 'Hyderabad (Gachibowli)',
    startDate: '2026-09-15',
    endDate: '2026-10-15',
    durationDays: 30,
    dailyRate: 1000,
    accommodationProvided: false,
    transportProvided: true,
    shiftType: 'DAY',
    notes: 'Aluminum formwork for floor slab 14.',
    status: 'ACCEPTED',
    createdAt: '2026-08-28T14:15:00Z',
    matchScore: 98
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    workerId: 'w-101',
    workerName: 'Ravi Kumar',
    projectId: 'p-101',
    projectName: 'Commercial Tower A',
    date: '2026-09-02',
    status: 'PRESENT',
    checkInTime: '08:00 AM',
    checkOutTime: '05:30 PM',
    hoursWorked: 9,
    dailyWagesEarned: 900
  },
  {
    id: 'att-02',
    workerId: 'w-102',
    workerName: 'Suresh Reddy',
    projectId: 'p-101',
    projectName: 'Commercial Tower A',
    date: '2026-09-02',
    status: 'OVERTIME',
    checkInTime: '07:30 AM',
    checkOutTime: '07:30 PM',
    hoursWorked: 11,
    dailyWagesEarned: 1750
  }
];

export const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-501',
    recipientName: 'Ravi Kumar',
    role: 'WORKER',
    amount: 16200,
    currency: 'INR',
    date: '2026-08-31',
    status: 'PAID',
    type: 'WAGE_PAYOUT',
    periodDescription: 'Aug 16 - Aug 31 (18 days)',
    referenceNumber: 'UPI/202608319981'
  },
  {
    id: 'pay-502',
    recipientName: 'Sri Sai Infra',
    role: 'CONTRACTOR',
    amount: 240000,
    currency: 'INR',
    date: '2026-08-25',
    status: 'PAID',
    type: 'CONTRACTOR_SETTLEMENT',
    periodDescription: 'Crew Deployment Settlement #12',
    referenceNumber: 'NEFT/N202608257721'
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n-1',
    title: 'New Workforce Request',
    message: 'Deccan Builders requested 10 Masons in Hyderabad starting Sept 10.',
    timestamp: 'time.m10',
    read: false,
    category: 'REQUEST',
    actionUrl: '/contractor/requests'
  },
  {
    id: 'n-2',
    title: 'Workers Becoming Available',
    message: '12 workers from Ramesh Masonry Crew Alpha will finish Commercial Tower A on Sept 15.',
    timestamp: 'time.h2',
    read: false,
    category: 'AVAILABILITY',
    actionUrl: '/contractor/availability'
  },
  {
    id: 'n-3',
    title: 'Weekly Payout Verified',
    message: 'Payment of ₹1,84,000 for Commercial Tower A site workers processed.',
    timestamp: 'time.d1',
    read: true,
    category: 'PAYMENT',
    actionUrl: '/contractor/payments'
  }
];

export const MOCK_MACHINERY: Machinery[] = [
  {
    id: 'm-101',
    contractorId: 'c-001',
    name: 'Tata Hitachi EX200',
    type: 'EXCAVATOR',
    quantity: 2,
    status: 'AVAILABLE',
    location: 'Hyderabad yard',
    dailyHireRate: 8500,
    condition: 'GOOD',
    notes: '20T class. GPS tracked.'
  },
  {
    id: 'm-102',
    contractorId: 'c-001',
    name: 'JCB 3DX Super',
    type: 'JCB_BACKHOE',
    quantity: 3,
    status: 'DEPLOYED',
    location: 'Gachibowli',
    dailyHireRate: 4200,
    condition: 'EXCELLENT',
    assignedProjectId: 'p-101',
    assignedProjectName: 'Commercial Tower A (Gachibowli)'
  },
  {
    id: 'm-103',
    contractorId: 'c-001',
    name: 'Potain MC 85',
    type: 'TOWER_CRANE',
    quantity: 1,
    status: 'DEPLOYED',
    location: 'Gachibowli',
    dailyHireRate: 18000,
    condition: 'GOOD',
    assignedProjectId: 'p-101',
    assignedProjectName: 'Commercial Tower A (Gachibowli)'
  },
  {
    id: 'm-104',
    contractorId: 'c-001',
    name: 'Schwing Stetter mixer',
    type: 'CONCRETE_MIXER',
    quantity: 4,
    status: 'AVAILABLE',
    location: 'Hyderabad yard',
    dailyHireRate: 1600,
    condition: 'GOOD'
  },
  {
    id: 'm-105',
    contractorId: 'c-001',
    name: 'Ashok Leyland transit mixer',
    type: 'TRANSIT_MIXER',
    quantity: 2,
    status: 'ON_HIRE',
    location: 'Financial District',
    dailyHireRate: 7500,
    condition: 'FAIR',
    notes: 'On hire to Deccan Builders this week.'
  },
  {
    id: 'm-106',
    contractorId: 'c-001',
    name: 'Kirloskar 125 kVA',
    type: 'GENERATOR',
    quantity: 3,
    status: 'AVAILABLE',
    location: 'Hyderabad yard',
    dailyHireRate: 2800,
    condition: 'EXCELLENT'
  },
  {
    id: 'm-107',
    contractorId: 'c-001',
    name: 'Hamm HD 99 roller',
    type: 'ROLLER',
    quantity: 1,
    status: 'MAINTENANCE',
    location: 'Workshop',
    dailyHireRate: 5500,
    condition: 'NEEDS_SERVICE',
    notes: 'Drum bearing replacement in progress.'
  },
  {
    id: 'm-108',
    contractorId: 'c-001',
    name: 'Cuplock scaffold set',
    type: 'SCAFFOLDING',
    quantity: 12,
    status: 'DEPLOYED',
    location: 'Residential Enclave',
    dailyHireRate: 900,
    condition: 'GOOD',
    assignedProjectId: 'p-102',
    assignedProjectName: 'Residential Enclave Phase 2'
  }
];
