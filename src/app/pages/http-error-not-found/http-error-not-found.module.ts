import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HttpErrorNotFoundRoutingModule } from "./http-error-not-found-routing.module";
import { HttpErrorNotFoundComponent } from "./http-error-not-found.component";

@NgModule({
  declarations: [HttpErrorNotFoundComponent],
  imports: [CommonModule, HttpErrorNotFoundRoutingModule],
})
export class HttpErrorNotFoundModule {}
