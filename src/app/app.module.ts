import { BrowserModule } from "@angular/platform-browser";
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";

// Firebase Config

import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { IndexModule } from "./views/base/index/index.module";
import { SharedModule } from "./shared/shared.module";
import { TranslateService } from "./shared/services/translate.service";
import { ProductModule } from "./views/pages/product/product.module";
import { UserModule } from "./views/pages/user/user.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { XprBalanceComponent } from "./views/pages/user/xpr-balance/xpr-balance.component";

/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService) {
  return () => service.use("en");
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    IndexModule,
    ProductModule,
    UserModule,
    SharedModule,
    ServiceWorkerModule.register("./ngsw-worker.js", {
      enabled: environment.production,
      registrationStrategy: "registerImmediately",
    }),
    // AngularFireModule.initializeApp(FireBaseConfig),

    // AngularFireDatabaseModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
