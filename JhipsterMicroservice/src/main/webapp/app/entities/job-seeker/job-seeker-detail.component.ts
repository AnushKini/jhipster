import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IJobSeeker } from 'app/shared/model/job-seeker.model';

@Component({
    selector: 'jhi-job-seeker-detail',
    templateUrl: './job-seeker-detail.component.html'
})
export class JobSeekerDetailComponent implements OnInit {
    jobSeeker: IJobSeeker;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
