import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'role',
                loadChildren: './role/role.module#AuthEngineRoleModule'
            },
            {
                path: 'app-users',
                loadChildren: './app-users/app-users.module#AuthEngineAppUsersModule'
            },
            {
                path: 'privilege',
                loadChildren: './privilege/privilege.module#AuthEnginePrivilegeModule'
            },
            {
                path: 'feature',
                loadChildren: './feature/feature.module#AuthEngineFeatureModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthEngineEntityModule {}
