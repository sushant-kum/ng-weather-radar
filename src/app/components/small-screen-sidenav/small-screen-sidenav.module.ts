import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { MatSidenavModule } from "@angular/material/sidenav";

import { SmallScreenSidenavComponent } from "./small-screen-sidenav.component";

@NgModule({
  declarations: [SmallScreenSidenavComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatDividerModule,
  ],
  exports: [SmallScreenSidenavComponent, MatSidenavModule],
})
export class SmallScreenSidenavModule {}
