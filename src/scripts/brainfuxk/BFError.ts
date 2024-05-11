export class Error {
  public static INVALID_SYNTAX = 1;
  public static UNMATCHED_LOOP = 2;

  private static errorMsgs = {
    [Error.INVALID_SYNTAX]: 'Invalid syntax',
    [Error.UNMATCHED_LOOP]: 'Unmatched loop',
  };

  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  public toString(): string {
    return Error.errorMsgs[this.id];
  }
}

export class BFError {
  public error: Error;
  public line: number;
  public col: number;

  constructor(error: number, line: number, col: number) {
    this.error = new Error(error);
    this.line = line;
    this.col = col;
  }
}
