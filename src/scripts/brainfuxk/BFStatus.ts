import { BFError } from './BFError';

export const enum Status {
  HALTED,
  RUNNING,
  WAITING_INPUT
}

export class BFStatus {
  public id: Status;

  public stdout: string;
  public error?: BFError;

  constructor(status: Status, stdout: string, error?: BFError) {
    this.id = status;
    this.stdout = stdout;
    this.error = error;
  }
}
