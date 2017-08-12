import * as fs from "fs";

import * as vscode from "vscode";

export function ls(directory: string): Promise<string[]> {
  if (!fs.existsSync(directory)) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    try {
      fs.readdir(directory, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function cat(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}

export function getLanguage(): string | null {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return null;
  }
  return editor.document.languageId;
}
