## Insertion using tab

This is the keyboard binding for the normal insert snippets

{
    "key": "tab",
    "command": "insertSnippet",
    "when": "config.editor.tabCompletion && editorTextFocus && hasSnippetCompletions && !editorTabMovesFocus && !inSnippetMode"
},

Interesting files are

    snippets.contribution.ts
    tabCompletion.ts

NOTE: I'm actually not quite sure that this is even possible. What I need to be able to do is to set a
context (configuration key, like hasSnippetCompletions) dynamically, but to do that I have to register
events for whenever `onDidChangeCursorSelection`. That event doesn't seem to be exposed :(

NOTE NOTE: Perhaps vscode.window.onDidChangeTextEditorSelection would do the trick?
