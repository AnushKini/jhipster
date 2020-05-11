import { NgModule } from '@angular/core';

import { SkipBackendSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SkipBackendSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SkipBackendSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SkipBackendSharedCommonModule {}
