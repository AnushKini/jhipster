import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthEngineMongoDb2SharedModule } from 'app/shared';
import {
    PrivilegeComponent,
    PrivilegeDetailComponent,
    PrivilegeUpdateComponent,
    PrivilegeDeletePopupComponent,
    PrivilegeDeleteDialogComponent,
    privilegeRoute,
    privilegePopupRoute
} from './';

const ENTITY_STATES = [...privilegeRoute, ...privilegePopupRoute];

@NgModule({
    imports: [AuthEngineMongoDb2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrivilegeComponent,
        PrivilegeDetailComponent,
        PrivilegeUpdateComponent,
        PrivilegeDeleteDialogComponent,
        PrivilegeDeletePopupComponent
    ],
    entryComponents: [PrivilegeComponent, PrivilegeUpdateComponent, PrivilegeDeleteDialogComponent, PrivilegeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthEngineMongoDb2PrivilegeModule {}
