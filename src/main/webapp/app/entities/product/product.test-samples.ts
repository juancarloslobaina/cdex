import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 4173,
  name: 'senate',
  description: 'snicker reluctantly',
};

export const sampleWithPartialData: IProduct = {
  id: 1113,
  name: 'of psst buddy',
  description: 'shin until unto',
};

export const sampleWithFullData: IProduct = {
  id: 25242,
  name: 'so universe aw',
  description: 'indeed hm',
  price: 10740.08,
  active: true,
};

export const sampleWithNewData: NewProduct = {
  name: 'pound',
  description: 'provided yum gaseous',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
