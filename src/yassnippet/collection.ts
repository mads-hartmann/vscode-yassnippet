"use strict";

import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

import * as Config from "../configuration";

import YassnippetSnippet from "./snippet";
import * as Util from "./util";

/**
 * An in-memory collection of snippets parsed and ready to sue
 */
export default class YassnippetCollection {
  snippets: Map<string, YassnippetSnippet[]>;

  public static load(): Promise<YassnippetCollection> {
    const root = Config.root();
    // Adding a couple of types here to make things earsier to track :/
    const getSnippets: (string) => Promise<[string, YassnippetSnippet[]]> = (
      language: string
    ) => {
      const dir = YassnippetCollection.languageDirectory(language);
      return Util.ls(dir).then(snippets => {
        return Promise.all(
          snippets.map(snippet => {
            const file = path.join(
              YassnippetCollection.languageDirectory(language),
              snippet
            );
            return Util.cat(file).then(x => YassnippetSnippet.parse(x));
          })
        ).then(y => {
          const x: [string, YassnippetSnippet[]] = [language, y];
          return x;
        });
      });
    };

    return Util.ls(root)
      .then(langauges => {
        const promises = langauges.map(language => getSnippets(language));
        return Promise.all(promises);
      })
      .then(entries => {
        return new YassnippetCollection(new Map(entries));
      });
  }

  private constructor(snippets: Map<string, YassnippetSnippet[]>) {
    this.snippets = snippets;
  }

  public list(language: string): YassnippetSnippet[] {
    const key = this.keyForLanguage(language);
    return this.snippets.has(key) ? this.snippets.get(key) : [];
  }

  public get(language: string, snippet: string): YassnippetSnippet {
    const key = this.keyForLanguage(language);
    if (!this.snippets.has(key)) {
      return null;
    }
    const snippets = this.snippets.get(key);
    return snippets.find(s => s.key === snippet);
  }

  private keyForLanguage(language: string): string {
    const mapping = Config.mapping();
    return language in mapping ? mapping[language] : language;
  }

  /**
   * @return The absolute path to the folder that contains snippets
   *         for the given language. Null if no such folder exists
   */
  private static languageDirectory(language: string): string | null {
    const root = Config.root();
    const mapping = Config.mapping();

    const directory =
      language in mapping
        ? path.join(root, mapping[language])
        : path.join(root, language);

    // If you're using your yassnippets from Emacs all your folders will
    // be named XXX-mode so we use that as a fallback to be nice. This
    // helps people keep their mapping config light.
    const fallback = path.join(root, `${language}-mode`);

    if (fs.existsSync(directory)) {
      return directory;
    }

    if (fs.existsSync(fallback)) {
      return fallback;
    }

    return null;
  }
}
