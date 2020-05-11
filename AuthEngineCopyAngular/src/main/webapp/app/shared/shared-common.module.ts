import { NgModule } from '@angular/core';

import { AuthEngineMongoDb2SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [AuthEngineMongoDb2SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [AuthEngineMongoDb2SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class AuthEngineMongoDb2SharedCommonModule {}
