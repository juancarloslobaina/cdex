import { IUser } from 'app/entities/user/user.model';
import { IProvider } from 'app/entities/provider/provider.model';

export interface IDelivery {
  id: number;
  cashAvailable?: number | null;
  location?: string | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  providers?: Pick<IProvider, 'id'>[] | null;
}

export type NewDelivery = Omit<IDelivery, 'id'> & { id: null };
