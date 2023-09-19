import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CurrentRoutingModule } from "./current-routing.module";
import { CurrentComponent } from "./current.component";

@NgModule({
  declarations: [CurrentComponent],
  imports: [CommonModule, CurrentRoutingModule],
})
export class CurrentModule {}
