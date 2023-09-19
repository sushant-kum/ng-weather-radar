import { APP_TITLE } from "src/app/constants/app-title.constant";

export const LOCALFORAGE_DB_NAME: string = APP_TITLE;

export enum LocalforageDBKeys {
  SETTINGS_GLOBAL_DARK_MODE = "weather-radar.settings.global.dark-mode",
  SETTINGS_GLOBAL_WEATHER_UNIT = "weather-radar.settings.global.weather-unit",
}
