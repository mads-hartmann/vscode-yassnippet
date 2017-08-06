'use strict';

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path'
import * as vscode from 'vscode';

export default class Yassnippet {

    // Doesn't do any initialization yet, but might want it to
    // parse yassnippets and find tab-triggers etc. at some point.

    public list(langauge: string): Promise<string[]> {
        const directory = path.join(this.snippetsDirectory(), langauge)

        if (!fs.existsSync(directory)) {
            return Promise.resolve([]);
        }

        return new Promise((resolve, reject) => {
            try {
                fs.readdir(directory, (err, files) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(files);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    public get(language: string, snippet: string): Promise<vscode.SnippetString> {
        const file = path.join(this.snippetsDirectory(), language, snippet)
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(file, 'utf8', (err, buffer) => {
                    if (err) {
                        reject(err)
                    } else {
                        const snippet = this.clean(buffer);
                        resolve(new vscode.SnippetString(snippet));
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    private snippetsDirectory(): string {
        const configPath = vscode.workspace.getConfiguration("yassnippet").get<string>("path", ".snippets");
        if (path.isAbsolute(configPath)) {
            return configPath;
        }
        return path.resolve(os.homedir(), configPath);
    }

    private clean(body: string): string {
        return body.split('\n').filter(line => !line.startsWith('#')).join('\n')
    }
}
