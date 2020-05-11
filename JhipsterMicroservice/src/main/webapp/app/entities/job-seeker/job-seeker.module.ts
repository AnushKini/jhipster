import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMicroserviceSharedModule } from 'app/shared';
import {
    JobSeekerComponent,
    JobSeekerDetailComponent,
    JobSeekerUpdateComponent,
    JobSeekerDeletePopupComponent,
    JobSeekerDeleteDialogComponent,
    jobSeekerRoute,
    jobSeekerPopupRoute
} from './';

const ENTITY_STATES = [...jobSeekerRoute, ...jobSeekerPopupRoute];

@NgModule({
    imports: [JhipsterMicroserviceSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobSeekerComponent,
        JobSeekerDetailComponent,
        JobSeekerUpdateComponent,
        JobSeekerDeleteDialogComponent,
        JobSeekerDeletePopupComponent
    ],
    entryComponents: [JobSeekerComponent, JobSeekerUpdateComponent, JobSeekerDeleteDialogComponent, JobSeekerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMicroserviceJobSeekerModule {}
