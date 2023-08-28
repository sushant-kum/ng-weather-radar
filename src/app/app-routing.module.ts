import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/root/root.module").then((module) => module.RootModule),
  },
  {
    path: "404",
    loadChildren: () =>
      import("./pages/http-error-not-found/http-error-not-found.module").then(
        (module) => module.HttpErrorNotFoundModule
      ),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./pages/http-error-not-found/http-error-not-found.module").then(
        (module) => module.HttpErrorNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
