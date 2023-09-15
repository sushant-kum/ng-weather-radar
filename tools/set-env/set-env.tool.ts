/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, relative } = require("path");

const chalk = require("chalk");
const replace = require("replace-in-file");

require("dotenv").config();

//  pragma: allowlist nextline secret
const API_KEY_IDENTIFIER = "OPENWEATHERMAP_API_KEY";

const devEnvFile = resolve(
  __dirname,
  "..",
  "..",
  "src",
  "environments",
  "environment.ts"
);
const prodEnvFile = resolve(
  __dirname,
  "..",
  "..",
  "src",
  "environments",
  "environment.prod.ts"
);
const replaceOptions = {
  files: [devEnvFile, prodEnvFile],
  from: new RegExp(`{${API_KEY_IDENTIFIER}}`, "g"),
  to: process.env[API_KEY_IDENTIFIER],
  allowEmptyPaths: false,
};

try {
  const changedFiles = replace.sync(replaceOptions);
  if (changedFiles === 0) {
    throw (
      "Please make sure that file '" +
      replaceOptions.files +
      `' has \"${API_KEY_IDENTIFIER}: ''\"`
    );
  }
  // eslint-disable-next-line no-console
  console.log(
    `${chalk.gray("[S-ENV]")} Replaced ${chalk.blueBright(
      `{${API_KEY_IDENTIFIER}}`
    )} in ${chalk.blueBright(
      relative(resolve(__dirname, "..", ".."), devEnvFile)
    )} and ${chalk.blueBright(
      relative(resolve(__dirname, "..", ".."), prodEnvFile)
    )} `
  );
} catch (error) {
  console.error("Error occurred:", error);
  throw error;
}
