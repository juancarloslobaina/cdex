import dayjs from 'dayjs/esm';

import { IShipment, NewShipment } from './shipment.model';

export const sampleWithRequiredData: IShipment = {
  id: 15919,
  reference: 'gullible inaugurate',
  amount: 1669.67,
  createdAt: dayjs('2024-06-16T05:10'),
  status: 'COMPLETED',
  type: 'FOOD',
  active: false,
  screenshot: '../fake-data/blob/hipster.png',
  screenshotContentType: 'unknown',
};

export const sampleWithPartialData: IShipment = {
  id: 32653,
  reference: 'termination curd page',
  amount: 19467.91,
  createdAt: dayjs('2024-06-15T21:33'),
  status: 'ASSIGNED',
  type: 'FOOD',
  active: true,
  screenshot: '../fake-data/blob/hipster.png',
  screenshotContentType: 'unknown',
};

export const sampleWithFullData: IShipment = {
  id: 2603,
  reference: 'phooey impossible deliberate',
  amount: 18045.45,
  createdAt: dayjs('2024-06-16T13:56'),
  status: 'CREATED',
  type: 'ALL',
  active: false,
  screenshot: '../fake-data/blob/hipster.png',
  screenshotContentType: 'unknown',
};

export const sampleWithNewData: NewShipment = {
  reference: 'anenst',
  amount: 28481.92,
  createdAt: dayjs('2024-06-16T11:14'),
  status: 'COMPLETED',
  type: 'FOOD',
  active: false,
  screenshot: '../fake-data/blob/hipster.png',
  screenshotContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
