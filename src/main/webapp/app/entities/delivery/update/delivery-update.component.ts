import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IProvider } from 'app/entities/provider/provider.model';
import { ProviderService } from 'app/entities/provider/service/provider.service';
import { DeliveryService } from '../service/delivery.service';
import { IDelivery } from '../delivery.model';
import { DeliveryFormService, DeliveryFormGroup } from './delivery-form.service';

@Component({
  standalone: true,
  selector: 'jhi-delivery-update',
  templateUrl: './delivery-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DeliveryUpdateComponent implements OnInit {
  isSaving = false;
  delivery: IDelivery | null = null;

  usersSharedCollection: IUser[] = [];
  providersSharedCollection: IProvider[] = [];

  protected deliveryService = inject(DeliveryService);
  protected deliveryFormService = inject(DeliveryFormService);
  protected userService = inject(UserService);
  protected providerService = inject(ProviderService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DeliveryFormGroup = this.deliveryFormService.createDeliveryFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareProvider = (o1: IProvider | null, o2: IProvider | null): boolean => this.providerService.compareProvider(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ delivery }) => {
      this.delivery = delivery;
      if (delivery) {
        this.updateForm(delivery);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const delivery = this.deliveryFormService.getDelivery(this.editForm);
    if (delivery.id !== null) {
      this.subscribeToSaveResponse(this.deliveryService.update(delivery));
    } else {
      this.subscribeToSaveResponse(this.deliveryService.create(delivery));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDelivery>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(delivery: IDelivery): void {
    this.delivery = delivery;
    this.deliveryFormService.resetForm(this.editForm, delivery);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, delivery.user);
    this.providersSharedCollection = this.providerService.addProviderToCollectionIfMissing<IProvider>(
      this.providersSharedCollection,
      ...(delivery.providers ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.delivery?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.providerService
      .query()
      .pipe(map((res: HttpResponse<IProvider[]>) => res.body ?? []))
      .pipe(
        map((providers: IProvider[]) =>
          this.providerService.addProviderToCollectionIfMissing<IProvider>(providers, ...(this.delivery?.providers ?? [])),
        ),
      )
      .subscribe((providers: IProvider[]) => (this.providersSharedCollection = providers));
  }
}
