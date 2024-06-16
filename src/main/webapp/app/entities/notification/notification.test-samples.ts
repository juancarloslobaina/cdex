import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 18064,
  reference: 'distributor however',
  createdAt: dayjs('2024-06-16T17:17'),
  status: 'NEW',
};

export const sampleWithPartialData: INotification = {
  id: 5292,
  reference: 'integral crochet that',
  createdAt: dayjs('2024-06-16T13:15'),
  status: 'NEW',
};

export const sampleWithFullData: INotification = {
  id: 496,
  reference: 'astride down wiggle',
  createdAt: dayjs('2024-06-16T08:07'),
  status: 'READ',
};

export const sampleWithNewData: NewNotification = {
  reference: 'over inside',
  createdAt: dayjs('2024-06-15T18:30'),
  status: 'READ',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
