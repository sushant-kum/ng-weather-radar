import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HttpErrorNotFoundComponent } from "./http-error-not-found.component";

const routes: Routes = [
  {
    path: "",
    component: HttpErrorNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HttpErrorNotFoundRoutingModule {}
