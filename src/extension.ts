'use strict';

import * as os from 'os';
import * as path from 'path'
import * as fs from 'fs';
import * as vscode from 'vscode';

import Yassnippet from './yassnippet';

function getLanguage(): string | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null;
    }
    return editor.document.languageId
}


export function activate(context: vscode.ExtensionContext) {

    const yassnippet = new Yassnippet()

    const disposable = vscode.commands.registerCommand('extension.insertSnippet', () => {
        const language = getLanguage();

        if (!language) {
            vscode.window.showErrorMessage("No active editor");
            return;
        }

        yassnippet.list(language).then(snippets => {

            if (snippets.length === 0) {
                vscode.window.showInformationMessage(`No snippets defined for ${language}`)
                return
            }

            vscode.window.showQuickPick(snippets).then((selection) => {
                console.log('Reading contents of snippet:', selection);
                yassnippet.get(language, selection).then(snippet => {
                    vscode.window.activeTextEditor.insertSnippet(snippet)
                }).catch(error => {
                    console.error('Unable to get snippet contents:', error);
                });
            });
        }).catch(error => {
            console.error('Unable to list snippets:', error)
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    // Nothing to clean up
}
