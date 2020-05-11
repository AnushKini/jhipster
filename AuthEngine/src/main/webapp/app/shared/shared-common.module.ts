import { NgModule } from '@angular/core';

import { AuthEngineSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [AuthEngineSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [AuthEngineSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class AuthEngineSharedCommonModule {}
