import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { RootRoutingModule } from "./root-routing.module";
import { RootComponent } from "./root.component";

@NgModule({
  declarations: [RootComponent],
  imports: [CommonModule, RootRoutingModule],
})
export class RootModule {}
