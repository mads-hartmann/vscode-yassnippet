import {
  CompletionItem,
  CompletionItemProvider,
  TextDocument,
  Position,
  CancellationToken,
  CompletionItemKind,
  SnippetString
} from "vscode";

import YassnippetCollection from "./yassnippet/collection";

class YassnippetCompletionItem extends CompletionItem {
  constructor(label: string, snippet: SnippetString, name: string) {
    // The CompletionItemKind.Text is being used here as CompletionItemKind.Snippet
    // won't show up if you've configred editor.snippetSuggestions to be "none" which
    // is convenient to disable the snippets that are shipped with the various
    // packages.
    super(label, CompletionItemKind.Text);
    this.label = label;
    this.insertText = snippet;
    this.detail = snippet.value;
  }
}

export default class YassnippetCompletionItemProvider
  implements CompletionItemProvider {
  private yassnippet: YassnippetCollection;

  constructor(yassnippet: YassnippetCollection) {
    this.yassnippet = yassnippet;
  }

  public provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): Thenable<CompletionItem[]> {
    const snippets = this.yassnippet.list(document.languageId);
    const completions = snippets.map(
      snippet =>
        new YassnippetCompletionItem(snippet.key, snippet.snippet, snippet.name)
    );
    return Promise.resolve(completions);
  }
}
