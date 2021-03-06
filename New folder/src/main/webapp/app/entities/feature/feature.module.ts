import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterMysqlSharedModule } from 'app/shared';
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
    imports: [JhipsterMysqlSharedModule, RouterModule.forChild(ENTITY_STATES)],
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
export class JhipsterMysqlFeatureModule {}
