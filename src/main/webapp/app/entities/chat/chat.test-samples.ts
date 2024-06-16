import dayjs from 'dayjs/esm';

import { IChat, NewChat } from './chat.model';

export const sampleWithRequiredData: IChat = {
  id: 24696,
  message: 'gee',
  createdAt: dayjs('2024-06-16T10:36'),
};

export const sampleWithPartialData: IChat = {
  id: 16113,
  message: 'defrost greedily slipper',
  createdAt: dayjs('2024-06-16T08:47'),
};

export const sampleWithFullData: IChat = {
  id: 8845,
  message: 'psst belfry since',
  createdAt: dayjs('2024-06-16T01:44'),
  status: 'READ',
};

export const sampleWithNewData: NewChat = {
  message: 'aha fasten logistics',
  createdAt: dayjs('2024-06-16T03:24'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
