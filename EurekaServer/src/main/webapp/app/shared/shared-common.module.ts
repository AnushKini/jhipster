import { NgModule } from '@angular/core';

import { EurekaServerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EurekaServerSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [EurekaServerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class EurekaServerSharedCommonModule {}
