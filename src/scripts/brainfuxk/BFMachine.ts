import { MarkSpec } from './MarkSpec';
import { BFError, Error } from './BFError';
import { BFStatus, Status } from './BFStatus';

export class BFMachine {
  private progMem: number[];
  private progPtr: number;

  private mem: number[];
  private ptr: number;

  private loopStack: number[];

  private mark: MarkSpec;

  constructor() {
    this.mark = new MarkSpec();

    this.reset();
  }

  public setMark(mark: MarkSpec) {
    this.mark = mark;
  }

  public load(prog: string): (BFError | boolean) {
    // Covert mark char to number
    let markToNum = {};

    Object.entries(this.mark).forEach(([op, mark]) => {
      markToNum[mark] = MarkSpec.enum[op];
    });

    // create regex to match /^\s*({mark})(.*)$/s
    const regExp = new RegExp(
      '^\s*(' +
      Object.values(this.mark)
        .map(mark => mark.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|') +
      ')(.*)$',
      's'
    );

    // Load program to memory
    let matched: RegExpMatchArray | null;
    let remain = prog;
    do {
      matched = remain.match(regExp);

      if(matched === null || !(matched[1] in markToNum)) {
        // reporting line and column is not implemented yet
        return new BFError(Error.INVALID_SYNTAX, 0, 0);
      }

      this.progMem.push(markToNum[matched[1]]);

      remain = matched[2];
    } while(remain !== '');

    return true;
  }

  public reset(): void {
    this.progPtr = 0;
    this.progMem = [];

    this.ptr = 0;
    this.mem = [];

    this.loopStack = [];
  }

  public step(): BFStatus {
    const result = new BFStatus(Status.RUNNING, '');

    switch(this.progMem[this.progPtr]) {
      case MarkSpec.enum.inc:
        this.ptr++;
        break;

      case MarkSpec.enum.dec:
        this.ptr--;
        break;

      case MarkSpec.enum.incVal:
        if(this.mem[this.ptr] === undefined) {
          this.mem[this.ptr] = 1;
        } else {
          this.mem[this.ptr]++;
        }
        break;

      case MarkSpec.enum.decVal:
        if(this.mem[this.ptr] === undefined) {
          this.mem[this.ptr] = -1;
        } else {
          this.mem[this.ptr]--;
        }
        break;

      case MarkSpec.enum.output:
        result.stdout = String.fromCharCode(this.mem[this.ptr]);
        break;

      case MarkSpec.enum.input:
        result.id = Status.WAITING_INPUT;
        break;

      case MarkSpec.enum.loopStart:
        this.loopStack.push(this.progPtr);

        if(this.mem[this.ptr] === 0) {
          let currentDepth = this.loopStack.length;

          do {
            this.progPtr++;

            switch(this.progMem[this.progPtr]) {
              case MarkSpec.enum.loopStart:
                this.loopStack.push(this.progPtr);
                break;

              case MarkSpec.enum.loopEnd:
                if(this.loopStack.pop() === undefined) {
                  return new BFStatus(
                    Status.HALTED,
                    '',
                    new BFError(Error.UNMATCHED_LOOP, 0, 0) // Line and column is not implemented yet
                  );
                }
                break;
            }
          } while(this.loopStack.length >= currentDepth);
        }
        break;

      case MarkSpec.enum.loopEnd:
        let pairPtr = this.loopStack.pop();

        if(pairPtr === undefined) {
          return new BFStatus(
            Status.HALTED,
            '',
            new BFError(Error.UNMATCHED_LOOP, 0, 0) // Line and column is not implemented yet
          );
        }

        if(this.mem[this.ptr] !== 0) {
          this.progPtr = pairPtr;
          this.loopStack.push(pairPtr);
        }
        break;
    }

    this.progPtr++;

    if(this.progPtr >= this.progMem.length) {
      result.id = Status.HALTED;
    }

    return result;
  }

  public store(input: string): void {
    this.mem[this.ptr] = input.charCodeAt(0);
  }
}
