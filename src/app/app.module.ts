import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ScullyLibModule } from "@scullyio/ng-lib";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterModule } from "./components/footer/footer.module";
import { HeaderModule } from "./components/header/header.module";
import { SmallScreenSidenavModule } from "./components/small-screen-sidenav/small-screen-sidenav.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    ScullyLibModule,
    FontAwesomeModule,
    SmallScreenSidenavModule,
    HeaderModule,
    FooterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
