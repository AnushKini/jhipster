/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterMysqlTestModule } from '../../../test.module';
import { AppUsersUpdateComponent } from 'app/entities/app-users/app-users-update.component';
import { AppUsersService } from 'app/entities/app-users/app-users.service';
import { AppUsers } from 'app/shared/model/app-users.model';

describe('Component Tests', () => {
    describe('AppUsers Management Update Component', () => {
        let comp: AppUsersUpdateComponent;
        let fixture: ComponentFixture<AppUsersUpdateComponent>;
        let service: AppUsersService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMysqlTestModule],
                declarations: [AppUsersUpdateComponent]
            })
                .overrideTemplate(AppUsersUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AppUsersUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppUsersService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AppUsers(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.appUsers = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AppUsers();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.appUsers = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
