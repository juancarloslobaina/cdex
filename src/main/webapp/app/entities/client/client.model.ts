import { IUser } from 'app/entities/user/user.model';
import { IProvider } from 'app/entities/provider/provider.model';

export interface IClient {
  id: number;
  balance?: number | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  providers?: Pick<IProvider, 'id'>[] | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
