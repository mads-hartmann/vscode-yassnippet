import { SnippetString } from "vscode";

/**
 * Extract the meta-data we're interest in from the header of a
 * yassnippet text.
 */
class Header {
  public static NameRegexp = /^\s*#\s*name\s*:\s*(.+)\s*$/;
  public static KeyRegexp = /^\s*#\s*key\s*:\s*(.+)\s*$/;
  public static EndRegexp = /^\s*#\s*--\s*/;

  public static get(header: string[], regexp: RegExp): string {
    const str = header.find((line: string) => regexp.test(line));

    if (!str) {
      console.warn("Failed to parse name in header", header.join("\n"));
      return null;
    }

    return str.match(regexp)[1];
  }
}

/**
 * This represents a single snippet and all the information
 * we know about it from parsing the yassnippet text.
 */
export default class YassnippetSnippet {
  description: string;
  key: string;
  name: string;
  snippet: SnippetString;

  /**
   * Parse the contents of a yassnippet file and parse out the relevant information
   *
   * @param body The text contents of a single yassnippet file
   */
  public static parse(text: string): YassnippetSnippet {
    const lines = text.split("\n");
    const headerEnd = lines.findIndex(line => Header.EndRegexp.test(line));

    const header = lines.slice(0, headerEnd + 1);
    const body = lines.slice(headerEnd + 1);

    const name = Header.get(header, Header.NameRegexp);
    return new YassnippetSnippet(
      name,
      Header.get(header, Header.KeyRegexp),
      name,
      new SnippetString(body.join("\n"))
    );
  }

  private constructor(
    name: string,
    key: string,
    description: string,
    snippet: SnippetString
  ) {
    this.name = name;
    this.key = key;
    this.description = name;
    this.snippet = snippet;
  }
}
