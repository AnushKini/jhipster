import { NgModule } from '@angular/core';

import { AuthEngineMongoDbSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [AuthEngineMongoDbSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [AuthEngineMongoDbSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class AuthEngineMongoDbSharedCommonModule {}
