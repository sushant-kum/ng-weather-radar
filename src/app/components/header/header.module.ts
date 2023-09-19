import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import { faMagnifyingGlass as fasMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { SmallScreenSearchModalModule } from "./components/small-screen-search-modal/small-screen-search-modal.module";
import { HeaderComponent } from "./header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRippleModule,
    MatButtonModule,
    FontAwesomeModule,
    SmallScreenSearchModalModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {
  constructor(fontAwesomeLibrary: FaIconLibrary) {
    fontAwesomeLibrary.addIcons(fasMagnifyingGlass);
  }
}
