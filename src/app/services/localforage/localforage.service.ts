import { Injectable } from "@angular/core";
import * as localforage from "localforage";

import {
  LocalforageDBKeys,
  LOCALFORAGE_DB_NAME,
} from "../../constants/localforage.constant";

@Injectable({
  providedIn: "root",
})
export class LocalforageService {
  constructor() {
    localforage.config({
      name: LOCALFORAGE_DB_NAME,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(key: LocalforageDBKeys): Promise<any> {
    return localforage.getItem(key);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  set(key: LocalforageDBKeys, value: any): Promise<any> {
    return localforage.setItem(key, value);
  }

  remove(key: LocalforageDBKeys): Promise<void> {
    return localforage.removeItem(key);
  }

  deleteAll(): Promise<void> {
    return localforage.clear();
  }

  listKeys(): Promise<string[]> {
    return localforage.keys();
  }
}
