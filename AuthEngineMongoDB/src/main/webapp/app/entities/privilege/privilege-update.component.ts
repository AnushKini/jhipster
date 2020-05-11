import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPrivilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from './privilege.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role';
import { IFeature } from 'app/shared/model/feature.model';
import { FeatureService } from 'app/entities/feature';

@Component({
    selector: 'jhi-privilege-update',
    templateUrl: './privilege-update.component.html'
})
export class PrivilegeUpdateComponent implements OnInit {
    privilege: IPrivilege;
    isSaving: boolean;

    roles: IRole[];

    features: IFeature[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected privilegeService: PrivilegeService,
        protected roleService: RoleService,
        protected featureService: FeatureService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ privilege }) => {
            this.privilege = privilege;
        });
        this.roleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRole[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRole[]>) => response.body)
            )
            .subscribe((res: IRole[]) => (this.roles = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.featureService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFeature[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFeature[]>) => response.body)
            )
            .subscribe((res: IFeature[]) => (this.features = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.privilege.id !== undefined) {
            this.subscribeToSaveResponse(this.privilegeService.update(this.privilege));
        } else {
            this.subscribeToSaveResponse(this.privilegeService.create(this.privilege));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrivilege>>) {
        result.subscribe((res: HttpResponse<IPrivilege>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoleById(index: number, item: IRole) {
        return item.id;
    }

    trackFeatureById(index: number, item: IFeature) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
