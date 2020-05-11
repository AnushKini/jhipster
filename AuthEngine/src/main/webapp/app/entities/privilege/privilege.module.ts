import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthEngineSharedModule } from 'app/shared';
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
    imports: [AuthEngineSharedModule, RouterModule.forChild(ENTITY_STATES)],
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
export class AuthEnginePrivilegeModule {}
