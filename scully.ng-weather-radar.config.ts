import { ScullyConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";
import { MinifyHtml } from "scully-plugin-minify-html";

const postRenderers = [MinifyHtml];

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "ng-weather-radar",
  distFolder: "./dist/ng-weather-radar",
  outDir: "./dist/static",
  defaultPostRenderers: postRenderers,
  routes: {},
  puppeteerLaunchOptions: {
    args: [
      "--disable-gpu",
      "--renderer",
      "--no-sandbox",
      "--no-service-autorun",
      "--no-experiments",
      "--no-default-browser-check",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-extensions",
    ],
  },
};
