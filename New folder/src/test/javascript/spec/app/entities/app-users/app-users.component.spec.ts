/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterMysqlTestModule } from '../../../test.module';
import { AppUsersComponent } from 'app/entities/app-users/app-users.component';
import { AppUsersService } from 'app/entities/app-users/app-users.service';
import { AppUsers } from 'app/shared/model/app-users.model';

describe('Component Tests', () => {
    describe('AppUsers Management Component', () => {
        let comp: AppUsersComponent;
        let fixture: ComponentFixture<AppUsersComponent>;
        let service: AppUsersService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMysqlTestModule],
                declarations: [AppUsersComponent],
                providers: []
            })
                .overrideTemplate(AppUsersComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AppUsersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppUsersService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AppUsers(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.appUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
