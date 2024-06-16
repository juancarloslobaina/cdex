import { IBeneficiary, NewBeneficiary } from './beneficiary.model';

export const sampleWithRequiredData: IBeneficiary = {
  id: 9232,
  alias: 'sticky',
  phone: '920 885 390',
  city: 'Pamplona',
};

export const sampleWithPartialData: IBeneficiary = {
  id: 6226,
  alias: 'however network at',
  phone: '971 347 887',
  city: 'Zamora',
  referenceAddress: 'instead',
};

export const sampleWithFullData: IBeneficiary = {
  id: 18,
  alias: 'because until through',
  phone: '924-627-313',
  city: 'Torrevieja',
  address: 'swordfish',
  referenceAddress: 'now undress geez',
};

export const sampleWithNewData: NewBeneficiary = {
  alias: 'reassuringly incidentally',
  phone: '997 547 369',
  city: 'Huelva',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
