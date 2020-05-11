import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppUsers } from 'app/shared/model/app-users.model';
import { AppUsersService } from './app-users.service';

@Component({
    selector: 'jhi-app-users-delete-dialog',
    templateUrl: './app-users-delete-dialog.component.html'
})
export class AppUsersDeleteDialogComponent {
    appUsers: IAppUsers;

    constructor(protected appUsersService: AppUsersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.appUsersService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'appUsersListModification',
                content: 'Deleted an appUsers'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-app-users-delete-popup',
    template: ''
})
export class AppUsersDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ appUsers }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AppUsersDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.appUsers = appUsers;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/app-users', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/app-users', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
