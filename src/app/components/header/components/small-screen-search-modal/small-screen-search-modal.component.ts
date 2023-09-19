import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, map, takeUntil } from "rxjs/operators";

import { CitySearchResultItem } from "../../models/city-search-result-item";

import { SmallScreenSearchModalFacadeService } from "./services/small-screen-search-modal-facade/small-screen-search-modal-facade.service";

interface CitySearchResultDisplayItem extends CitySearchResultItem {
  display: string;
}

interface State {
  loadingSearchResults: boolean;
}

@Component({
  selector: "app-small-screen-search-modal",
  templateUrl: "./small-screen-search-modal.component.html",
  styleUrls: ["./small-screen-search-modal.component.scss"],
  providers: [SmallScreenSearchModalFacadeService],
})
export class SmallScreenSearchModalComponent implements OnInit, OnDestroy {
  state: State = {
    loadingSearchResults: false,
  };

  readonly formSmallScreenSearch = new FormGroup<{
    searchString: FormControl<string | null>;
  }>({
    searchString: new FormControl(""),
  });

  citySearchResultsBehaviourSubject = new BehaviorSubject<
    CitySearchResultDisplayItem[]
  >([]);

  private _destroyerSubject: Subject<void> = new Subject<void>();

  constructor(
    private _smallScreenSearchModalFacadeService: SmallScreenSearchModalFacadeService
  ) {}

  ngOnInit(): void {
    this._subscribeToSearchStringChange();
  }

  ngOnDestroy(): void {
    this._destroyerSubject.next();
    this._destroyerSubject.complete();
  }

  private _subscribeToSearchStringChange(): void {
    this.formSmallScreenSearch
      .get("searchString")
      ?.valueChanges.pipe(
        takeUntil(this._destroyerSubject),
        map(() => {
          this.state.loadingSearchResults = true;
        }),
        debounceTime(500)
      )
      .subscribe(() => {
        const searchString =
          this.formSmallScreenSearch.get("searchString")?.value;

        if (searchString) {
          this._smallScreenSearchModalFacadeService
            .searchByCityName(searchString)
            .pipe(takeUntil(this._destroyerSubject))
            .subscribe({
              next: (searchResults) => {
                this.citySearchResultsBehaviourSubject.next(
                  searchResults.map((searchResult) => ({
                    cityName: searchResult.cityName,
                    state: searchResult.state ?? undefined,
                    countryCode: searchResult.countryCode,
                    coordinates: {
                      lat: searchResult.coordinates.lat,
                      lon: searchResult.coordinates.lon,
                    },
                    display: `${searchResult.cityName}${
                      searchResult.state ? ", " + searchResult.state : ""
                    }, ${searchResult.countryCode}`,
                  }))
                );

                this.state.loadingSearchResults = false;
              },
            });
        } else {
          this.citySearchResultsBehaviourSubject.next([]);
          this.state.loadingSearchResults = false;
        }
      });
  }
}
