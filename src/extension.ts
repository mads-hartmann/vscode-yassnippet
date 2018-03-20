"use strict";

import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";

import YassnippetCompletionItemProvider from "./completions";
import * as Commands from "./commands";
import YassnippetCollection from "./yassnippet/collection";

export function activate(context: vscode.ExtensionContext) {
  YassnippetCollection.load().then(collection => {
    const disposable = vscode.commands.registerCommand(
      "yassnippet.insertSnippet",
      () => Commands.insertSnippet(collection)
    );

    context.subscriptions.push(disposable);
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        { scheme: "file" },
        new YassnippetCompletionItemProvider(collection)
      )
    );
  });
}

export function deactivate() {
  // Nothing to clean up
}
