import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthEngineMongoDb2SharedModule } from 'app/shared';
import {
    FeatureComponent,
    FeatureDetailComponent,
    FeatureUpdateComponent,
    FeatureDeletePopupComponent,
    FeatureDeleteDialogComponent,
    featureRoute,
    featurePopupRoute
} from './';

const ENTITY_STATES = [...featureRoute, ...featurePopupRoute];

@NgModule({
    imports: [AuthEngineMongoDb2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FeatureComponent,
        FeatureDetailComponent,
        FeatureUpdateComponent,
        FeatureDeleteDialogComponent,
        FeatureDeletePopupComponent
    ],
    entryComponents: [FeatureComponent, FeatureUpdateComponent, FeatureDeleteDialogComponent, FeatureDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthEngineMongoDb2FeatureModule {}
