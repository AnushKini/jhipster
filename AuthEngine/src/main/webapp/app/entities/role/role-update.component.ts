import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from './role.service';
import { IPrivilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from 'app/entities/privilege';
import { IAppUsers } from 'app/shared/model/app-users.model';
import { AppUsersService } from 'app/entities/app-users';

@Component({
    selector: 'jhi-role-update',
    templateUrl: './role-update.component.html'
})
export class RoleUpdateComponent implements OnInit {
    role: IRole;
    isSaving: boolean;

    privileges: IPrivilege[];

    appusers: IAppUsers[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected roleService: RoleService,
        protected privilegeService: PrivilegeService,
        protected appUsersService: AppUsersService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ role }) => {
            this.role = role;
        });
        this.privilegeService
            .query({ filter: 'role-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IPrivilege[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPrivilege[]>) => response.body)
            )
            .subscribe(
                (res: IPrivilege[]) => {
                    if (!this.role.privilege || !this.role.privilege.id) {
                        this.privileges = res;
                    } else {
                        this.privilegeService
                            .find(this.role.privilege.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IPrivilege>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IPrivilege>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IPrivilege) => (this.privileges = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.appUsersService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAppUsers[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAppUsers[]>) => response.body)
            )
            .subscribe((res: IAppUsers[]) => (this.appusers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.role.id !== undefined) {
            this.subscribeToSaveResponse(this.roleService.update(this.role));
        } else {
            this.subscribeToSaveResponse(this.roleService.create(this.role));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>) {
        result.subscribe((res: HttpResponse<IRole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPrivilegeById(index: number, item: IPrivilege) {
        return item.id;
    }

    trackAppUsersById(index: number, item: IAppUsers) {
        return item.id;
    }
}
