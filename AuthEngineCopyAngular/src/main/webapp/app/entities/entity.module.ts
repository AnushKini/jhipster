import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'role',
                loadChildren: './role/role.module#AuthEngineMongoDb2RoleModule'
            },
            {
                path: 'app-users',
                loadChildren: './app-users/app-users.module#AuthEngineMongoDb2AppUsersModule'
            },
            {
                path: 'privilege',
                loadChildren: './privilege/privilege.module#AuthEngineMongoDb2PrivilegeModule'
            },
            {
                path: 'feature',
                loadChildren: './feature/feature.module#AuthEngineMongoDb2FeatureModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthEngineMongoDb2EntityModule {}
