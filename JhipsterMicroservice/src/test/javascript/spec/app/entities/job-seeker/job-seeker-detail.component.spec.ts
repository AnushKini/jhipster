/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterMicroserviceTestModule } from '../../../test.module';
import { JobSeekerDetailComponent } from 'app/entities/job-seeker/job-seeker-detail.component';
import { JobSeeker } from 'app/shared/model/job-seeker.model';

describe('Component Tests', () => {
    describe('JobSeeker Management Detail Component', () => {
        let comp: JobSeekerDetailComponent;
        let fixture: ComponentFixture<JobSeekerDetailComponent>;
        const route = ({ data: of({ jobSeeker: new JobSeeker('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMicroserviceTestModule],
                declarations: [JobSeekerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobSeekerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobSeekerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jobSeeker).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
