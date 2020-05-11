import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'role',
                loadChildren: './role/role.module#JhipsterMysqlRoleModule'
            },
            {
                path: 'app-users',
                loadChildren: './app-users/app-users.module#JhipsterMysqlAppUsersModule'
            },
            {
                path: 'privilege',
                loadChildren: './privilege/privilege.module#JhipsterMysqlPrivilegeModule'
            },
            {
                path: 'feature',
                loadChildren: './feature/feature.module#JhipsterMysqlFeatureModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMysqlEntityModule {}
