import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IJobSeeker } from 'app/shared/model/job-seeker.model';
import { JobSeekerService } from './job-seeker.service';

@Component({
    selector: 'jhi-job-seeker-update',
    templateUrl: './job-seeker-update.component.html'
})
export class JobSeekerUpdateComponent implements OnInit {
    jobSeeker: IJobSeeker;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jobSeekerService: JobSeekerService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jobSeeker }) => {
            this.jobSeeker = jobSeeker;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.jobSeeker, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.jobSeeker.id !== undefined) {
            this.subscribeToSaveResponse(this.jobSeekerService.update(this.jobSeeker));
        } else {
            this.subscribeToSaveResponse(this.jobSeekerService.create(this.jobSeeker));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobSeeker>>) {
        result.subscribe((res: HttpResponse<IJobSeeker>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
