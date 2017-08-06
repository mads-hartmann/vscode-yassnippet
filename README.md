# vscode-yassnippet

This extension adds support for [yassnippet][emacs-yassnippet] snippets to
[Visual Studio Code][vscode].

It assumes you keep your snippets structures by language like so. The language
folders can be named either `<langauge>` or `<langauge>-mode`.

```
<my-snippets-directory>
├── markdown
│   └── code
├── python
│   ├── __int__
│   └── ... and so on ...
```

## Configuration

* `yassnippet.path`: path to the directory that contains your snippets. Can be
absolute, e.g. `/Users/hartmann/.snippets` or relative `.snippets`. Relative
paths are resolved relative the users home directory. The default value is
`.snippets`

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
./node_modules/.bin/vsce publish
```

[emacs-yassnippet]: https://github.com/joaotavora/yasnippet
[vscode]: https://code.visualstudio.com/
