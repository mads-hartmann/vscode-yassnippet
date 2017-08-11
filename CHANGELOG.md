# Change Log

## 0.0.3

* Fix package.json so the configuration options are placed correctly
  E.g. now vscode actually picks up the configuration options ;)
* Add a new configuration option `yassnippet.mapping`
  This makes it possible to work around cases where the emacs mode is
  named differently from the vscode langauge, e.g. sh-mode in emacs is
  shellscript in vscode.

## 0.0.2

* Extend search for folders containing snippets
  If no folder is found for the language try with looking for `<language>-mode`
  as this is how you would structure your snippets in Emacs

## 0.0.1

* Initial release.
* Basic support for inserting yassnippets through a command
