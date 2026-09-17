import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MachineryStore } from '../../../state/machinery.store';
import { ProjectStore } from '../../../state/project.store';
import { NotificationStore } from '../../../state/notification.store';
import { ToastStore } from '../../../state/toast.store';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocaleLabelPipe } from '../../../core/i18n/locale-label.pipe';
import {
  Machinery,
  MachineryCondition,
  MachineryStatus,
  MachineryType
} from '../../../data-access/models/machinery.model';
import { SearchInputComponent } from '../../../shared/ui/search-input/search-input.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-machinery',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SearchInputComponent,
    ButtonComponent,
    ModalComponent,
    BadgeComponent,
    TranslatePipe,
    LocaleLabelPipe
  ],
  templateUrl: './machinery.component.html',
  styleUrl: './machinery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MachineryComponent {
  readonly store = inject(MachineryStore);
  readonly projectStore = inject(ProjectStore);
  readonly i18n = inject(I18nService);
  private readonly notifications = inject(NotificationStore);
  private readonly toast = inject(ToastStore);
  private readonly fb = inject(FormBuilder);

  isAddOpen = signal(false);
  selected = signal<Machinery | undefined>(undefined);
  assigning = signal<Machinery | undefined>(undefined);

  readonly typesList: (MachineryType | 'ALL')[] = [
    'ALL',
    'EXCAVATOR',
    'JCB_BACKHOE',
    'TOWER_CRANE',
    'MOBILE_CRANE',
    'CONCRETE_MIXER',
    'TRANSIT_MIXER',
    'DUMPER',
    'ROLLER',
    'GENERATOR',
    'SCAFFOLDING',
    'OTHER'
  ];

  readonly statusList: (MachineryStatus | 'ALL')[] = [
    'ALL',
    'AVAILABLE',
    'DEPLOYED',
    'ON_HIRE',
    'MAINTENANCE'
  ];

  addForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: ['EXCAVATOR' as MachineryType, Validators.required],
    customType: [''],
    quantity: [1, [Validators.required, Validators.min(1)]],
    location: ['Hyderabad yard', Validators.required],
    dailyHireRate: [2500, [Validators.required, Validators.min(100)]],
    condition: ['GOOD' as MachineryCondition, Validators.required],
    notes: ['']
  });

  readonly selectedAddType = toSignal(this.addForm.controls.type.valueChanges, {
    initialValue: this.addForm.controls.type.value
  });

  typeLabel(type: MachineryType, customType?: string): string {
    if (type === 'OTHER') return customType || this.i18n.t('enum.machineryType.OTHER');
    return this.i18n.label('machineryType', type);
  }

  badgeVariant(status: MachineryStatus): 'available' | 'deployed' | 'on-leave' | 'accent' {
    switch (status) {
      case 'AVAILABLE': return 'available';
      case 'DEPLOYED': return 'deployed';
      case 'ON_HIRE': return 'accent';
      default: return 'on-leave';
    }
  }

  onSearch(query: string): void {
    this.store.searchQuery.set(query);
  }

  selectType(type: MachineryType | 'ALL'): void {
    this.store.selectedType.set(type);
  }

  selectStatus(status: MachineryStatus | 'ALL'): void {
    this.store.selectedStatus.set(status);
  }

  openAdd(): void {
    this.isAddOpen.set(true);
  }

  closeAdd(): void {
    this.isAddOpen.set(false);
  }

  submitAdd(): void {
    if (this.addForm.invalid) return;
    const val = this.addForm.getRawValue();
    if (val.type === 'OTHER' && !val.customType.trim()) return;

    this.store.addMachinery({
      name: val.name,
      type: val.type,
      customType: val.type === 'OTHER' ? val.customType.trim() : undefined,
      quantity: val.quantity,
      location: val.location,
      dailyHireRate: val.dailyHireRate,
      condition: val.condition,
      notes: val.notes || undefined
    });

    this.notifications.addNotification({
      title: this.i18n.t('notif.machineAdded'),
      message: this.i18n.t('notif.machineAddedBody', { name: val.name }),
      category: 'PROJECT',
      actionUrl: '/contractor/machinery'
    });
    this.addForm.reset({
      name: '',
      type: 'EXCAVATOR',
      customType: '',
      quantity: 1,
      location: 'Hyderabad yard',
      dailyHireRate: 2500,
      condition: 'GOOD',
      notes: ''
    });
    this.closeAdd();
    this.toast.show(this.i18n.t('toast.machineListed'));
  }

  openDetail(item: Machinery): void {
    this.selected.set(item);
  }

  closeDetail(): void {
    this.selected.set(undefined);
  }

  openAssign(item: Machinery): void {
    this.assigning.set(item);
  }

  closeAssign(): void {
    this.assigning.set(undefined);
  }

  confirmAssign(projectId: string): void {
    const item = this.assigning();
    const project = this.projectStore.projects().find(p => p.id === projectId);
    if (!item || !project) return;

    this.store.assignToProject(item.id, project.id, project.name);
    this.notifications.addNotification({
      title: this.i18n.t('notif.plantAssigned'),
      message: this.i18n.t('notif.plantAssignedBody', { name: item.name, project: project.name }),
      category: 'PROJECT',
      actionUrl: '/contractor/projects'
    });
    this.toast.show(this.i18n.t('toast.assignedTo', { name: item.name, project: project.name }));
    this.closeAssign();
    this.closeDetail();
  }
}
