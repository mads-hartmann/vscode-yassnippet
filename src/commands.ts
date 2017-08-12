import * as vscode from "vscode";

import * as Util from "./yassnippet/util";
import YassnippetCollection from "./yassnippet/collection";

/**
 * Ask the user to select one of the snippets available for the language
 * that's active in the current editor.
 */
export function insertSnippet(yassnippet: YassnippetCollection): void {
  const language = Util.getLanguage();

  if (!language) {
    vscode.window.showErrorMessage("No active editor");
    return;
  }

  const snippets = yassnippet.list(language);

  if (snippets.length === 0) {
    vscode.window.showInformationMessage(`No snippets defined for ${language}`);
    return;
  }

  const items = snippets.map(snippet => ({
    label: snippet.name,
    description: snippet.key,
    detail: snippet.snippet.value,
    yassnippet: snippet
  }));

  vscode.window.showQuickPick(items).then(selection => {
    vscode.window.activeTextEditor.insertSnippet(selection.yassnippet.snippet);
  });
}
