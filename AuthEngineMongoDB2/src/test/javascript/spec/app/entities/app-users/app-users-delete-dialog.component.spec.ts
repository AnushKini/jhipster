/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AuthEngineMongoDb2TestModule } from '../../../test.module';
import { AppUsersDeleteDialogComponent } from 'app/entities/app-users/app-users-delete-dialog.component';
import { AppUsersService } from 'app/entities/app-users/app-users.service';

describe('Component Tests', () => {
    describe('AppUsers Management Delete Component', () => {
        let comp: AppUsersDeleteDialogComponent;
        let fixture: ComponentFixture<AppUsersDeleteDialogComponent>;
        let service: AppUsersService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AuthEngineMongoDb2TestModule],
                declarations: [AppUsersDeleteDialogComponent]
            })
                .overrideTemplate(AppUsersDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AppUsersDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppUsersService);
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
