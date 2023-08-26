import { registerPlugin } from "@scullyio/scully";

export const myPlugin = "myPlugin";

const myFunctionPlugin = async (html: string): Promise<string> => {
  return html;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const validator = async () => [];

registerPlugin<"postProcessByHtml">(
  "postProcessByHtml",
  myPlugin,
  myFunctionPlugin,
  validator
);
