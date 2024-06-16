import { IProvider, NewProvider } from './provider.model';

export const sampleWithRequiredData: IProvider = {
  id: 26500,
  referralCode: 'abaft',
};

export const sampleWithPartialData: IProvider = {
  id: 21862,
  referralCode: 'fooey barring',
};

export const sampleWithFullData: IProvider = {
  id: 23941,
  referralCode: 'out',
};

export const sampleWithNewData: NewProvider = {
  referralCode: 'competent questioningly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
