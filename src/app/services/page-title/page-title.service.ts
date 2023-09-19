import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { APP_TITLE } from "src/app/constants/app-title.constant";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PageTitleService {
  constructor(private _title: Title) {}

  setPageTitle(pageTitle?: string): void {
    const completeTitle: string = `${environment.production ? "" : "*Dev* "}${
      pageTitle ? pageTitle + " | " : ""
    }${APP_TITLE}`;

    this._title.setTitle(completeTitle);
  }
}
