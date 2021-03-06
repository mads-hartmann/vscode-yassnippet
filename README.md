# vscode-yassnippet

This extension adds support for [yassnippet][emacs-yassnippet] snippets to
[Visual Studio Code][vscode].

## Features

* Keep your snippets in an editor-agnostic format using Yassnippets
* Yassnippet expansion through command
* Yassnippet expansion through code-completion
* Yassnippet syntax highlighting
* __TODO__ Yassnippet insertion through tab-trigger

## Snippets

Snippets are stored as plaintext files. By default they're in `~/.snippets/<language>`
but can be [configured](#configuration) to be stored elsewhere. A snippet file
looks like this:

    # name: Fenced code block
    # key: fenced
    # --
    ```${1:language}
    $0
    ```

Everything after the `# --` marker is the body of your snippet. See
[vscode documentation][snippet-syntax-docs] for the syntax.

## Configuration

To see the configuration options check out the 'Contributions' tab for the
extension in [vscode][vscode] or simply type `yassnippet.<tab>` in your 'User
Settings' file.

If you're using this extension to manage your snippets you probably want to
disable the snippets that are provided by vscode and various other extensions

    "editor.tabCompletion": false,
    "editor.snippetSuggestions": "none",

## FAQ

### Why use this when vscode already has its own snippet system?

Users coming from Emacs to vscode might have cultivated a fine selection of
snippets that they care about -- converting those snippets to vscode would be
quite tedious and besides, it's nice to be able to use the same snippets in
both editors anyway.

Given that all snippets systems I'm aware of are based on TextMate's snippet
system anyway they're all fairly compatible when it comes to the actual body of
the snippets, they simply differ in the way they wrap that body. vscode uses
`json`, atom uses `cson`, and emacs uses `plaintext` files with comments in
them.

This extension simply reads a few files and performs basic text transformations
before inserting the snippets into the editor and leaves vscode to do the rest.

## Development

### Publishing

```bash
npm run publish
```

[snippet-syntax-docs]: https://code.visualstudio.com/docs/editor/userdefinedsnippets#_snippet-syntax
[emacs-yassnippet]: https://github.com/joaotavora/yasnippet
[vscode]: https://code.visualstudio.com/
