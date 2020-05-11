import { NgModule } from '@angular/core';

import { JhipsterMicroserviceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipsterMicroserviceSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipsterMicroserviceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterMicroserviceSharedCommonModule {}
