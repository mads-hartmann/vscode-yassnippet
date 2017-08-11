'use strict';

import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path'
import * as vscode from 'vscode';

export default class Yassnippet {

    // Doesn't do any initialization yet, but might want it to
    // parse yassnippets and find tab-triggers etc. at some point.

    public list(langauge: string): Promise<string[]> {
        const directory = this.languageDirectory(langauge);

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
        const file = path.join(this.languageDirectory(language), snippet)
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

    private languageDirectory(language: string): string | null {
        const config = vscode.workspace.getConfiguration("yassnippet")
        const mapping = config.get<Object>("mapping")

        const languageDirName = (language in mapping)
            ? mapping[language]
            : language

        const directory = path.join(this.snippetsDirectory(), languageDirName);
        const modeDirectory = path.join(this.snippetsDirectory(), `${language}-mode`);

        if (fs.existsSync(directory)) {
            return directory;
        }

        if (fs.existsSync(modeDirectory)) {
            return modeDirectory;
        }

        return null;
    }

    private snippetsDirectory(): string {
        const config = vscode.workspace.getConfiguration("yassnippet")
        const configPath = config.get<string>("path", ".snippets");
        if (path.isAbsolute(configPath)) {
            return configPath;
        }
        return path.resolve(os.homedir(), configPath);
    }

    private clean(body: string): string {
        return body.split('\n').filter(line => !line.startsWith('#')).join('\n')
    }
}
