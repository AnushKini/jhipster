import { NgModule } from '@angular/core';

import { JhipsterMysqlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipsterMysqlSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipsterMysqlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterMysqlSharedCommonModule {}
