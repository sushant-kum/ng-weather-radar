import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import {
  faFaceFrown as farFaceFrown,
  faFaceMehBlank as farFaceMehBlank,
} from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass as fasMagnifyingGlass,
  faXmark as fasXmark,
  faLocationPin as fasLocationPin,
} from "@fortawesome/free-solid-svg-icons";

import { SmallScreenSearchModalComponent } from "./small-screen-search-modal.component";

@NgModule({
  declarations: [SmallScreenSearchModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
  ],
  exports: [MatDialogModule],
})
export class SmallScreenSearchModalModule {
  constructor(fontAwesomeLibrary: FaIconLibrary) {
    fontAwesomeLibrary.addIcons(
      fasMagnifyingGlass,
      fasXmark,
      fasLocationPin,
      farFaceMehBlank,
      farFaceFrown
    );
  }
}
