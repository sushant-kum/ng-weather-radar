import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { WeatherComponent } from "./weather.component";

const routes: Routes = [
  {
    path: "",
    component: WeatherComponent,
    children: [
      {
        path: "",
        redirectTo: "current",
        pathMatch: "full",
      },
      {
        path: "current",
        loadChildren: () =>
          import("./pages/current/current.module").then(
            (module) => module.CurrentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherRoutingModule {}
