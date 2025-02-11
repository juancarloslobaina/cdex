import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProvider, NewProvider } from '../provider.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProvider for edit and NewProviderFormGroupInput for create.
 */
type ProviderFormGroupInput = IProvider | PartialWithRequiredKeyOf<NewProvider>;

type ProviderFormDefaults = Pick<NewProvider, 'id' | 'clients' | 'deliveries'>;

type ProviderFormGroupContent = {
  id: FormControl<IProvider['id'] | NewProvider['id']>;
  referralCode: FormControl<IProvider['referralCode']>;
  user: FormControl<IProvider['user']>;
  clients: FormControl<IProvider['clients']>;
  deliveries: FormControl<IProvider['deliveries']>;
};

export type ProviderFormGroup = FormGroup<ProviderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProviderFormService {
  createProviderFormGroup(provider: ProviderFormGroupInput = { id: null }): ProviderFormGroup {
    const providerRawValue = {
      ...this.getFormDefaults(),
      ...provider,
    };
    return new FormGroup<ProviderFormGroupContent>({
      id: new FormControl(
        { value: providerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      referralCode: new FormControl(providerRawValue.referralCode, {
        validators: [Validators.required],
      }),
      user: new FormControl(providerRawValue.user, {
        validators: [Validators.required],
      }),
      clients: new FormControl(providerRawValue.clients ?? []),
      deliveries: new FormControl(providerRawValue.deliveries ?? []),
    });
  }

  getProvider(form: ProviderFormGroup): IProvider | NewProvider {
    return form.getRawValue() as IProvider | NewProvider;
  }

  resetForm(form: ProviderFormGroup, provider: ProviderFormGroupInput): void {
    const providerRawValue = { ...this.getFormDefaults(), ...provider };
    form.reset(
      {
        ...providerRawValue,
        id: { value: providerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProviderFormDefaults {
    return {
      id: null,
      clients: [],
      deliveries: [],
    };
  }
}
