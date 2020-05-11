/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AuthEngineTestModule } from '../../../test.module';
import { AppUsersDetailComponent } from 'app/entities/app-users/app-users-detail.component';
import { AppUsers } from 'app/shared/model/app-users.model';

describe('Component Tests', () => {
    describe('AppUsers Management Detail Component', () => {
        let comp: AppUsersDetailComponent;
        let fixture: ComponentFixture<AppUsersDetailComponent>;
        const route = ({ data: of({ appUsers: new AppUsers(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AuthEngineTestModule],
                declarations: [AppUsersDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AppUsersDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AppUsersDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.appUsers).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
