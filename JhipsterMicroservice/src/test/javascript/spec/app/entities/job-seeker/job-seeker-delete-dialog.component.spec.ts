/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMicroserviceTestModule } from '../../../test.module';
import { JobSeekerDeleteDialogComponent } from 'app/entities/job-seeker/job-seeker-delete-dialog.component';
import { JobSeekerService } from 'app/entities/job-seeker/job-seeker.service';

describe('Component Tests', () => {
    describe('JobSeeker Management Delete Component', () => {
        let comp: JobSeekerDeleteDialogComponent;
        let fixture: ComponentFixture<JobSeekerDeleteDialogComponent>;
        let service: JobSeekerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMicroserviceTestModule],
                declarations: [JobSeekerDeleteDialogComponent]
            })
                .overrideTemplate(JobSeekerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobSeekerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobSeekerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
