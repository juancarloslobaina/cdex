import { IDelivery, NewDelivery } from './delivery.model';

export const sampleWithRequiredData: IDelivery = {
  id: 17626,
  cashAvailable: 18535.28,
};

export const sampleWithPartialData: IDelivery = {
  id: 7758,
  cashAvailable: 20328.35,
  location: 'rib',
};

export const sampleWithFullData: IDelivery = {
  id: 29722,
  cashAvailable: 32706.42,
  location: 'excluding',
};

export const sampleWithNewData: NewDelivery = {
  cashAvailable: 17264.37,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
