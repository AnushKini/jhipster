import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFeature } from 'app/shared/model/feature.model';
import { FeatureService } from './feature.service';
import { IPrivilege } from 'app/shared/model/privilege.model';
import { PrivilegeService } from 'app/entities/privilege';

@Component({
    selector: 'jhi-feature-update',
    templateUrl: './feature-update.component.html'
})
export class FeatureUpdateComponent implements OnInit {
    feature: IFeature;
    isSaving: boolean;

    privileges: IPrivilege[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected featureService: FeatureService,
        protected privilegeService: PrivilegeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ feature }) => {
            this.feature = feature;
        });
        this.privilegeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPrivilege[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPrivilege[]>) => response.body)
            )
            .subscribe((res: IPrivilege[]) => (this.privileges = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.feature.id !== undefined) {
            this.subscribeToSaveResponse(this.featureService.update(this.feature));
        } else {
            this.subscribeToSaveResponse(this.featureService.create(this.feature));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeature>>) {
        result.subscribe((res: HttpResponse<IFeature>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
