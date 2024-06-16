import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 14234,
};

export const sampleWithPartialData: IClient = {
  id: 29772,
};

export const sampleWithFullData: IClient = {
  id: 23535,
  balance: 2640.48,
};

export const sampleWithNewData: NewClient = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
