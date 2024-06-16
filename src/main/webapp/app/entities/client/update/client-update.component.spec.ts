import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IProvider } from 'app/entities/provider/provider.model';
import { ProviderService } from 'app/entities/provider/service/provider.service';
import { IClient } from '../client.model';
import { ClientService } from '../service/client.service';
import { ClientFormService } from './client-form.service';

import { ClientUpdateComponent } from './client-update.component';

describe('Client Management Update Component', () => {
  let comp: ClientUpdateComponent;
  let fixture: ComponentFixture<ClientUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let clientFormService: ClientFormService;
  let clientService: ClientService;
  let userService: UserService;
  let providerService: ProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ClientUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ClientUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClientUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    clientFormService = TestBed.inject(ClientFormService);
    clientService = TestBed.inject(ClientService);
    userService = TestBed.inject(UserService);
    providerService = TestBed.inject(ProviderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const client: IClient = { id: 456 };
      const user: IUser = { id: 29059 };
      client.user = user;

      const userCollection: IUser[] = [{ id: 26079 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining),
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Provider query and add missing value', () => {
      const client: IClient = { id: 456 };
      const providers: IProvider[] = [{ id: 21342 }];
      client.providers = providers;

      const providerCollection: IProvider[] = [{ id: 31011 }];
      jest.spyOn(providerService, 'query').mockReturnValue(of(new HttpResponse({ body: providerCollection })));
      const additionalProviders = [...providers];
      const expectedCollection: IProvider[] = [...additionalProviders, ...providerCollection];
      jest.spyOn(providerService, 'addProviderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(providerService.query).toHaveBeenCalled();
      expect(providerService.addProviderToCollectionIfMissing).toHaveBeenCalledWith(
        providerCollection,
        ...additionalProviders.map(expect.objectContaining),
      );
      expect(comp.providersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const client: IClient = { id: 456 };
      const user: IUser = { id: 28112 };
      client.user = user;
      const provider: IProvider = { id: 15623 };
      client.providers = [provider];

      activatedRoute.data = of({ client });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
      expect(comp.providersSharedCollection).toContain(provider);
      expect(comp.client).toEqual(client);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClient>>();
      const client = { id: 123 };
      jest.spyOn(clientFormService, 'getClient').mockReturnValue(client);
      jest.spyOn(clientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: client }));
      saveSubject.complete();

      // THEN
      expect(clientFormService.getClient).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(clientService.update).toHaveBeenCalledWith(expect.objectContaining(client));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClient>>();
      const client = { id: 123 };
      jest.spyOn(clientFormService, 'getClient').mockReturnValue({ id: null });
      jest.spyOn(clientService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: client }));
      saveSubject.complete();

      // THEN
      expect(clientFormService.getClient).toHaveBeenCalled();
      expect(clientService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClient>>();
      const client = { id: 123 };
      jest.spyOn(clientService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ client });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(clientService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProvider', () => {
      it('Should forward to providerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(providerService, 'compareProvider');
        comp.compareProvider(entity, entity2);
        expect(providerService.compareProvider).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
