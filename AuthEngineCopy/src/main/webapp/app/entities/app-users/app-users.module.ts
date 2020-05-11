import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthEngineMongoDb2SharedModule } from 'app/shared';
import {
    AppUsersComponent,
    AppUsersDetailComponent,
    AppUsersUpdateComponent,
    AppUsersDeletePopupComponent,
    AppUsersDeleteDialogComponent,
    appUsersRoute,
    appUsersPopupRoute
} from './';

const ENTITY_STATES = [...appUsersRoute, ...appUsersPopupRoute];

@NgModule({
    imports: [AuthEngineMongoDb2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AppUsersComponent,
        AppUsersDetailComponent,
        AppUsersUpdateComponent,
        AppUsersDeleteDialogComponent,
        AppUsersDeletePopupComponent
    ],
    entryComponents: [AppUsersComponent, AppUsersUpdateComponent, AppUsersDeleteDialogComponent, AppUsersDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthEngineMongoDb2AppUsersModule {}
