import * as path from "path";
import * as os from "os";

import { workspace } from "vscode";

const YASSNIPPET = "yassnippet";

/**
  * @return The absolute path to the folder that contains snippets
  */
export function root(): string {
  const config = workspace.getConfiguration(YASSNIPPET);
  const configPath = config.get<string>("path");
  if (path.isAbsolute(configPath)) {
    return configPath;
  }
  return path.resolve(os.homedir(), configPath);
}

/**
  * @return A mapping from languages to folder folders relative
  * to your `yassnippet.path`
  */
export function mapping(): Object {
  const config = workspace.getConfiguration(YASSNIPPET);
  return config.get<Object>("mapping");
}
